<template>
  <div class="alert-popup" @click="$emit('close')">
    <div class="box">
      <div class="title"><div class="icon-cont"><span class="icon icon-bell-alt"></span></div></div>
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alertPopup',
  props: {
    message:String,
  },
  data: function () {
    return {
    }
  },
  methods:{

  },
  mounted () {
    console.log("###message", this.message)
  }
}

</script>

<style scoped>
  .alert-popup{
    width:100%;
    height:100%;
    position:fixed;
    background:rgba(0,0,0,.5);
    left:0;
    top:0;
    z-index: 999;
  }
  
  .alert-popup .box{
    width:80%;
    height:auto;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    background:white;
    border-radius: 4vw;
  } 
  .alert-popup .box .title {
    margin-top: -8vw;
  }
  .alert-popup .box .title .icon-cont{
    background:rgb(21, 134, 204);
    width:16vw;
    height:16vw;
    margin:0 auto;
    border-radius: 50%;
    padding-top: 1.5vw;
  }
  .alert-popup .box .icon{
    color:white;
    font-size:10vw;
     color:white;
  }
  .alert-popup .box .message{
    margin:14vw 0 20vw 0;
    font-size: 4.5vw;
    color:#555;
  }
</style>
