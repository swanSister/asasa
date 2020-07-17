
<template>
  <div class="notice-list">
    <Notice v-for="(notice, index) in noticeList" :noticeData="notice" :key="index+'notice'"></Notice>
  </div>
</template>

<script>

import Notice from '@/components/notice/notice.vue'

export default {
  components: {
    Notice
  },
  props:{
    noticeList:Array
  },
  data: function () {
    return {
    
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
