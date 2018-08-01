<template>
  <div class="setting-video">
    <h2>视频功能设置</h2>
    <h3>视频类型</h3>
    <ul>
      <li>
        <el-tabs v-model="activeName">
          <el-tab-pane label="本地视频" name="local">
            <el-upload
              class="upload-image"
              ref="upload"
              action=""
              :limit="limit"
              accept="video/*"
              :on-change="handleVideoChange"
              :before-remove="beforeRemove"
              :on-remove="handleVideoRemove"
              :on-exceed="handleVideoExceed"
              :file-list="videoFileList"
              :auto-upload="false">
              <el-button style="width: 100%" slot="trigger" type="primary">选取视频</el-button>
            </el-upload>
            <controls-video :video.sync="videoLocal"></controls-video>
          </el-tab-pane>
          <el-tab-pane label="链接地址" name="link">
            <el-input v-model="linkUrl" placeholder="http://"></el-input>
            <controls-video :video.sync="videoLink"></controls-video>
          </el-tab-pane>
          <el-tab-pane label="抓取视频" name="capture">
            <el-input v-model="videoCapture.url" placeholder="http://"></el-input>
          </el-tab-pane>
        </el-tabs>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ControlsVideo from './ControlsVideo'
export default {

  name: 'SettingVideo',

  data() {
    return {
      limit: 1,
      videoFileList: []
    }
  },
  components: {
    ControlsVideo
  },
  computed: {
    ...mapGetters(['video']),
    activeName: {
      get () {
        return this.$store.state.video.activeName
      },
      set (value) {
        this.$store.dispatch('SettingVideoActiveTab', value)
      }
    },
    linkUrl: {
      get () {
        return this.$store.state.video.link.url
      },
      set (value) {
        this.$store.dispatch('SettingVideoLinkUrl', value)
      }
    },
    videoLink () {
      return this.$store.state.video.link
    },
    videoLocal () {
      return this.$store.state.video.local
    },
    videoCapture () {
      return this.$store.state.video.capture
    }
  },
  watch: {
    'videoLink': {
      handler: function (value) {
        this.$store.dispatch('SettingVideoLink', value)
      },
      deep: true
    },
    'videoLocal': {
      handler: function (value) {
        this.$store.dispatch('SettingVideoLocal', value)
      },
      deep: true
    }
  },
  methods: {
    handleVideoChange (file) {
      this.$store.dispatch('SettingVideoLocalUrl', file.url)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${ file.name }`, '提示', {
        type: 'warning'
      })
    },
    handleVideoRemove (file) {
      this.$store.dispatch('SettingVideoLocalUrl', '')
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleVideoExceed (file) {
      this.$message.warning(`最多添加 ${this.limit} 个视频！`)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-video {
    .el-upload {
      display: block;
    }
  }
</style>
