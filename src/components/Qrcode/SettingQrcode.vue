<template>
  <div class="setting-qrcode">
    <h2>二维码功能设置</h2>
    <h3>二维码地址</h3>
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
      const that = this
      this.$confirm(`确定移除 ${ this.history[index].url }`, '提示', {
        type: 'warning'
      }).then(() => {
        that.$store.dispatch('SettingQrcodeHistoryUrl', index)
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
      this.$store.dispatch('SettingQrcodeHistoryAddUrl', value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-qrcode {

  }
</style>