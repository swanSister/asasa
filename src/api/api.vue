
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "https://api.asasakorea.com"
const ADDRESS_URL = "http://localhost:3001/address"
export default {
  install(Vue, options){
    ctx.store = options.store
  },

  getAddress:function(){
    let param = {
      confmKey:'devU01TX0FVVEgyMDIwMDUxOTIzMTUzODEwOTc3NDg=',
      returnUrl: 'http://localhost:3001',
      resultType: '4'
    }
    return axios.post(`${ADDRESS_URL}`,param,{
      headers: {
        Authorization: ''
      }
    })
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
      formData.append(key, imgList[key])
    }
    //debug code
    for(let [name, value] of formData) {
      console.log(`${name} = ${value}`); // key1=value1, then key2=value2
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