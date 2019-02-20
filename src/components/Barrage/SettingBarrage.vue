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
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.remove')}}</span>
            <span class="sub">清除全部消息</span>
          </p>
          <el-button @click="clearAllMsg" type="danger" icon="el-icon-delete" circle></el-button>
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
  methods: {
    clearAllMsg () {

      this.$confirm(`${this.$i18n.t('message.remove')} ${this.$i18n.t('message.all')}`, `${this.$i18n.t('message.prompt')}`, {
        type: 'warning'
      }).then(() => {
        // 清空全部消息
        this.$store.dispatch('SettingMsgData')
        this.$message({
          type: 'success',
          message: `${this.$i18n.t('message.success')}`
        })
      }).catch(() => {
        console.log('取消')
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-barrage {

  }
</style>