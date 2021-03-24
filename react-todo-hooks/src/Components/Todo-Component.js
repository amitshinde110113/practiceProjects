import Table from 'react-bootstrap/Table'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import todoService from '../Serivces/todo-service'
import { removeTodo } from '../Serivces/actions/todo-actions'
import { openModalForUpdate } from '../Serivces/actions/todo-modal-actions'
import { toast } from 'react-toastify';
import todoReducer from '../Serivces/reducers/todos-reducer'

const TodoComponent = (props) => {
    const handleDelete = (id) => {
        todoService.removeTodo(id).then(res => {
            props.dispatch(removeTodo(id))
            toast.success('Deleted successfully.')
            props.onAction()

        }).catch(error => {
            toast.error(error.message || 'Error while deliting task.')
        })
    }
    const handleUpdate = (todo) => {
        props.modalDispatch(openModalForUpdate(todo))
        props.onAction()
    }

    const { todos } = props;
    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>CreatedAt</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo, index) => {
                    return (
                        <tr key={todo._id}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{
                                new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(todo.createdAt))
                            }</td>

                            <td>
                                <i className="fa fa-edit mr-2 text-info" onClick={() => handleUpdate(todo)}  ></i>
                                <i className="fa fa-trash text-danger" onClick={() => handleDelete(todo._id)}></i>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )


}

export default TodoComponent