<template>
  <div class="setting-title">
    <h2>标题功能设置</h2>
    <h3>标题</h3>
    <ul>
      <li>
        <el-input v-model="text" placeholder="输入标题"></el-input>
      </li>
    </ul>
    <h3>颜色</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>背景颜色</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="bgColor"></picker>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>文字颜色</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="textColor"></picker>
        </div>
      </li>
    </ul>
    <h3>字体大小</h3>
    <ul>
      <li>
        <el-slider v-model="fontSize" :min="20" :max="60"></el-slider>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Picker from '../Picker'

export default {

  name: 'SettingTitle',

  data () {
    return {
      
    }
  },
  components: {
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