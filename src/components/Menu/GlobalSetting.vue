<template>
  <div class="global-setting">
    <h2>全局设置</h2>
    <h3>背景类型</h3>
    <ul>
      <li>
        <el-tabs v-model="background.activeName">
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
              <el-switch v-model="background.backgroundImage.autoplay"></el-switch>
            </div>
            <div class="margin-top">
              <p class="flex-space-between">
                <span>轮播间隔</span>
                <span>{{background.backgroundImage.delay}} 毫秒</span>
              </p>
              <el-slider v-model="background.backgroundImage.delay" :min="1000" :max="10000" :step="1000" show-stops></el-slider>
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
          <el-tab-pane label="背景动画" name="backgroundSnow">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-tab-pane>
        </el-tabs>
      </li>
    </ul>
    <h3>容器设置</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>可拖拽布局</span>
            <span class="sub">(拖拽容器调整布局位置)</span>
          </p>
          <el-switch v-model="global.draggable"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>可缩放尺寸</span>
            <span class="sub">(拉伸容器右下角缩放容器大小)</span>
          </p>
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
      value: '',
      options: [{
        value: 'show',
        label: '3D 雪花'
      }],
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
    },
    background () {
      return this.$store.state.background
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
      this.$store.dispatch('VideoBgUrl', file.url)
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
    width: 100%;
    background-color: #fff;
    padding: 10px;
    .el-upload {
      display: block;
    }
    .title-item {
      width: 100%;
      font-size: 14px;
      color: #454545;
      padding: 0 10px;
      margin-bottom: 10px;
    }
    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #454545;
      font-size: 14px;
      p {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
      .sub {
        display: block;
        width: 100%;
        text-align: left;
        font-size: 12px;
        margin-top: 5px;
        color: #c9c9c9;
      }
    }
    .margin-top {
      margin-top: 10px;
    }
  }
</style>
