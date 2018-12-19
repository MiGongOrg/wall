<template>
  <div class="setting-video">
    <h2>{{$t('message.video')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.video')}}</h3>
    <ul>
      <li>
        <el-tabs v-model="activeName">
          <el-tab-pane name="local">
            <span slot="label">{{$t('message.video')}}</span>
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
              <el-button style="width: 100%" slot="trigger" type="primary">{{$t('message.choose')}}</el-button>
            </el-upload>
            <controls-video :video.sync="videoLocal"></controls-video>
          </el-tab-pane>
          <el-tab-pane name="link">
            <span slot="label">{{$t('message.url')}}</span>
            <el-input v-model="linkUrl" placeholder="http://"></el-input>
            <controls-video :video.sync="videoLink"></controls-video>
          </el-tab-pane>
          <el-tab-pane name="capture">
            <span slot="label">{{$t('message.capture')}}</span>
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
      let url = URL.createObjectURL(file.raw)
      this.$store.dispatch('SettingVideoLocalUrl', url)
    },
    beforeRemove (file) {
      return this.$msgbox({
        title: `${this.$i18n.t('message.prompt')}`,
        message: `${this.$i18n.t('message.remove')} ${ file.name }`,
        type: 'warning'
      })
    },
    handleVideoRemove (file) {
      this.$store.dispatch('SettingVideoLocalUrl', '')
      this.$message({
        type: 'success',
        message: `${this.$i18n.t('message.success')}`
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
