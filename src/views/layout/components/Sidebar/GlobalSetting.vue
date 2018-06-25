<template>
  <div class="global-setting">
    <ul>
      <li>
        <el-tabs v-model="activeName">
          <el-tab-pane label="背景图片" name="backgroundImage">
            <el-upload
              class="upload-image"
              ref="upload"
              action=""
              :limit="10"
              accept="image/*"
              :on-change="handleImageChange"
              :on-remove="handleImageRemove"
              :on-exceed="handleImageExceed"
              :on-preview="handleImagePreview"
              :file-list="imageFileList"
              :auto-upload="false">
              <el-button style="width: 100%" slot="trigger" type="primary">选取图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="flex-space-between margin-top">
              <span>自动轮播</span>
              <el-switch v-model="global.backgroundImage.autoplay"></el-switch>
            </div>
            <div class="margin-top">
              <p class="flex-space-between">
                <span>轮播间隔</span>
                <span>{{global.backgroundImage.delay}} 毫秒</span>
              </p>
              <el-slider v-model="global.backgroundImage.delay" :min="1000" :max="10000" :step="1000" show-stops></el-slider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="背景视频" name="backgroundVideo">
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
              <div slot="tip" class="el-upload__tip">只能上传 .mp4 文件</div>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </li>
      <li>
          <p class="title-item">拖拽布局</p>
          <div class="flex-space-between">
            <span>可拖拽布局</span>
            <el-switch v-model="global.draggable"></el-switch>
          </div>
      </li>
      <li>
          <p class="title-item">缩放尺寸</p>
          <div class="flex-space-between">
            <span>可缩放尺寸</span>
            <el-switch v-model="global.resizable"></el-switch>
          </div>
      </li>
      <li>
        <p class="title-item">容器背景色</p>
        <div>
          <chrome-picker :value="global.backgroundColor.rgba" @input="updateColor"></chrome-picker>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { array } from 'lodash'
import { mapGetters } from 'vuex'
import { Chrome } from 'vue-color'

export default {

  name: 'GlobalSetting',

  data () {
    return {
      test: '0,0,0.01',
      activeName: 'backgroundImage',
      imageFileList: [],
      videoFileList: []
    }
  },
  components: {
    ChromePicker: Chrome
  },
  computed: {
    ...mapGetters(['global']),
    global () {
      return this.$store.state.app.setting.global
    }
  },
  methods: {
    handleImageChange (file, fileList) {
      let fileListArr = []

      fileList.forEach((item, index) => {
        let obj = {}
        obj.name = item.name
        obj.url = item.url
        fileListArr.push(obj)
      })

      this.imageFileList = fileListArr

      this.$store.dispatch('ImageBgUrl', fileListArr)
    },
    handleImageRemove (file) {
      console.log(file.name)
      this.$store.dispatch('ImageBgUrl', '')
    },
    handleImageExceed (file) {
      this.$notify.info({
        title: '提示',
        message: '超出数量限制！'
      })
    },
    handleImagePreview (file) {
      // 点击图片，切换该图片为背景

      let index = _.findIndex(this.imageFileList, function (o) {
        return o.name === file.name
      })

      this.$store.dispatch('ImageBgIndex', index)
      // imageFileList
    },
    handleVideoChange (file) {
      this.$store.dispatch('VideoBgUrl', file)
    },
    handleVideoRemove (file) {
      this.$store.dispatch('VideoBgUrl', '')
    },
    handleVideoExceed (file) {
      this.$notify.info({
        title: '提示',
        message: '超出数量限制！'
      })
      _this.$store.dispatch('DragId', el.id)
    },
    handleMarginChange (value) {
      console.log(value)
    },
    /* 更新容器背景颜色 */
    updateColor (value) {

      let rgbaObj = value.rgba
        , rgbaArr = Object.keys(rgbaObj).map(function(k){return rgbaObj[k]})
        , rgbaStr = rgbaArr.toString()

      let val = {}
      val['rgba'] = value.rgba
      val['rgbaStr'] = rgbaStr

      this.$store.dispatch('SettingContainerBgColor', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .global-setting {
    box-sizing: border-box;
    height: 100%;
    width: 245px;
    background-color: #fff;
    padding: 10px;
    .el-upload {
      display: block;
    }
    .title-item {
      width: 100%;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid tomato;
      padding: 5px 0;
      margin-bottom: 10px;
    }
    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #606266;
      font-size: 14px;
    }
    .margin-top {
      margin-top: 10px;
    }
    li {
      margin-bottom: 20px;
    }
  }
</style>
