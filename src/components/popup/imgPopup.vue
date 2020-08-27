<template>
  <div class="img-popup" @click="$emit('close')">
    <div class="icon-cont flex none justify-content-center align-items-center">
      <span class="icon icon-cancel"></span>
    </div>
    <img :src="src">
  </div>
</template>

<script>
export default {
  name: 'imgPopup',
  props: {
    src:String,
  },
  data: function () {
    return {
    }
  },
  methods:{

  },
  mounted () {
    //  console.log("###postData", this.postData)
  }
}

</script>

<style scoped>
  .img-popup{
    width:100%;
    height:100%;
    position:fixed;
    background:black;
    left:0;
    top:0;
    z-index: 999;
  }
  .img-popup .icon-cont{
    background:rgba(0,0,0,.2);
    width:10vw;
    height:10vw;
    position:absolute;
    left:0;
    top:0;
    z-index:5;
    
  }
  .img-popup .icon{
    color:white;
    font-size:6vw;
  }
  .img-popup img{
    width:100%;
    height:auto;
    position:absolute;
    left:0;
    top:50%;
    transform:translate(0,-50%);
  }
</style>
