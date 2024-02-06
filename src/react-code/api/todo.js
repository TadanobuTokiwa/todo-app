import axios from 'axios';

const endpoint_URL = "http://192.168.112.116:3003/todo"

const todoapi = {
    getALL() {
        const result = axios.get(endpoint_URL).then(res => res.data);
        return result;
    },
    post(todo) {
        const result = axios.post(endpoint_URL, todo).then(res =>res.data);
        return result;
    },
    async delete(todo) {
        const result = await axios.delete(endpoint_URL + '/' + todo.id);
        return result.data;
    },
    patch(todo) {
        const result = axios.put(endpoint_URL + '/' + todo.id, todo).then(() => todo.data);
        return result;
    }
}

export default todoapi;