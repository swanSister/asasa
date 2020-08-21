<template>
  <div>
    <div class="search-input flex align-items-center"> 
      <div class="input-content flex auto align-items-center">
        <span class="icon icon-search"></span>
        <input @keypress="onKeyPress" class="flex auto" v-model="keyword" placeholder="검색어를 입력해 주세요.">
      </div>
      <div class="btn flex none" @click="cancelSearch">취소</div>
    </div>
    <div class="scroll-containner">
      <vue-scroll class="search-content"
        :ops = "ops"
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
              <PostList v-if="postList.length" @sort="onSort" :postList="postList"></PostList>
              <div class="empty-text" v-else>
                <div v-if="isSearchStart">
                  검색결과가 없습니다.
                </div>
                <div v-else>
                </div>
              </div>
          </div>
        </vue-scroll>
      </div>
      <Footer v-bind:footerIndex="1"></Footer>
   
  </div>
</template>

<script>

import Footer from '@/components/footer'
import PostList from '@/components/post/post_list.vue'
export default {
  components:{
    PostList,
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      headerData:[],
      postList:[],
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
    limit:100,
    size:0,
    currentPath:'',
    sort:1,
    keyword:'',
    isSearchStart:false,
    }
  },
  methods:{
    cancelSearch(){
      this.keyword = ''
      this.postList = []
      this.offset = 0
      this.size = 0
      this.isSearchStart = false
    },
    onKeyPress(e){
      if (e.keyCode == 13) {
        this.postList = []
        this.isSearchStart = true
        this.getMessages(this.offset, this.limit, this.sort)
      }
    },
    onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순, 4:댓글순
      this.postList = []
      this.offset = 0
      this.sort = sort
      console.log(this.offset, this.sort)
      this.getMessages(this.offset, this.limit, this.sort)
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.postList = []
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
    async getMessages(offset, limit, sort){
      //test로 topic 읽어오기
      let messages = await this.$api.getPostSearchList(
        {
          topics:this.$store.state.me.topics,
          keyword:this.keyword,
          offset:offset,
          limit:limit,
          sort:sort
        })
      messages.data.data.map(item => this.postList.push(item))
    },
  },
  async mounted(){
    this.currentPath = this.$store.state.me.topics[0].path
  }
}
</script>
<style scoped>
.search-content{
  width:100%;
  height:calc(100% - 28vw) !important;
  overflow-y:auto;
}
.search-input{
  background:white;
  height:14vw;
  padding:0 4vw;
  border-bottom: 1px solid #eee;
}
.search-input .input-content{
  background:rgb(240, 240, 240);
  margin-right:4vw;
  height:9vw;
  border-radius: 4vw;
  padding-left:2vw;
  color:#555;
}
.search-input .input-content > .icon{
  color:#aaa;
}
.search-input .input-content > input{
  margin-left: 1vw;
  background: transparent;
}
.empty-text{
  color:#999;
  margin-top: 8vw;
  font-size: 4vw;
}
</style>