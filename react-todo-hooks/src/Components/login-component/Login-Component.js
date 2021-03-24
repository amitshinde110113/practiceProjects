import { Component } from "react";
import './Login-Component.css';
import { Button, Form } from "react-bootstrap"
import authService from '../../Serivces/auth-service'
import { Link } from "react-router-dom";

class LoginComponent extends Component {

    state = {
        email: '',
        password: '',
        validated: false,
    }
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            this.login()
        }
        this.setState({ validated: true })
    }
    handleEmailChange = (event) => {
        const email = event.target.value
        this.setState({ email })
    }
    handlePasswordChange = (event) => {
        const password = event.target.value
        this.setState({ password })
    }
    login = () => {
        const body = { email: this.state.email, password: this.state.password }
        authService.login(body).then(res => {
            this.props.history.push('/todos')

        }).catch(error => {
            this.props.history.push('/login')

        })
    }
    render() {
        return (
            <div className="formBody">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={this.handleEmailChange} required type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handlePasswordChange} required type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                 </Button>
               
                    <Link className="pull-right mt-2" to='/signup'>New? Register here.</Link>
                </Form>
            </div>
        );
    }
}
export default LoginComponent