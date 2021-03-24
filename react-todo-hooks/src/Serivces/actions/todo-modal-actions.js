export const openModal = () => ({
    type: 'OPEN_MODAL'
});
export const closeModal = () => ({
    type: 'CLOSE_MODAL'
})

export const validiateForm = () => ({
    type: 'SET_VALIDIATED'
})
export const resetValidiation = () => ({
    type: 'SET_NOT_VALIDIATED'
})
export const openModalForUpdate = (todo) => ({
    type: 'OPEN_FOR_UPDATE',
    todo
})
export const updateTodoModal = (data) => ({
    type:'UPDATING_TODO',
    data
})