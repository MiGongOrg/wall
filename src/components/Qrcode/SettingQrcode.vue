<template>
  <div class="setting-qrcode">
    <h2>二维码功能设置</h2>
    <ul>
      <li>
        <h3>二维码地址</h3>
        <el-input v-model="url" placeholder="http://">
          <template slot="append">
            <el-button type="primary" @click="addHistory">添加</el-button>
          </template>
        </el-input>
      </li>
    </ul>
    <h3 v-if="history.length">历史记录</h3>
    <list :list="history" :on-remove="handleRemove" :on-preview="handlePreview"></list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '../List'

export default {

  name: 'SettingQrcode',

  data () {
    return {
      
    }
  },
  components: {
    list: List
  },
  computed: {
    ...mapGetters(['qrcode']),
    url: {
      get () {
        return this.$store.state.qrcode.url
      },
      set (value) {
        this.$store.dispatch('SettingQrcodeUrl', value)
      }
    },
    history () {
      return this.$store.state.qrcode.history
    }
  },
  methods: {
    handleRemove (index) {
      this.$store.dispatch('SettingHistoryUrl', index)
    },
    handlePreview (index) {
      this.url = this.history[index].url
    },
    addHistory () {
      let value = {
        url: this.url
      }
      this.$store.dispatch('SettingHistoryAddUrl', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-qrcode {

  }
</style>