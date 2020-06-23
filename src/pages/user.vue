<template>
  <div>
    <vuescroll class="user-content">
      <div class="header align-items-center justify-content-start">마이페이지</div>
      <div class="body">
        <div class="user-info">
          <div class="id">{{$store.state.me.userId}}</div>
          <div class="flex align-items-end">
            <div class="address">
              {{$store.state.me.addressData.sido}} {{$store.state.me.addressData.sigungu}} {{$store.state.me.addressData.bname}}
              <div class="building-info flex align-items-center">
                <div class="name" v-if="$store.state.me.addressData.buildingName"> {{$store.state.me.addressData.buildingName}}</div>
                <div class="type"> {{$store.state.me.houseType.name}}</div>
              </div>
            </div>
            
            <div v-if="$store.state.me.auth &&!$store.state.me.auth.isAuthComplete">
              <div class="flex deny justify-content-center" @click="denyPopup(`거절사유: ${$store.state.me.auth.reason}`)">인증 거절</div>
            </div>
            <div class="flex column btn-content auto" v-else>
              <div class="flex btn" >
                <div :class="{'select':$store.state.me.isAuth}">인증</div>
                <div :class="{'select':!$store.state.me.isAuth}">미인증</div>
              </div>
              <div class="flex btn" v-if="$store.state.me.isAuth">
                <div :class="{'select':$store.state.me.public}">공개</div>
                <div :class="{'select':!$store.state.me.public}"> 비공개</div>
              </div>
            </div>

          </div>
          <div @click="$router.push('reAuth')" class="re-auth" v-if="$store.state.me.isAuth || ($store.state.me.auth &&!$store.state.me.auth.isAuthComplete)">
            재인증
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
    }
  },
  methods:{
    denyPopup:function(txt){
      alert(txt)
    }
  },
  async mounted(){
    await this.$updateUserInfo()
      if(!this.$store.state.me.userId){
        this.$router.push('login')
        return
      }
    
  }
}
</script>
<style scoped>
.user-content{
  width:100%;
  height:100%;
  overflow-y:auto;
  background:white;
}
.header{
  min-height:14vw;
  max-height:14vw;
  line-height:14vw;
  background:#333;
  color:white;
}
.body .user-info{
  color:white;
  padding:6vw;
  background:rgb(66,66,76);
  text-align: left;
}
.body .user-info .id{
  justify-content: flex-start;
  font-size:4vw;
  text-align: left;
  margin-bottom:4vw;
}
.body .user-info .address{
  width:100%;
  text-align:left;
  font-size: 4vw;
  margin-top:4vw;
}
.body .user-info .address .building-info{
  margin-top:1vw;
  font-size:4vw;
}
.body .user-info .address .building-info .name{
  color:tomato;
  font-weight: bold;
  margin-right:4vw;
}
.body .user-info .address .building-info .type{
  color:#ddd;
  min-width:20vw;
  max-width:20vw;
}
.body .user-info .deny{
  font-size: 3.5vw;
  width:20vw;
  padding:2vw 0;
  background:tomato;
}
.body .user-info .btn-content{
  margin-left:4vw;
}
.body .user-info .btn-content .btn{
  text-align:center;
}
.body .user-info .btn-content .btn:first-child{
  margin-bottom:2vw;
  opacity: .7;
}
.body .user-info .btn-content .btn div{
  font-size: 3.5vw;
  width:14vw;
  padding:2vw 0;
  background:#555;
}
.body .user-info .btn-content .btn div.select{
  background:tomato;
}
.body .re-auth{
  border-bottom:1px solid #ddd;
  font-size: 4vw;
  margin-top:4vw;
  padding:0 1vw;
  display:inline-block;
  text-align: center;
}
</style>