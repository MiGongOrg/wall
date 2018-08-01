<template>
  <div class="global-setting">
    <h2>全局设置</h2>
    <h3>背景类型</h3>
    <ul>
      <li>
        <el-tabs v-model="global.activeName" @tab-click="tabClick">
          <el-tab-pane label="背景图片" name="backgroundImage">
            <el-upload
              class="upload-image"
              ref="upload"
              action=""
              :limit="limit"
              accept="image/*"
              :on-change="handleImageChange"
              :before-remove="beforeRemove"
              :on-remove="handleImageRemove"
              :on-exceed="handleImageExceed"
              :on-preview="handleImagePreview"
              :file-list="global.bgImage.files"
              :auto-upload="false">
              <el-button style="width: 100%" slot="trigger" type="primary">选取图片</el-button>
              <div slot="tip" class="el-upload__tip">图片将本地持久化，因内存空间有限，限制最多添加5张，且单张图片不能超过2M</div>
            </el-upload>
            <div class="flex-space-between margin-top">
              <span>自动轮播</span>
              <el-switch v-model="autoplay"></el-switch>
            </div>
            <div class="margin-top">
              <p class="flex-space-between">
                <span>轮播间隔</span>
                <span>{{delay}} 毫秒</span>
              </p>
              <el-slider v-model="delay" :min="1000" :max="10000" :step="1000" show-stops></el-slider>
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
              :file-list="global.bgVideo.files"
              :auto-upload="false">
              <el-button style="width: 100%" slot="trigger" type="primary">选取视频</el-button>
              <div slot="tip" class="el-upload__tip">视频文件暂不支持本地持久化存储，如意外关闭或刷新网页，请删除视频重新添加</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="背景动画" name="backgroundAnim">
            <el-select
              v-model="global.bgAnim.activeName"
              placeholder="请选择"
              @change="handleAnimChange"
            >
              <el-option
                v-for="item in global.bgAnim.options"
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
            <span>拖拽布局</span>
            <span class="sub">拖拽容器调整布局位置</span>
          </p>
          <el-switch v-model="draggable"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>缩放尺寸</span>
            <span class="sub">拉伸容器右下角缩放容器大小</span>
          </p>
          <el-switch v-model="resizable"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>布局溢出</span>
            <span class="sub">是否允许容器布局溢出</span>
          </p>
          <el-switch v-model="overflow"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>背景色</span>
            <span class="sub">点击右侧色块修改容器背景色</span>
          </p>
          <picker :color="global.bgColor"></picker>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { array } from 'lodash'
import { mapGetters } from 'vuex'
import Picker from '../Picker'

export default {

  name: 'GlobalSetting',

  data () {
    return {
      limit: 5
    }
  },
  components: {
    Picker: Picker
  },
  computed: {
    ...mapGetters(['global']),
    global () {
      return this.$store.state.global
    },
    autoplay: {
      get () {
        return this.$store.state.global.bgImage.autoplay
      },
      set (value) {
        this.$store.dispatch('SettingGlobalBgImageAutoplay', value)
      }
    },
    delay: {
      get () {
        return this.$store.state.global.bgImage.delay
      },
      set (value) {
        this.$store.dispatch('SettingGlobalBGImageDelay', value)
      }
    },
    draggable: {
      get () {
        return this.$store.state.global.draggable
      },
      set (value) {
        this.$store.dispatch('SettingGlobalDraggable', value)
      }
    },
    resizable: {
      get () {
        return this.$store.state.global.resizable
      },
      set (value) {
        this.$store.dispatch('SettingGlobalResizable', value)
      }
    },
    overflow: {
      get () {
        return this.$store.state.global.overflow
      },
      set (value) {
        this.$store.dispatch('SettingGlobalOverflow', value)
      }
    }
  },
  watch: {
    'global.bgColor': {
      handler: function (value) {
        this.$store.dispatch('SettingGlobalBgColor', value)
      },
      deep: true
    }
  },
  methods: {
    tabClick (event) {
      let value = event.paneName
      this.$store.dispatch('SettingGlobalActive', value)
    },
    handleImageChange (file, fileList) {

      const that = this
      let xhr = new XMLHttpRequest()
      let fileReader = new FileReader()
      let url = file.url
      let name = file.name
      // 本地持久化图片 https://www.w3ctech.com/topic/767
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          fileReader.onload = function (evt) {
            let value = {}
            let result = evt.target.result
            value.url = result
            value.name = name
            that.$store.dispatch('SettingGlobalBgImage', value)
          }
          fileReader.readAsDataURL(xhr.response)
        }
      }, false)

      xhr.send()
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${ file.name }`, '提示', {
        type: 'warning'
      })
    },
    handleImageRemove (file) {
      const that = this
      let index = that.fileIndex(file.name)
      this.$store.dispatch('SettingGlobalBgImageRemove', index)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleImageExceed (file) {
      this.$message.warning(`本地存储空间有限，最多添加 ${this.limit} 张图片！`)
    },
    handleImagePreview (file) {
      // 点击图片，切换该图片为背景
      let index = this.fileIndex(file.name)
      this.$store.dispatch('SettingGlobalBgImageIndex', index)
    },
    fileIndex (name) {
      return _.findIndex(this.global.bgImage.files, function (item) {
        return item.name === name
      })
    },
    handleVideoChange (file) {
      let value = {
        url: file.url,
        name: file.name
      }
      this.$store.dispatch('SettingGlobalBgVideo', value)
    },
    handleVideoRemove (file) {
      this.$store.dispatch('SettingGlobalBgVideoRemove', 0)
    },
    handleVideoExceed (file) {
      this.$message.warning('只允许添加一个背景视频')
    },
    handleMarginChange (value) {
      console.log(value)
    },
    handleAnimChange (value) {
      this.$store.dispatch('SettingGlobalBgAnim', value)
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
    .el-select {
      width: 100%;
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
