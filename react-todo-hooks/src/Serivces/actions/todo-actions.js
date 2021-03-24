export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo
});

export const updateTodo = (todo) => ({
    type: 'UPDATE_TODO',
    todo
})
export const removeTodo = (_id) => ({
    type: 'REMOVE_TODO',
    _id
})
export const initilizeTodo = (todos) => ({
    type: 'INITILIZE_TODO',
    todos
})