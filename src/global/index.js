import Vue from 'vue';

const global = {
  install() {
    Vue.prototype.$resizeImage = (image) => {
      console.log("resizeImages")
      let canvas = document.createElement("canvas"),
      max_size = 1000,
      // 최대 기준을 1280으로 잡음.
      width = image.width,
      height = image.height;
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      return dataUrl
    }
    Vue.prototype.$updateUserInfo = async function(){
      let me = Vue.prototype.$store.state.me
      if(me.userId){
        let findUser = await Vue.prototype.$api.getByPathWhere(`users`,`userId=${me.userId}`)
        console.log("fu",findUser)
        if(!findUser.data.documents.length){
            alert("재로그인")
            Vue.prototype.$store.commit('me',{})
            return null
         }else{
           let me = findUser.data.documents[0].fields
           me.path = findUser.data.documents[0].path
           console.log('me',me)
            Vue.prototype.$store.commit('me',me)
            return findUser.data.documents[0]
         }
         
      }
    }
    Vue.prototype.$setCount = async function(path,docPath){
      let countRes = await this.$api.postCount(path,{
        "doc": docPath,
        "user": Vue.prototype.$store.state.me.path
      })
      Vue.prototype.$updateUserInfo()
      return countRes
    }
    
    Vue.prototype.$getTime = function(timestamp){//n분 전, n 시간 전, n 일 전
      let now = new Date().getTime()
      let diff = now - (timestamp*1000)
      let second = 1000
      let minute = second * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      let month = day * 31//오차 있음
      let res = ''
      
      if(diff < minute){
        res =  parseInt(diff/second) + '초 전'
      }else if(diff < hour){
        res = parseInt(diff/minute) + '분 전'
      }else if(diff < day){
        res = parseInt(diff/hour) + '시간 전'
      }else if(diff < week){
        res = parseInt(diff/day) + '일 전'
      }else if(diff < month){
        res = parseInt(diff/week) + '주 전'
      }else{
        res = parseInt(diff/month) + '달 전'
      }
      return res
    }
  }
}

export default global;