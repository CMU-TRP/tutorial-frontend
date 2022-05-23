import axios from 'axios'
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,

    headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',

    }
})
export default apiClient