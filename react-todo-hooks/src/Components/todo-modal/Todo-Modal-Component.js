import './Todo-Modal-Component.css'
import { Component, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { closeModal, validiateForm, updateTodoModal } from '../../Serivces/actions/todo-modal-actions'
import { Modal, Form } from "react-bootstrap"
import todoService from '../../Serivces/todo-service'
import { addTodo, updateTodo } from '../../Serivces/actions/todo-actions'
import { toast } from 'react-toastify';
import { formReducer } from '../../Serivces/reducers/todos-modal-reducer'

const TodoModalComponent = (props) => {
    const [form, formDispatch] = useReducer(formReducer, { isValidiated: false })

    const user = JSON.parse(localStorage.getItem('user'))
    const getTodo = () => {
        return props.modal.todo;
    }
    const handleClose = () => {
        props.modalDispatch(closeModal())
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            toast.error('Please fill all required fields')

        } else {
            props.modal.isOpenForUpdate ? updatingTodo() : addingTodo()
            event.preventDefault();
            event.stopPropagation();
            handleClose()

        }
        formDispatch(validiateForm())
    };
    const handleFormChange = (event) => {
        const { name, value } = event.target
        props.modalDispatch(updateTodoModal({ key: name, value: value }))
    }
    const addingTodo = () => {
        const todo = getTodo()
        todo['user'] = user._id
        handleClose()
        props.handleAddTodo(todo)

    }
    const updatingTodo = () => {
        const todo = getTodo()
        handleClose()
        props.handleUpdateTodo(todo)
    }

    const todo = getTodo()
    return (
        <Modal show={props.modal.isModalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modal.isOpenForUpdate ? 'Update Todo' : 'Add Todo'}</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={form.isValidiated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formBasictitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={todo.title} onChange={handleFormChange} required type="text" placeholder="Enter Title" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required as="textarea" rows="3" name="description" value={todo.description} onChange={handleFormChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary btn-sm" type="button" onClick={handleClose}>Close  </button>
                    <button className="btn btn-primary btn-sm" type='submit' >{props.modal.isOpenForUpdate ? 'Update' : 'Add'}</button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}
const modalStateMapper = (state => {
    return {
        ...state
    }
})
export default TodoModalComponent