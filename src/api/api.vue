
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "http://52.78.225.105:3000"

export default {
  install(Vue, options){
    ctx.store = options.store
  },
  getPosts:function(){
    return axios.get(`${API_URL}/posts`)
  },
  createPost:function(param){
    return axios.post(`${API_URL}/posts`,param,{
      headers: {
        Authorization: ''
      }
    })
  },
  getByPath: function(path){
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/${path}`)
  },
  postByPath: function(path, param){
    console.log("post API : ",path,"data:",param)
    return axios.post(`${API_URL}/${path}`,param,{
      headers: {
        Authorization: ''
      }
    })
  },
}
</script>