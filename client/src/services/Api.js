
import Axios from 'axios';

const baseURL = '/api'

const Api = Axios.create({
    baseURL
});

export default Api;