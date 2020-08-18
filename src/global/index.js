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
        let res = await Vue.prototype.$api.getUserByUserId({userId:me.userId})
        if(res.data.data){
          Vue.prototype.$store.commit('me',res.data.data)

          let likeRes = await Vue.prototype.$api.getLikeList({userId:me.userId})
          Vue.prototype.$store.commit('likeList',likeRes.data.data)

          let bookmarkRes = await Vue.prototype.$api.getBookmarkList({userId:me.userId})
          Vue.prototype.$store.commit('bookmarkList',bookmarkRes.data.data)
          
          console.log("####updateUserInfo####")
          console.log("me:", this.$store.state.me)
          console.log("likeList:", this.$store.state.likeList)
          console.log("likeList:", this.$store.state.bookmarkList)
          console.log("######################")
        }else{
          Vue.prototype.$store.commit('me',{})
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
      let diff = this.$moment().valueOf() - this.$moment.utc(timestamp).valueOf()
      let second = 1000
      let minute = second * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      let month = day * 31//오차 있음
      let res = ''
      
      if(diff < minute){
        res = '방금'
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
    Vue.prototype.$getBuildingName = function(userData){
      if(!userData)return
      if(userData.isPublic){
        if(userData.houseType == 3){
          return '주택'
        }else{
          if(userData.addressData.buildingName){
            return userData.addressData.buildingName
          }else{
            return '이름 없음'
          }
        }
      }else{
        return '비공개'
      }
    }
  }
}

export default global;