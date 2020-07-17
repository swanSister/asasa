<template>
  <div class="flex auto footer justify-content-center align-items-center">
    
    <div  @click="onClickFooter(item,index)" class="flex auto justify-content-center" v-for="(item, index) in footerIcon" :key="'footerIcon'+index"> 
      <div class="icon" :class="item.class" :style="{
        'color' : item.isSelect ? '#000' : '#999'
      }"></div>
    </div>
    <div @click="goPostWriting" class="flex auto justify-content-center align-items-center pencil">
      <div class="icon icon-pencil"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    footerIndex:Number
  },
  data () {
    return {
      footerIcon:[
        { 
          class:"icon-home",
          isSelect:false,
          idx:0,//home
        },
        { 
          class:"icon-search",
          isSelect:false,
          idx:1,//search
        },
        { 
          class:"icon-chat-empty",
          isSelect:false,
          idx:2,//chat
        },
        { 
          class:"icon-bell",
          isSelect:false,
          idx:3,//notice
        },
        { 
          class:"icon-dot-3",
          isSelect:false,
          idx:4,//user page
        },
      ]
    }
  },
  methods:{
    goPostWriting(){
      this.$store.state.me.isAuth ? this.$router.push('postWriting') : alert('글쓰기는 인증 후 가능합니다.')
    },
    onClickFooter(item, idx){
      if(idx == this.footerIndex) return
        if(idx == 0){
          this.$router.push({name:'main', params:{reload:true}})
        }
        if(idx == 1){
          console.log(idx)
          this.$router.push('/search')
        }
        if(idx == 2){
          this.$router.push('/chat')
        }
        if(idx == 3){
          this.$router.push('/notice')
        }
        if(idx == 4){
          this.$router.push('/user')
        }
    },
    backHandler(){
      console.log("history length : " + window.history.length)
      if(window.history.length>2){
        this.$router.go(-1)
      }else{
         this.$router.push('main')
      }
    }
  },
  mounted(){
      this.footerIcon[this.footerIndex].isSelect = true
  }
}
</script>
<style scoped>
.footer{
  min-height:14vw;
  max-height:14vw;
  position: fixed;
  bottom:0;
  left:0;
  border-top:1px solid #ddd;
  background:white;
  width:100%;
  padding-right:4vw;
}
.footer .icon{
  font-size:6vw;
}
.footer .pencil .icon{
  font-size:5vw;
}
.footer .pencil{
  max-width:9vw;
  min-width:9vw;
  max-height:9vw;
  min-height:9vw;
  border-radius: 50%;
  background:tomato;
  color:white;
}
</style>