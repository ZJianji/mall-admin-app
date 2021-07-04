import axios from '@/axios';

export default {
    list(params) {
       return axios.get('/products/all',{params});
    },
    add(params) {
        return axios.post('/products/add',params)
    },
    detail(params) {
        return axios.get('/products/'+params)
    },
    edit(params) {
        return axios.put('/products/edit',params)
    }
}