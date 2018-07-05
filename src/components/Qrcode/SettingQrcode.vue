<template>
  <div class="setting-qrcode">
    <h2>二维码功能设置</h2>
    <ul>
      <li>
        <h3>二维码地址</h3>
        <el-input v-model="qrcode.url" placeholder="http://"></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'SettingQrcode',

  data () {
    return {
      input: null
    }
  },
  computed: {
    ...mapGetters(['qrcode']),
    qrcode () {
      return this.$store.state.qrcode
    }
  },
  created () {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-qrcode {
    
  }
</style>