<template>
  <div class="setting-iframe">
    <h2>iframe 功能设置</h2>
    <h3>域名设置</h3>
    <ul>
      <li>
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

  name: 'SettingIframe',

  data () {
    return {

    }
  },
  components: {
    list: List
  },
  computed: {
    ...mapGetters(['iframe']),
    url: {
      get () {
        return this.$store.state.iframe.url
      },
      set (value) {
        this.$store.dispatch('SettingIframeUrl', value)
      }
    },
    history () {
      return this.$store.state.iframe.history
    }
  },
  methods: {
    handleRemove (index) {
      const that = this
      this.$confirm(`确定移除 ${ this.history[index].url }`, '提示', {
        type: 'warning'
      }).then(() => {
        that.$store.dispatch('SettingIframeHistoryUrl', index)
        that.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    handlePreview (index) {
      this.url = this.history[index].url
    },
    addHistory () {
      let value = {
        url: this.url
      }
      this.$store.dispatch('SettingIframeHistoryAddUrl', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-iframe {

  }
</style>