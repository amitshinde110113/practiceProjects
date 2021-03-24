const initialState = {
    isModalOpen: false,
    isOpenForUpdate: false,
    todo: {
        title: '',
        description: '',
    }
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, isOpenForUpdate: false, isModalOpen: true };
        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false, todo: initialState.todo };
        case "OPEN_FOR_UPDATE":
            return {
                ...state,
                isModalOpen: true,
                isOpenForUpdate: true,
                todo: action.todo
            }
        case 'UPDATING_TODO':
            let updatingTodo = { ...state.todo };
            const { key, value } = action.data
            updatingTodo[key] = value
            return { ...state, todo: updatingTodo }
        default:
            return state
    }
}

export const formReducer = (state = { isValidiated: false }, action) => {
    switch (action.type) {
        case 'SET_VALIDIATED':
            return { ...state, isValidiated: true };
        case 'SET_NOT_VALIDIATED':
            return { ...state, isValidiated: false };
        default:
            return state
    }
}