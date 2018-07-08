<template>
  <div class="setting-iframe">
    <h2>iframe 功能设置</h2>
    <h3>域名设置</h3>
    <ul>
      <li>
        <el-input v-model="iframe.url" placeholder="http://"></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'SettingIframe',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['iframe']),
    iframe () {
      return this.$store.state.iframe
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-iframe {

  }
</style>