const todos = [];
export default (state = todos, action) => {
    switch (action.type) {
        case 'INITILIZE_TODO':
            return [...action.todos]
        case 'ADD_TODO':
            return [...state, action.todo];

        case 'REMOVE_TODO':
            return state.filter(({ _id }) => _id !== action._id);

        case 'UPDATE_TODO':
            return state.map(todo => {
                if (todo._id === action.todo._id) {
                    return {
                        ...todo,
                        ...action.todo
                    }
                } else {
                    return todo
                }
            });

        default:
            return state;
    }
}