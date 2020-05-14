
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "https://api.asasakorea.com"

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
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  },
  uploadImages: function(path, imgList){
    console.log('uploadImages')
    let formData = new FormData()
    for(let key in imgList){
      console.log(key)
      formData.append(key, imgList[key])
    }
    return axios.post(`${API_URL}/${path}`,formData,{
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  }
}
</script>