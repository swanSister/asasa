<template>
  <div class="privacy-popup flex column">
    <div class="header flex align-items-center">
      <div class="title flex auto justify-content-center">이용약관</div>
      <span class="icon icon-cancel" @click="$emit('close')"></span>
    </div>
    <div class="flex auto">
      
      <iframe src="https://asasakorea.com/information"></iframe>
    </div>

  </div>
</template>

<script>
export default {
  name: 'privacyPopup',
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
  .privacy-popup{
    width:100%;
    height:100%;
    position:fixed;
    background:white;
    left:0;
    top:0;
    z-index: 999;
  }
  .privacy-popup .header{
    background:white;
    height:18vw;
    padding:0 4vw;
    border-bottom: 1px solid #eee;
    font-size: 6vw;
    color:#333;
    font-weight: bold;
  }
  .privacy-popup .header .title{
    margin-right:-6vw;
  }
  .privacy-popup .icon{
    color:#333;
  }
  .privacy-popup iframe{
    border:none;
    width:100%;
  }
</style>
