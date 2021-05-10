<template>
  <div class="notice">
    <div class="notice-header flex justify-content-center align-items-center"> 
      <div class="backButton" style="font-size:5vw; margin-left:2vw;">
          <span @click="$router.go(-1)" class="icon-left-open"></span>
      </div>
      <div class="flex auto justify-content-center" style="margin-right:5vw">
        공지사항
      </div>
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
      noticeList:[],
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
    }
  },
  methods:{
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.offset = 0
      this.noticeList = []
      this.getMessages(this.offset, this.limit)
      done();
    },
    handleRBD(vm, loadDom, done) {
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
        this.offset+=this.limit
        await this.getMessages(this.offset+1, this.limit)
      done();
    },
    handleLBD(vm, loadDom, done) {
      done();
    },
    async getMessages( offset, limit){
      let messages = await this.$api.getNotice({
        offset:offset,
        limit:limit
      })
      messages.data.data.map(item => this.noticeList.push(item))
    },
  },
  async mounted(){
    this.getMessages(this.offset, this.limit)
  }
}
</script>
<style scoped>
.notice{
  background:white;
}
.notice-content{
  width:100%;
  height:calc(100% - 18vw) !important;
  overflow-y:auto;
}
.notice-header{
  background:white;
  height:18vw;
  padding:0 4vw;
  border-bottom: 1px solid #eee;
  font-size: 6vw;
  color:#333;
  font-weight: bold;
}

</style>