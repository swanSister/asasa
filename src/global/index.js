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
        if(!findUser.data.documents.length){
            alert("재로그인")
            Vue.prototype.$store.commit('me',{})
         }else{
            Vue.prototype.$store.commit('me',findUser.data.documents[0].fields)
         }
      }
    }
  }
}

export default global;