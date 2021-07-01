import axios from '@/axios';

export default {
    getSearch(params) {
        return  axios.get('/category/all',{params})
    }
}