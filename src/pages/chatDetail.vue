<template>
  <div class="chat-detail"> 
    <div class="header flex align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.go(-1)" class="icon-left-open"></span>
        </div>
        <div class="flex auto justify-content-center">
          채팅방 제목
        </div>
        <div @click="isSliderMenuShow= !isSliderMenuShow" class="backButton" style="font-size:5vw; margin-right:2vw;">
            <span class="icon-menu"></span>
        </div>
      </div>
    <vue-scroll class="chat-detail-content"
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
          
        </div>
      </vue-scroll>
      <div v-if="isSliderMenuShow" @click.self="isSliderMenuShow=false" class="slide-menu-bg">
      
      </div>
      <transition name="slide">

            <div v-if="isSliderMenuShow" class="slide-menu">
                <div class="slide-menu-header">Header</div>
                <vue-scroll class="slide-menu-body">
                  <div>adsasadvsaddsav</div>
                  <div>adsasadvsaddsav</div>
                  <div>adsasadvsaddsav</div>
                  <div>adsasadvsaddsav</div>
                  <div>adsasadvsaddsav</div>
                  <div>adsasadvsaddsav</div>
                </vue-scroll>
                <div class="slide-menu-body">Footer</div>
            </div>
      </transition>
      <Footer v-bind:footerIndex="2"></Footer>
   
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
      isSliderMenuShow:false,
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
    searchText:'',
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
.chat-detail{
  background:white;
}
.chat-detail-content{
  width:100%;
  height:calc(100% - 48vw) !important;
  overflow-y:auto;
}
.header{
  font-size:6vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
}

.slide-menu-bg{
  overflow: hidden;
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,.5);
  position:fixed;
  left:0;
  top:0;
  z-index: 5;
}
.slide-menu{
  width:60vw;
  height:100%;
  background:white;
  position: fixed;
  right:0;
  top:0;
  z-index: 6;
}
.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}

.slide-menu-header{
  height:14vw;
  border-bottom: 1px solid #ddd;
}
.slide-menu-body{
  height:calc(100% - 28vw) !important;
  border-bottom: 1px solid #ddd;
}
.slide-menu-footer{
  height:14vw;

}
</style>