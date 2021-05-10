<template>
  <div class="flex auto footer justify-content-center align-items-center">
    <div  @click="onClickFooter(item,index)" class="flex auto justify-content-center" v-for="(item, index) in footerIcon" :key="'footerIcon'+index"> 
       <div v-if="index==2" class="icon" :class="item.class" :style="{
        'color' : item.idx==footerIndex ? 'rgb(15, 76, 129)' : 'rgb(21, 134, 204)'
      }">
      <span v-if="notiCount > 0" class="noti-count">{{notiCount}}</span> </div>
      <div v-else class="icon" :class="item.class" :style="{
        'color' : item.idx==footerIndex ? 'rgb(15, 76, 129)' : 'rgb(21, 134, 204)'
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
  },
  data () {
    return {
      footerIndex:1,
      notiCount: 0,
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
          class:"icon-ellipsis",
          isSelect:false,
          idx:4,//user page
        },
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      console.log("######route",to)
      let path = to.name
      if(path.indexOf("main")==0){
        this.footerIndex = 0
      }else if(path.indexOf("search")==0){
        this.footerIndex = 1
      }else if(path.indexOf("chat")==0){
        this.footerIndex = 2
      }else if(path.indexOf("alarm")==0){
        this.footerIndex = 3
      }else{
        this.footerIndex = 4
      }
      this.getChatNoticount()
    }
  },
  methods:{
    goPostWriting(){
      //this.$store.state.me.isAuthSuccess ? this.$router.push('/postWriting') :  this.$eventBus.$emit("openAlertPopup","글쓰기는 인증 후 가능합니다.")
      this.$router.push('/postWriting')
    },
    onClickFooter(item, idx){
        if(this.footerIndex == idx)return
        this.footerIndex = idx
        if(idx == 0){
          this.$router.push({name:'main', params:{reload:true}})
        }
        if(idx == 1){
          console.log(idx)
          this.$router.push({name:'search', params:{reload:true}})
        }
        if(idx == 2){
          this.$router.push({name:'chat', params:{reload:true}})
        }
        if(idx == 3){
          this.$router.push('/alarm')
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
    },
    async socketJoinListener(data){
      console.log("sasdfsadfasd",data)
      this.getChatNoticount()
    },

    async getChatNoticount(){
        let messages = await this.$api.getChatNoticount({
          userId:this.$store.state.me.userId
        })
        this.notiCount = messages.data.data
    },
  },
  async mounted(){
    let path = this.$router.currentRoute.path
    if(path.indexOf("/main")==0){
        this.footerIndex = 0
      }else if(path.indexOf("/search")==0){
        this.footerIndex = 1
      }else if(path.indexOf("/chat")==0){
        this.footerIndex = 2
      }else if(path.indexOf("/alarm")==0){
        this.footerIndex = 3
      }else{
        this.footerIndex = 4
      }
    this.getChatNoticount()
    this.$socket.emit('joinList',this.$store.state.me.userId)

    let that = this
    this.$socket.on('listMessage', (data)=> { 
      that.socketJoinListener(data)
    })
  },
  async beforeDestroy(){
    console.log("######chat list beforeDestroy")
    this.$socket.removeListener('listMessage', this.socketJoinListener)
  }
}
</script>
<style scoped>
.footer{
  min-height:18vw;
  max-height:18vw;
  border-top:1px solid #ddd;
  background:white;
  width:100%;
  padding-right:4vw;
}
.footer .icon{
  font-size:7.8vw;
}
.footer .pencil .icon{
  font-size:5vw;
}
.footer .pencil{
  max-width:12vw;
  min-width:12vw;
  max-height:12vw;
  min-height:12vw;
  border-radius: 50%;
  background:rgb(21, 134, 204) ;
  color:white;
}
.noti-count{
  position:absolute;
  background:rgb(21, 134, 204) ;
  font-weight: bold;
  padding:.5vw 1vw;
  font-size: 3.5vw;
  margin-left:-3vw;
  margin-top:-2vw;
  border-radius: 1vw;
  color:white;
}
</style>