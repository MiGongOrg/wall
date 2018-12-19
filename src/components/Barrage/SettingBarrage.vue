<template>
  <div class="setting-barrage">
    <h2>{{$t('message.bullet')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.bullet')}}</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.loop')}}</span>
            <span class="sub">(重复循环播放弹幕内容)</span>
          </p>
          <el-switch v-model="loop"></el-switch>
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
    loop: {
      get () {
        return this.$store.state.barrage.loop
      },
      set (value) {
        this.$store.dispatch('SettingBarrageLoop', value)
      }
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-barrage {

  }
</style>