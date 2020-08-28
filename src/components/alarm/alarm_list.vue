
<template>
  <div class="notice-list">
    <Alarm v-for="(alarm, index) in alarmList" :alarmData="alarm" :key="index+'notice'"></Alarm>
  </div>
</template>

<script>

import Alarm from '@/components/alarm/alarm.vue'

export default {
  components: {
    Alarm
  },
  props:{
    alarmList:Array
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
