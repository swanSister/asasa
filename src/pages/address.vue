<template>
  
  <div id="addressSearch">
   
  </div>
</template>

<script>
 
export default {
  components:{
  },
  props:{
  
  },
  data () {
    return {
      
    }
  },
  methods:{
   
  },
  mounted(){
     let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
      let that = this
      let interval = null
      interval = setInterval(function(){
        if(!global.daum.Postcode) return
        new global.daum.Postcode({
            oncomplete: function(data) {
              that.$eventBus.$emit("addressResult", data)
            }
        }).embed(document.getElementById("addressSearch"));
        clearInterval(interval)
      },50)
    
  }
}
</script>
<style scoped>

#__daum__layer_1{
  width:100vw !important;
  height: 100vh !important;
}
</style>