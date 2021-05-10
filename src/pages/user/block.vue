<template>
  <div>
    <div class="header flex align-items-center">
      <div class="backButton" style="font-size:5vw; margin-left:2vw;">
          <span @click="$router.go(-1)" class="icon-left-open"></span>
      </div>
        <div class="flex auto justify-content-center" style="margin-right:5vw">
        차단 관리
      </div>
    </div>
    <!-- <PostHeader></PostHeader> -->

      <vue-scroll class="block-content" 
          :ops = "ops"
          @refresh-start="handleRS"
          @load-before-deactivate="handleLBD"
          @refresh-before-deactivate="handleRBD"
          @load-start="handleLoadStart"
        >
        <div class="slot-load" slot="load-beforeDeactive"></div>
        <div class="slot-load" slot="load-deactive"></div>
        <div class="slot-load" slot="load-start"></div>
        <div class="slot-load" slot="load-active"></div>
        <div class="slot-refresh" slot="refresh-deactive"></div>
        <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
        <div class="slot-refresh" slot="refresh-start"></div>
        <div class="slot-refresh" slot="refresh-active"></div>
        <div class="child">
          
            <div v-for="(item, index) in  blockList" :key="'blockList'+index" class="block-list-li">
              <div class="user-id flex align-items-center">
                  <div class="thumbnail-content">
                    <span class="flex justify-content-center align-items-end icon-user thumbnail"></span>
                  </div>
                  <div>
                    <div>{{item.targetId}}</div>
                    <div class="building-name">{{$getBuildingName(item.targetInfo)}}</div>
                  </div>
                  <div class="flex auto justify-content-end">
                    <span class="delete-block-btn" @click="deleteBlock(item)">해제</span> 
                  </div>
                  
                </div>
              
            </div>
        </div>
      
        </vue-scroll>
  </div>
</template>

<script>
//import PostHeader from '@/components/post/post_header.vue'

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
      blockList:[],
      ops : {
      vuescroll: {
        mode: 'slide',
        zooming: false,
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
          auto: true,
          autoLoadDistance: 10,
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
    size:0,
    currentTopicId:'',
    sort:1,
    }
  },
  methods:{
    onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순, 4:댓글순
      this.blockList = []
      this.offset = 0
      this.sort = sort
      console.log(this.offset, this.sort)
      this.getMessages(this.offset, this.limit, this.sort)
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.blockList = []
      this.offset = 0
      this.getMessages(this.offset, this.limit, this.sort)
      done();
    },
    handleRBD(vm, loadDom, done) {
      console.log("handleRS4")
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      this.offset+=this.limit
      this.getMessages(this.offset, this.limit, this.sort)
      done();
    },
    handleLBD(vm, loadDom, done) {
      console.log("handleRS3")
      done();
    },
    async deleteBlock(item){
      if(confirm('차단 해제 하시겠습니까?')){
        let messages = await this.$api.deleteBlockUser({
          userId: this.$store.state.me.userId,
          targetId: item.targetId
        })
        console.log("delete block list",messages)
       
        this.blockList = []
        this.offset = 0
        this.getMessages(this.offset, this.limit, this.sort)
      }
    },
    async getMessages(offset, limit, sort){
      console.log(offset, limit, sort)
      let messages = await this.$api.getBlockUser({
        userId: this.$store.state.me.userId,
        offset: offset,
        limit: limit,
        sort: sort
      })
      console.log("get block list",messages)
      messages.data.data.map(item => this.blockList.push(item))
    },
    async updateMain(){
      this.$forceUpdate();
    }
  },
  
  async mounted(){
    if(!this.$store.state.me.userId){
      this.$router.replace('login')
    }else{
      console.log("###mounted block")
      this.getMessages(this.offset, this.limit, this.sort)
    }
  },

  beforeDestroy(){
  }
}
</script>
<style scoped>
.block-content{
  width:100%;
  height:calc(100% - 18vw) !important;
  overflow-y:auto;
}
.header{
  font-size:4.5vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
  height:18vw;
}
.block-list-li {
  padding:2vw 4vw;
  border-top:1px solid #eee;
  font-size: 5vw;
  background:white;
}
.block-list-li .user-id{
  color:#000;
}
.block-list-li .user-id > .thumbnail-content{
  width:10vw;
  height:10vw;
  border-radius: 50%;
  background:#eee;
  overflow: hidden;
  margin-right:4vw;
}
.block-list-li .user-id > .thumbnail-content > .thumbnail{
  width:10vw;
  height:10vw;
  font-size:8vw;
  color:#aaa;
}
.block-list-li .building-name{
  color:#aaa;
  font-size: 3.5vw;
  text-align: left;
  color:rgb(21, 134, 204) ;
}
.block-list-li .delete-block-btn{
  background:rgb(255, 117, 117);
  color:white;
  padding:1vw 2vw;
  font-size:3.5vw;
  font-weight:bold;
}
</style>