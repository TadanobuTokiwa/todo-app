import axios from 'axios';

const endpoint_URL = "http://192.168.112.116:3003/user"

const userapi = {
    getALL() {
        const result = axios.get(endpoint_URL).then(res => res.data);
        return result;
    },
    post(user) {
        const result = axios.post(endpoint_URL, user).then(res =>res.data);
        return result;
    },
    async delete(user) {
        const result = await axios.delete(endpoint_URL + '/' + user.id);
        return result.data;
    },
}

export default userapi;