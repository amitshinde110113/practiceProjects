import { createStore, combineReducers } from 'redux';
import todosReducer from '../reducers/todos-reducer'
import { modalReducer, formReducer } from '../reducers/todos-modal-reducer'
export default () => {
    const store = createStore(
        combineReducers({
            todos: todosReducer,
            todoModal: modalReducer,
            todoForm: formReducer
        }))
    return store;
}