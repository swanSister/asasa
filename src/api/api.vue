
<script>
import axios from 'axios'
let ctx = {}
const API_URL = "http://localhost:3000"
export default {
  install(Vue, options){
    ctx.store = options.store
  },
  //############useer################
  uploadAuthImage:function(file,filename){
    let formData = new FormData()
    formData.append('image', file)

    return axios.post(`${API_URL}/images/auth/${filename}`, formData,{
      headers: {
       'content-type': 'multipart/form-data' //do not forget this 
      }
    })
  },
  isUserExist:function(param){
    try{
      return axios.post(`${API_URL}/users/isUserExist`,param,{
        headers: {
          accept: 'application/json',
        }
      })
    }catch(e){
      console.error(e.message)
    }
  },
  createUser:function(param){
      return axios.post(`${API_URL}/users/create`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  patchUser:function(param){
      return axios.post(`${API_URL}/users/patch`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getUserByUserId:function(param){
      return axios.post(`${API_URL}/users/getByUserId`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  setUserPublic:function(param){
    return axios.post(`${API_URL}/users/setPublic`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
//############post########
  uploadPostImage:function(file,filename,text){
    let formData = new FormData()
    formData.append('image', file)
    formData.append('text', text)

    return axios.post(`${API_URL}/images/post/${filename}`, formData,{
      headers: {
       'content-type': 'multipart/form-data' //do not forget this 
      }
    })
  },
  uploadPost:function(param){
    try{
      return axios.post(`${API_URL}/posts/upload`,param,{
        headers: {
          accept: 'application/json',
        }
      })
    }catch(e){
      console.error(e.message)
    }
  },
  getPostList:function(param){
      return axios.post(`${API_URL}/posts/getByTopicId`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getPostSearchList:function(param){
      return axios.post(`${API_URL}/posts/getByKeyword`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getPostMineList:function(param){
      return axios.post(`${API_URL}/posts/getByMine`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getPostBookmarkList:function(param){
      return axios.post(`${API_URL}/posts/getByBookmark`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getPostDetail:function(param){
    return axios.post(`${API_URL}/posts/getDetail`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  setViewCount:function(param){
    return axios.post(`${API_URL}/posts/setViewCount`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  getLikeList:function(param){
    return axios.post(`${API_URL}/posts/getLikeList`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  setLike:function(param){
    return axios.post(`${API_URL}/posts/setLike`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  unLike:function(param){
    return axios.post(`${API_URL}/posts/unLike`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  getBookmarkList:function(param){
    return axios.post(`${API_URL}/posts/getBookmarkList`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  setBookmark:function(param){
    return axios.post(`${API_URL}/posts/setBookmark`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  unBookmark:function(param){
    return axios.post(`${API_URL}/posts/unBookmark`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
  //##########COMMENT#############
  uploadCommentImage:function(file,filename){
      let formData = new FormData()
      formData.append('image', file)
      return axios.post(`${API_URL}/images/comment/${filename}`, formData,{
        headers: {
        'content-type': 'multipart/form-data' //do not forget this 
        }
      })
  },
  uploadComment:function(param){
    try{
      return axios.post(`${API_URL}/comments/upload`,param,{
        headers: {
          accept: 'application/json',
        }
      })
    }catch(e){
      console.error(e.message)
    }
  },
  getCommentList:function(param){
    return axios.post(`${API_URL}/comments/getList`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
   //##########CHAT#############
  uploadChatImage:function(file,filename){
    let formData = new FormData()
    formData.append('image', file)
    return axios.post(`${API_URL}/images/chat/${filename}`, formData,{
      headers: {
      'content-type': 'multipart/form-data' //do not forget this 
      }
    })
  },
   checkChatRoomExist:function(param){
    return axios.post(`${API_URL}/chat/checkChatRoomExist`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  createChatRoom:function(param){
    return axios.post(`${API_URL}/chat/createChatRoom`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  getChatRoomList:function(param){
    return axios.post(`${API_URL}/chat/getChatRoomList`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },  
  getChatRoom:function(param){
    return axios.post(`${API_URL}/chat/getChatRoom`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  getChatList:function(param){
    return axios.post(`${API_URL}/chat/getChatList`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  sendChatMessage:function(param){
    return axios.post(`${API_URL}/chat/sendChatMessage`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  outChatRoom:function(param){
    return axios.post(`${API_URL}/chat/outChatRoom`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  updateChatReadTime:function(param){
    return axios.post(`${API_URL}/chat/updateChatReadTime`, param, {
      headers: {
        accept: 'application/json',
      }
    })
  },
  getNotice:function(param){
    return axios.post(`${API_URL}/notice/get`,param,{
      headers: {
        accept: 'application/json',
      }
    })
  },
 
}
</script>