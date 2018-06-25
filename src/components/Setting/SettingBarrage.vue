<template>
  <div class="setting-barrage">
    <ul>
      <li>
        <p class="title-item">循环轮播</p>
        <div class="flex-space-between">
          <span>循环轮播</span>
          <el-switch v-model="barrage.loop"></el-switch>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'SettingBarrage',

  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['barrage']),
    barrage () {
      return this.$store.state.barrage
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-barrage {

  }
</style>