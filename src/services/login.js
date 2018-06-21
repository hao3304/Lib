import axios from './axios'
export default {
    login:params=>axios.post(`/account`,params),
    logout:()=>axios.get(`/account`),
}