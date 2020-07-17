<template>
  <div class="notice">
    <div class="notice-header flex justify-content-center align-items-center"> 
      알림
    </div>
    <vue-scroll class="notice-content"
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
           <NoticeList :noticeList="noticeList" ></NoticeList>
        </div>
      </vue-scroll>
      <Footer v-bind:footerIndex="3"></Footer>
   
  </div>
</template>

<script>

import Footer from '@/components/footer'
import NoticeList from '@/components/notice/notice_list.vue'
export default {
  components:{
    NoticeList,
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      noticeList:[{
        title:'공지사항',
        sub:'성북동 회원 100명 돌파! 회원들과 대화를 나누세요.',
        time:'방금 전',
        writer:'운영진'
      },
      {
        title:'이벤트',
        sub:'이벤트 1',
        time:'7분전',
        writer:'운영진'
      },
      {
        title:'공동구매',
        sub:'저렴이들 구경 오세요~',
        time:'3시간 전',
        writer:'운영진'
      }],
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
    limit:10,
    size:0,
    currentPath:'',
    sort:1,
    }
  },
  methods:{
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
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
      console.log(path, offset, limit, sort)
      // let messages = await this.$api.getByPath(`${this.currentPath}/messages`,offset,limit, sort)
      // messages.data.documents.map(item => this.chatList.push(item))
      // this.size = messages.data.size
    },
  },
  async mounted(){
    this.currentPath = this.$store.state.me.topics[0].path
  }
}
</script>
<style scoped>
.notice{
  background:white;
}
.notice-content{
  width:100%;
  height:calc(100% - 28vw) !important;
  overflow-y:auto;
}
.notice-header{
  background:white;
  height:14vw;
  padding:0 4vw;
  border-bottom: 1px solid #eee;
  font-size: 6vw;
  color:#333;
  font-weight: bold;
}

</style>