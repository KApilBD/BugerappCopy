import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerpro-ff79f.firebaseio.com'
});

export default instance;