<template>
  <div class="setting-image">
    <h2>图片功能设置</h2>
    <h3>添加图片</h3>
    <ul>
      <li>
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
          :file-list="image.urls"
          :auto-upload="false">
          <el-button style="width: 100%" slot="trigger" type="primary">选取图片</el-button>
          <div slot="tip" class="el-upload__tip">图片将本地持久化，因内存空间有限，限制最多添加5张，且单张图片不能超过2M</div>
        </el-upload>
      </li>
    </ul>
    <h3>其它设置</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>自动轮播</span>
            <span class="sub"></span>
          </p>
          <el-switch v-model="autoplay"></el-switch>
        </div>
      <li>
        <div class="flex-space-between">
          <p>
            <span>自适应尺寸</span>
            <span class="sub"></span>
          </p>
          <el-switch v-model="resize"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>轮播间隔</span>
            <span class="sub">拖动滑块修改间隔时间</span>
          </p>
          <span>{{delay}} 毫秒</span>
        </div>
        <el-slider v-model="delay" :min="1000" :max="10000" :step="1000" show-stops></el-slider>
      </li>
    </ul>
  </div>
</template>

<script>
import { array } from 'lodash'
import { mapGetters } from 'vuex'
export default {

  name: 'SettingImage',

  data () {
    return {
      limit: 5
    }
  },
  computed: {
    ...mapGetters(['image']),
    image () {
      return this.$store.state.image
    },
    autoplay: {
      get () {
        return this.$store.state.image.autoplay
      },
      set (value) {
        this.$store.dispatch('SettingImageAutoplay', value)
      }
    },
    resize: {
      get () {
        return this.$store.state.image.resize
      },
      set (value) {
        this.$store.dispatch('SettingImageResize', value)
      }
    },
    delay: {
      get () {
        return this.$store.state.image.delay
      },
      set (value) {
        this.$store.dispatch('SettingImageDelay', value)
      }
    }
  },
  methods: {
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
            that.$store.dispatch('SettingImageUrl', value)
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
      this.$store.dispatch('SettingImageRemove', index)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleImageExceed (files, fileList) {
      this.$message.warning(`本地存储空间有限，最多添加 ${this.limit} 张图片！`)
    },
    handleImagePreview (file) {
      // 点击图片，切换该图片为背景
      let index = this.fileIndex(file.name)
      this.$store.dispatch('SettingImageIndex', index)
    },
    fileIndex (name) {
      return _.findIndex(this.image.urls, function (item) {
        return item.name === name
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-image {
    width: 100%;
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
  }
</style>