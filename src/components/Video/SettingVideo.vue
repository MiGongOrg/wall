<template>
  <div class="setting-video">
    <h2>视频功能设置</h2>
    <h3>视频类型</h3>
    <ul>
      <li>
        <el-tabs v-model="video.activeName" @tab-click="tabClick">
          <el-tab-pane label="本地视频" name="local">
            <el-upload
              class="upload-image"
              ref="upload"
              action=""
              :limit="1"
              accept="video/*"
              :on-change="handleVideoChange"
              :on-remove="handleVideoRemove"
              :on-exceed="handleVideoExceed"
              :file-list="videoFileList"
              :auto-upload="false">
              <el-button style="width: 100%" slot="trigger" type="primary">选取视频</el-button>
            </el-upload>
            <controls-video :video.sync="video.local"></controls-video>
          </el-tab-pane>
          <el-tab-pane label="链接地址" name="link">
            <el-input v-model="video.link.url" placeholder="http://"></el-input>
            <controls-video :video.sync="video.link"></controls-video>
          </el-tab-pane>
          <el-tab-pane label="抓取视频" name="capture">
            <el-input v-model="video.web" placeholder="http://"></el-input>
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
      videoFileList: []
    }
  },
  components: {
    ControlsVideo
  },
  computed: {
    ...mapGetters(['video']),
    video () {
      return this.$store.state.video
    }
  },
  methods: {
    tabClick (event) {
      let paneName = event.paneName
      this.$store.dispatch('ActiveTab', paneName)
    },
    handleVideoChange (file) {
      this.$store.dispatch('VideoUrl', file.url)
    },
    handleVideoRemove (file) {
      this.$store.dispatch('VideoUrl', '')
    },
    handleVideoExceed (file) {
      this.$notify.info({
        title: '提示',
        message: '超出数量限制！'
      })
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
