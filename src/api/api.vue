
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "https://api.asasakorea.com"
export default {
  install(Vue, options){
    ctx.store = options.store
  },
  getByPathWhere: function(path, where){
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/rest/${path}?${where}`)
  },
  getByPath: function(path, offset, limit){
    offset = 0
    limit = 10
    console.log("##get API : ",path)
     return axios.get(`${API_URL}/rest/${path}?offset=${offset}&limit=${limit}`)
  },
  postByPath: function(path, param){
    try{
       console.log("post API : ",path,"data:",param)
      return axios.post(`${API_URL}/rest/${path}`,param,{
        headers: {
          accept: 'application/json',
        }
      })
    }catch(e){
      console.error(e.message)
     
    }
   
  },
  uploadImages: function(path, imgList){
    console.log('uploadImages')
    let formData = new FormData()
    for(let i=0; i<imgList.length; i++){
      formData.append('files', imgList[i])
    }
    console.log('img form', formData)
    return axios.post(`${API_URL}/${path}`,formData,{
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  },
  patchByPath: function(path, param){
    console.log("post API : ",path,"data:",param)
    return axios.patch(`${API_URL}/rest/${path}`,param,{
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: ''
      }
    })
  }
}
</script>