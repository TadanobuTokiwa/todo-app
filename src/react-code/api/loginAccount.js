import axios from 'axios';

const endpoint_URL = "http://192.168.112.116:3003/loginAccount"

const loginAccountapi = {
    getALL() {
        const result = axios.get(endpoint_URL).then(res => res.data);
        return result;
    }
}

export default loginAccountapi;