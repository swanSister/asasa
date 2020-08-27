<template>
  <div>
    
      <vue-scroll class="user-content">
        <div class="header flex align-items-center">
          <div style="margin-left:4vw;">
              <span @click="$router.go(-1)" class="icon-left-open"></span>
          </div>
          <div class="flex auto justify-content-center">
            마이페이지
          </div>
          <div class="logoutBtn" style="font-size:7vw; margin-right:3vw; color:rgb(21, 134, 204);">
              <span @click="onLogout" class="icon-logout"></span>
          </div>
        </div>
        <div class="body">
          <div class="user-info">
            <div class="id">{{$store.state.me.userId}}</div>
            <div class="flex align-items-end">
              <div class="address">
                <div class="ad">
                  {{$store.state.me.addressData.sido}} {{$store.state.me.addressData.sigungu}} {{$store.state.me.addressData.bname}}
                </div>
                <div class="building-info flex align-items-end" v-if="$store.state.me.addressData.buildingName">
                  <div class="name flex none align-items-start"> {{$store.state.me.addressData.buildingName}}</div>
                  <div class="type"> {{$getHousetypeName($store.state.me.houseType)}}</div>
                </div>
                <div class="building-info flex align-items-end" v-else>
                  <div class="name flex none align-items-start"> {{$getHousetypeName($store.state.me.houseType)}}</div>
                </div>
              </div>
              <div v-if="!$store.state.me.isAuthSuccess && !$store.state.me.isAuthWait">
                <div class="flex deny justify-content-center" @click="denyPopup(`거절사유: ${$store.state.me.authReason}`)">인증 거절</div>
              </div>
              <div class="flex column btn-content auto" v-else>
                <div class="flex btn first">
                  <div v-if="$store.state.me.isAuthSuccess" class="select">
                    <span class="icon-ok"></span>
                    인증
                  </div>
                  <div v-else>
                    <span class="icon-cancel"></span>
                    미인증
                  </div>
                </div>
                <div class="flex btn public" v-if="$store.state.me.isAuthSuccess">
                  <div :class="{'select':$store.state.me.isPublic}" @click="setPublic(true)">공개</div>
                  <div :class="{'select':!$store.state.me.isPublic}" @click="setPublic(false)"> 비공개</div>
                </div>
              </div>
            </div>
            <div class="flex justify-content-end">
              <div @click="$router.push('reAuth')" class="re-auth" v-if="!$store.state.me.isAuthWait">
                재인증
              </div>
            </div>
          </div>
          <div class="user-post-list">
            <div class="flex li" @click="$router.push({name: 'user/mine'})">
              <div class="flex auto list-title">내가 작성한 글</div>
              <span class="icon icon-right-open"> </span>
            </div>
            <div class="flex li" >
              <div class="flex auto list-title" @click="$router.push({name: 'user/bookmark',params:{reload:true}})">북마크</div>
              <span class="icon icon-right-open"> </span>
            </div>
          </div>
        </div>
        <Footer v-bind:footerIndex="4"></Footer>
      </vue-scroll>
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
    }
  },
  methods:{
    onLogout(){
      if (confirm('로그아웃을 계속 진행하시면 모든 내용이 초기화되고 복구가 어렵습니다. 계속 진행하시겠습니까?')) {
        this.$store.commit('me',{})
        this.$router.push('login')
      }
      
    },
    denyPopup:function(txt){
      alert(txt)
    },
    async setPublic(isPublic){
      let messages = await this.$api.setUserPublic({
        userId:this.$store.state.me.userId,
        isPublic:isPublic})
        if(messages.data.data){
          let me = this.$store.state.me
          me.isPublic = messages.data.data.isPublic
          this.$store.commit('me',me)
        }
    }
  },
  async mounted(){
    await this.$updateUserInfo()
    console.log(this.$store.state.me)
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
  background:rgb(240, 240, 240);
}
.header{
  min-height: 18vw;
  max-height: 18vw;
  font-size:6.5vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
}
.body .user-info{
  color:white;
  padding:6vw;
  background:rgb(15, 76, 129);
  text-align: left;
}
.body .user-info .id{
  justify-content: flex-start;
  font-size:5vw;
  text-align: left;
  margin-bottom:8vw;
}
.body .user-info .address{
  width:100%;
  text-align:left;
  font-size: 4vw;
  margin-top:4vw;
}
.body .user-info .address .building-info{
  margin-top:4vw;
  font-size:4.5vw;
}
.body .user-info .address .building-info .name{
  color:rgb(0, 218, 255) ;
  font-weight: bold;
  margin-right:2vw;
  max-width:36vw;
  font-size:6vw;
  line-break:anywhere;
}
.body .user-info .address .building-info .type{
  color:white;
  font-size:3.5vw;
}
.body .user-info .deny{
  font-size: 3.5vw;
  width:20vw;
  padding:2vw 0;
  background:rgb(21, 134, 204) ;
}
.body .user-info .btn-content{
  margin-left:4vw;
}
.body .user-info .btn-content .btn{
  text-align:center;
}
.body .user-info .btn-content .btn.first span{
  
}
.body .user-info .btn-content .btn div{
  font-size: 3.5vw;
  width:13vw;
  padding:2vw 0;
  background:rgb(128, 174, 255);
  font-size:4vw;
}
.body .user-info .btn-content .btn.public div{
  margin-top:2vw;
  background:rgb(153,153,153);
  
}
.body .user-info .btn-content .btn.first div{
  width:26vw;
  font-weight: bold;
}
.body .user-info .btn-content .btn div.select{
  background:rgb(255, 117, 117);
}

.body .re-auth{
  border-bottom:1px solid #ddd;
  font-size: 4vw;
  margin-top:4vw;
  padding:0 1vw;
  display:inline-block;
  text-align: center;
}
.body .user-post-list .li {
  font-size: 4vw;
  padding:4vw;
  margin-top:3vw;
  background:white;
  color:#555;
  font-weight: bold;
}
.body .user-post-list .li .icon{
  color:#ddd;
}
</style>