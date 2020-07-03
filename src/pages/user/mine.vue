<template>
  <div>
    <vuescroll class="user-post-list">
      <div class="header flex align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.go(-1)" class="icon-left-open"></span>
        </div>
         <div class="flex auto justify-content-center" style="margin-right:5vw">
          내가 작성한 글
        </div>
      </div>
      <div class="post-list">
        <div class="li flex align-items-start" v-for="(item, index) in postList" :key="index+'postlist'"
         @click="$router.push({name: 'postDetail', query: { path: item.fields.path }})"> 
          <div v-if="item.fields.type==1" class="icon flex justify-content-center align-items-center">
            <span class="icon-doc-text"></span>
          </div>
          <div v-if="item.fields.type==2" class="icon gray flex justify-content-center align-items-center">
            <span class="icon-chat-empty"></span>
          </div>
          
          <div class="content flex column align-items-start jusitfy-content-start">
            <div class="title">
              {{item.fields.title}}
            </div>
            <div class="sub">{{item.fields.type == 1 ? 
              `${item.fields.topic.name} 채널에 게시글을 등록하였습니다.` : 
              `${item.fields.topic.name} 채널의 게시글에 댓글을 등록하였습니다.`}}</div>
            <div class="time">{{item.createdAt}}</div>
          </div>
        </div>
      </div>
      <Footer v-bind:footerIndex="4"></Footer>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Footer from '@/components/footer'
export default {
  components:{
    vuescroll,
    Footer,
  },
  props:{
  },
  data () {
    return {
      headerData:[],
      postList:[],
      title:'',
    }
  },
  methods:{
    async onClickHeader(item){
      console.log(item)
      this.getMessages(item.path)
    },
    async getPosts(){
      
      if(this.$store.state.me.isAuth){
        this.headerData = this.$store.state.me.topics
      }else{
        this.headerData = [this.$store.state.me.topics[0]]
      }
      console.log(this.headerData)
      this.getMessages(this.headerData[0].path)
    },
    async getMessages(){
      await this.$updateUserInfo()
      let mineRes = await this.$api.getByPath(`${this.$store.state.me.path}/mine`)
      this.postList = mineRes.data.documents
      
    }
  },
  async mounted(){
    this.getMessages()
  }
}
</script>
<style scoped>
.user-post-list{
  width:100%;
  height:100%;
  overflow-y:auto;
}
.header{
  font-size:4vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
}
.post-list .li{
  background:white;
  padding:4vw 4vw 2vw 4vw;
  margin-top:2vw;
  flex-wrap:nowrap;
  border-bottom:1px solid #ddd;
}
.post-list .li .icon{
  margin-top:1vw;
  margin-right: 4vw;
  width:6vw;
  height:6vw;
  font-size: 3vw;
  border-radius: 50%;
  background:tomato;
  color:white;
}
.post-list .li .icon.gray{
  background:#555;
}
.post-list .li .content{
  width:80vw;
  max-width: 80vw;
}
.post-list .li .content div{
  margin-bottom: 2vw;
  font-size: 3vw;
}
.post-list .li .content .title{
  font-size: 4vw;
  font-weight: bold;
  width:100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*
<div class="post-list">
        <div class="li flex" v-for="(item, index) in postList" :key="index+'postlist'"> 
          <div class="icon">
            <span class="icon-doc-text"></span>
          </div>
          <div class="content flex column align-items-start">
            <div class="title">{{item.fields.title}}</div>
            <div class="sub">{{item.fields.type == 1 ? 
              `회원님이 ${item.fields.topic.name} 채널에 게시글을 등록하였습니다.` : 
              `회원님이 댓글을 등록하였습니다.`}}</div>
            <div class="time">{{item.createdAt}}</div>
          </div>
        </div>
      </div>
      */
</style>