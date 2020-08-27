<template>
  <div class="notice">
      <NoticeDetail></NoticeDetail>
   
  </div>
</template>

<script>

import NoticeDetail from '@/components/notice/noticeDetail.vue'
export default {
  components:{
    NoticeDetail,
  },
  props:{
    
  },
  data () {
    return {
    }
  },
  methods:{

  },
  async mounted(){
   
  }
}
</script>
<style scoped>
.notice{
  background:white;
}

</style>