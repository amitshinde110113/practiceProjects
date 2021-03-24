import HttpService from './htttp-service'
class TodoService {
    constructor() {
        this.httpService = new HttpService()
    }
    getTodos = () => {
        return this.httpService.get(`/api/notes/pagination/0`);
    }
    createTodo = (body) => {
        return this.httpService.post(`/api/notes`, body);
    }
    updateTodo = (body) => {
        return this.httpService.patch(`/api/notes/${body._id}`, body);
    }
    removeTodo = (id) => {
        return this.httpService.delete(`/api/notes/${id}`);
    }
}

export default new TodoService()
