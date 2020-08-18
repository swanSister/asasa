<template>
  <div>
    <vue-scroll class="user-content">
      <div class="header flex align-items-center">
        <div class="backButton" style="font-size:5vw; margin-left:2vw;">
            <span @click="$router.go(-1)" class="icon-left-open"></span>
        </div>
        <div class="flex auto justify-content-center">
          마이페이지
        </div>
        <div class="backButton" style="font-size:5vw; margin-right:2vw;">
            <span @click="onLogout" class="icon-logout"></span>
        </div>
      </div>
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
            <div v-if="!$store.state.me.isAuthSuccess && !$store.state.me.isAuthWait">
              <div class="flex deny justify-content-center" @click="denyPopup(`거절사유: ${$store.state.me.authReason}`)">인증 거절</div>
            </div>
            <div class="flex column btn-content auto" v-else>
              <div class="flex btn first">
                <div v-if="$store.state.me.isAuthSuccess" class="select">
                  <span class="icon-ok" style="margin-right:2vw;"></span>
                  인증
                </div>
                <div v-else>
                   <span class="icon-cancel" style="margin-right:2vw;"></span>
                   미인증
                </div>
              </div>
              <div class="flex btn" v-if="$store.state.me.isAuthSuccess">
                <div :class="{'select':$store.state.me.isPublic}" @click="setPublic(true)">공개</div>
                <div :class="{'select':!$store.state.me.isPublic}" @click="setPublic(false)"> 비공개</div>
              </div>
            </div>
          </div>
          <div @click="$router.push('reAuth')" class="re-auth" v-if="!$store.state.me.isAuthWait">
            재인증
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
  font-size:6vw;
  font-weight: bold;
  padding:4vw 0;
  background:white;
  color:#333;
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
.body .user-info .btn-content .btn.first{
  margin-bottom:2vw;
}
.body .user-info .btn-content .btn div{
  font-size: 3.5vw;
  width:14vw;
  padding:2vw 0;
  background:#707070;
  font-weight: bold;
}
.body .user-info .btn-content .btn.first div{
  width:28vw;
  font-weight: bold;
  padding:1vw 0;
  font-size:4vw;
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