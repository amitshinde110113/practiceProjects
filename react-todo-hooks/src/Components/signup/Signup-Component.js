import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './error'
import { toast } from 'react-toastify';
import authService from '../../Serivces/auth-service'
import { Link } from 'react-router-dom';
const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required.'),
    password: Yup.string().required('Password is required.'),
    confirmPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
})

function SignupForm(props) {
    const onSubmit = (values, submitProps) => {
        authService.signUp(values).then(res => {
            toast.success('Registered successfully,Please login to continue.')
            submitProps.setSubmitting(false)
            submitProps.resetForm()
            props.history.push('/login')
        }).catch(error => {
            toast.error(error.message || 'Error while registration')
            submitProps.setSubmitting(false)
            submitProps.resetForm()
        })
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                console.log('Formik props', formik)
                return (
                    <Form className="formBody" >
                        <div className="form-group">
                            <label>Name</label>
                            <Field className="form-control" type="text" id="name" name="name" />
                            <ErrorMessage name="name" component={TextError} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <Field className="form-control" type="email" id="email" name="email" />
                            <ErrorMessage name="email" component={TextError} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Field className="form-control" type="password" id="password" name="password" />
                            <ErrorMessage name="password" component={TextError} />
                        </div>
                        <div className="form-group">
                            <label>ComfirmPassword</label>
                            <Field className="form-control" type="password" id="confirmPassword" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component={TextError} />
                        </div>
                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-primary"> SignUp</button>
                        <Link className="pull-right mt-2" to='/login'>Registered? Login here.</Link>
                   
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignupForm