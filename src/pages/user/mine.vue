<template>
  <div>

    <div class="header flex align-items-center">
      <div class="backButton" style="font-size:5vw; margin-left:2vw;">
          <span @click="$router.go(-1)" class="icon-left-open"></span>
      </div>
      <div class="flex auto justify-content-center" style="margin-right:5vw">
        내가 작성한 글
      </div>
    </div>
    <vue-scroll class="user-post-list"
        ref="vs" :ops = "ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart">

        <div class="slot-load" slot="load-beforeDeactive"></div>
        <div class="slot-load" slot="load-deactive"></div>
        <div class="slot-load" slot="load-start"></div>
        <div class="slot-load" slot="load-active"></div>
        <div class="slot-refresh" slot="refresh-deactive"></div>
        <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
        <div class="slot-refresh" slot="refresh-start"></div>
        <div class="slot-refresh" slot="refresh-active"></div>

        <div class="child">
          <div class="post-list">
           
            <div class="li flex align-items-start" v-for="(item, index) in postList" :key="index+'postlist'"
            @click="$router.push({name: 'postDetail', query: { postId: item.postId }})"> 
              <div v-if="item.type==1" class="icon flex justify-content-center align-items-center">
                <span class="icon-doc-text"></span>
              </div>
              <div v-if="item.type==2" class="icon gray flex justify-content-center align-items-center">
                <span class="icon-chat-empty"></span>
              </div>
              
              <div class="content flex column align-items-start jusitfy-content-start">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="sub">{{item.type == 1  ? 
                  `${item.topicName} 채널에 게시글을 등록하였습니다.` : 
                  `${item.topicName} 채널의 게시글에 댓글을 등록하였습니다.`}}</div>
                <div class="time">{{$getTime(item.createdAt)}}</div>
              </div>
            </div>
          </div>
        </div>
     </vue-scroll>
      <Footer v-bind:footerIndex="4"></Footer>
  </div>
</template>

<script>

import Footer from '@/components/footer'
export default {
  components:{
    
    Footer,
  },
  props:{
  },
  data () {
    return {
      headerData:[],
      postList:[],
      title:'',
            ops : {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true,
          tips:{
            deactive: '',
            active: '',
            start: '',
            beforeDeactive: ''
          }
        },
        pushLoad: {
          enable: true,
          tips:{
            deactive: '',
            active: '',
            start: '',
            beforeDeactive: ''
          }
        }
      }
    },
    offset:0,
    limit:10,
    }
  },
  methods:{
    async handleLoadStart(vm, dom, done) {
      this.offset+=this.limit
      await this.getMessages()
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async handleRS(vsInstance, refreshDom, done) {
      this.postList = []
      this.offset = 0
      this.getMessages()
      done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    async onClickHeader(item){
      console.log(item)
      this.getMessages(item.path)
    },
    async getMessages(){
      let messages = await this.$api.getPostMineList({
        userId:this.$store.state.me.userId,
        offset:this.offset,
        limit:this.limit
      })
      console.log("mine###:" , messages)
      messages.data.data.map(item=>this.postList.push(item))
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
  overflow-y:auto;
  height:calc(100% - 28vw) !important;
}
.header{
  font-size:4.5vw;
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
  width:8vw;
  height:8vw;
  font-size: 4vw;
  border-radius: 50%;
  background:rgb(21, 134, 204) ;
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
  font-size: 4vw;
}
.post-list .li .content .title{
  font-size: 5vw;
  font-weight: bold;
  width:100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>