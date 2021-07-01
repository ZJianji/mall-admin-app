import axios from "@/axios";

export default {
    delete(params) {
      return  axios.delete('/products/' + params);
    }
}