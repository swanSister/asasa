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
            <AlarmList :alarmList="alarmList" ></AlarmList>
          </div>
        </vue-scroll>

   
  </div>
</template>

<script>

import Footer from '@/components/footer'
import AlarmList from '@/components/alarm/alarm_list.vue'
export default {
  components:{
    AlarmList,
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      alarmList:[],
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
    limit:100,
    size:0,
    currentPath:'',
    }
  },
  methods:{
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.offset = 0
      this.alarmList = []
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
      console.log(offset, limit)
      let messages = await this.$api.getAlarm({
        offset: offset,
        limit: limit,
        userId: this.$store.state.me.userId
      })

      messages.data.data.map(item => this.alarmList.push(item))
      
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