<template>
  <div>
    <div class="search-input flex align-items-center"> 
      <div class="input-content flex auto align-items-center">
        <span class="icon icon-search"></span>
        <input @keypress="onKeyPress" class="flex auto" v-model="searchText" placeholder="검색어를 입력해 주세요.">
      </div>
      <div class="btn flex none" @click="cancelSearch">취소</div>
    </div>
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
    searchText:'',
    isSearchStart:false,
    }
  },
  methods:{
    cancelSearch(){
      this.searchText = ''
      this.postList = []
      this.offset = 0
      this.size = 0
      this.isSearchStart = false
    },
    onKeyPress(e){
      if (e.keyCode == 13) {
        this.isSearchStart = true
        this.getMessages(this.currentPath, this.offset, this.limit, this.sort)
      }
    },
    onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순
      console.log(sort)
      
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.postList = []
      await this.getMessages(this.currentPath,this.offset, this.limit, this.sort)
      done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
       if(this.offset + this.limit <= this.size){
        this.offset+=this.limit
        await this.getMessages(this.currentPath,this.offset+1, this.limit)
      }
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async getMessages(path, offset, limit, sort){
      //test로 topic 읽어오기
      let messages = await this.$api.searchByKeyword(this.searchText,offset,limit, sort)
      
      let that = this
      messages.data.map(function(item){
        let temp = {}
        temp.id = item.objectID
        temp.fields = item
        temp.path = item.topic.path + '/messages/'+temp.id
        temp.isSearchResult = true

        item.createdAt = {}
        item = temp
        
        that.postList.push(item)
      })
      this.size = this.postList.length
      console.log(this.postList)
      this.size = messages.data.size
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
  height:7vw;
  border-radius: 3.5vw;
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