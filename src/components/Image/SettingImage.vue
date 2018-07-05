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
          <el-switch v-model="image.autoplay"></el-switch>
        </div>
      <li>
        <div class="flex-space-between">
          <p>
            <span>自适应尺寸</span>
            <span class="sub"></span>
          </p>
          <el-switch v-model="image.size"></el-switch>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>轮播间隔</span>
            <span class="sub"></span>
          </p>
          <span>{{image.delay}} 毫秒</span>
        </div>
        <el-slider v-model="image.delay" :min="1000" :max="10000" :step="1000" show-stops></el-slider>
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
      imageFileList: []
    }
  },
  computed: {
    ...mapGetters(['image']),
    image () {
      return this.$store.state.image
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

      console.log(fileListArr)
      this.$store.dispatch('ImageUrl', fileListArr)
    },
    handleImageRemove (file) {
      console.log(file.name)
      this.$store.dispatch('ImageUrl', '')
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

      console.log('index:', index)

      this.$store.dispatch('ImageIndex', index)
    },
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