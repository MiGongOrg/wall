<template>
  <div class="setting-title">
    <h2>标题功能设置</h2>
    <ul>
      <li>
        <h3>标题</h3>
        <el-input v-model="text" placeholder="输入标题"></el-input>
      </li>
      <li>
        <h3>颜色</h3>
        <div class="flex-space-between">
          <p>
            <span>背景颜色</span>
            <span class="sub"></span>
          </p>
          <picker :color="bgColor"></picker>
        </div>
        <div class="flex-space-between">
          <p>
            <span>文字颜色</span>
            <span class="sub"></span>
          </p>
          <picker :color="textColor"></picker>
        </div>
      </li>
      <li>
        <h3>字体大小</h3>
        <el-slider v-model="fontSize" :min="20" :max="60"></el-slider>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chrome } from 'vue-color'
import Picker from '../Picker'

export default {

  name: 'SettingTitle',

  data () {
    return {
      
    }
  },
  components: {
    ChromePicker: Chrome,
    Picker: Picker
  },
  computed: {
    ...mapGetters(['title']),
    text: {
      get () {
        return this.$store.state.title.text
      },
      set (value) {
        this.$store.dispatch('SettingTitleText', value)
      }
    },
    fontSize: {
      get () {
        return this.$store.state.title.fontSize
      },
      set (value) {
        this.$store.dispatch('SettingTitleFontSize', value)
      }
    },
    textColor () {
      return this.$store.state.title.textColor
    },
    bgColor () {
      return this.$store.state.title.bgColor
    }
  },
  watch: {
    'textColor': {
      handler: function (value) {
        this.$store.dispatch('SettingTitleTextColor', value)
      },
      deep: true
    },
    'bgColor': {
      handler: function (value) {
        this.$store.dispatch('SettingTitleBgColor', value)
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-title {
    
  }
</style>