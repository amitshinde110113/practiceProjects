import React, { Component, useEffect, useState, useReducer } from 'react';
import TodoComponent from './Todo-Component'
import './Todo-List-Component.css'
import { connect } from 'react-redux'
import todoService from '../Serivces/todo-service'
import { initilizeTodo } from '../Serivces/actions/todo-actions'
import TodoModalComponent from './todo-modal/Todo-Modal-Component'
import { openModal, resetValidiation, closeModal } from '../Serivces/actions/todo-modal-actions'
import { toast } from 'react-toastify';
import Header from '../Components/Header-Component'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import { addTodo, updateTodo } from '../Serivces/actions/todo-actions'
import todoReducer from '../Serivces/reducers/todos-reducer'
import { modalReducer } from '../Serivces/reducers/todos-modal-reducer'



const mapStoreProps = (state) => {
    return {
        ...state
    }
};


const TodoListComponent = (props) => {
    // const { todos, dispatch } = useReducer(todoReducer, []);
    const initial = []
    const initialState = {
        isModalOpen: false,
        isOpenForUpdate: false,
        todo: {
            title: '',
            description: '',
        }
    }
    const [todos, dispatch] = useReducer(todoReducer, initial)
    const [modal, modalDispatch] = useReducer(modalReducer, initialState)

    console.log('todos', todos)
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    const color = '#ffffff'
    const [isLoading, setLoading] = useState(false)
    const [isActionPerformed, setActionPerformed] = useState(false)

    useEffect(() => {
        todoService.getTodos().then(res => {
            setLoading(false)
            setTodos(res)

        }).catch(error => {
            console.log('error', error)
            toast.error(error.message || 'Error while getting tasks.')
            props.history.replace('/')
            setLoading(false)
        })
    }, [isActionPerformed])


    const handleShow = () => {
        modalDispatch(openModal());
        // props.dispatch(resetValidiation())
    };
    const handleClose = () => {
        modalDispatch(closeModal());
        // props.dispatch(resetValidiation())
    };

    const setTodos = ({ totalCount, notes }) => {
        console.table(notes)
        // props.dispatch(initilizeTodo(notes))
        // props.dispatch(initilizeTodo(notes))

        dispatch(initilizeTodo(notes));
    }
    const handleActionPerformed = () => {
        setActionPerformed(!isActionPerformed)
    }
    const handleAddTodo = (todo) => {
        todoService.createTodo(todo).then(res => {
            dispatch(addTodo(res))
            toast.success('Created successfully.')
            handleClose()
        }).catch(error => {
            toast.error(error.message || 'Error while adding task.')
        })
    }
    const handleUpdateTodo = (todo) => {
        todoService.updateTodo(todo).then(res => {
            dispatch(updateTodo(todo))
            toast.success('Updated successfully.')
            handleClose()

        }).catch(error => {
            toast.error(error.message || 'Error while updating task.')
        })
    }
    return (
        <React.Fragment>
            {console.log('todos', todos)}
            <Header {...props} />
            <div className='main'>
                <div className="bg-dark p-2 justify-content-between" style={{ display: "flex" }}>
                    <h5 className="text-light mt-2" ># My Todos</h5>
                    <button className="btn btn-primary btn-sm"
                        onClick={handleShow}     >
                        Add Todo  </button>
                </div>
                <div className='col-12 text-center'>
                    <TodoComponent modalDispatch={modalDispatch} dispatch={dispatch} onUpdate={handleUpdateTodo} onAction={handleActionPerformed} todos={todos} />
                </div>
                <TodoModalComponent modalDispatch={modalDispatch} modal={modal} handleAddTodo={handleAddTodo} handleUpdateTodo={handleUpdateTodo} />
            </div>
            <HashLoader css={override} size={50} loading={isLoading} />
        </React.Fragment>
    )
}
export default TodoListComponent 