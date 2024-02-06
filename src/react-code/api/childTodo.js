import axios from 'axios';

const endpoint_URL = "http://192.168.112.116:3003/childTodo"

const childTodoapi = {
    getALL() {
        const result = axios.get(endpoint_URL).then(res => res.data);
        return result;
    },
    post(cTodo) {
        const result = axios.post(endpoint_URL, cTodo).then(res =>res.data);
        return result;
    },
    async delete(cTodo) {
        const result = await axios.delete(endpoint_URL + '/' + cTodo);
        return result.data;
    },
}

export default childTodoapi;