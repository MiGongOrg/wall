<template>
  <div class="setting-title">
    <h2>标题功能设置</h2>
    <ul>
      <li>
        <h3>标题</h3>
        <el-input v-model="title.text" placeholder="输入标题"></el-input>
      </li>
      <li>
        <h3>背景颜色</h3>
        <chrome-picker :value="title.rgba" @input="updateColor"></chrome-picker>
      </li>
      <li>
        <h3>字体大小</h3>
        <el-slider v-model="title.fontSize" :min="20" :max="60"></el-slider>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chrome } from 'vue-color'

export default {

  name: 'SettingTitle',

  data () {
    return {
      
    }
  },
  components: {
    ChromePicker: Chrome
  },
  computed: {
    ...mapGetters(['title']),
    title () {
      console.log(this.$store.state.title)
      return this.$store.state.title
    }
  },
  methods: {
    /* 更新 bg color */
    updateColor (value) {

      let rgbaObj = value.rgba
        , rgbaArr = Object.keys(rgbaObj).map(function(k){return rgbaObj[k]})
        , rgbaStr = rgbaArr.toString()

      let val = {}
      val['rgba'] = value.rgba
      val['rgbaStr'] = rgbaStr

      this.$store.dispatch('SettingTitleBgColor', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-title {
    
  }
</style>