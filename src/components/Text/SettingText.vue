<template>
  <div class="setting-text">
    <h2>{{$t('message.text')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.text')}}</h3>
    <ul>
      <li>
        <el-input v-model="text" placeholder="输入文字"></el-input>
      </li>
    </ul>
    <h3>{{$t('message.color')}}</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.background')}} {{$t('message.color')}}</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="bgColor"></picker>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.text')}} {{$t('message.color')}}</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="color"></picker>
        </div>
      </li>
    </ul>
    <h3>{{$t('message.font')}} {{$t('message.size')}}</h3>
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

  name: 'SettingText',

  data () {
    return {
      
    }
  },
  components: {
    Picker: Picker
  },
  computed: {
    ...mapGetters(['text']),
    text: {
      get () {
        return this.$store.state.text.content
      },
      set (value) {
        this.$store.dispatch('SettingTextContent', value)
      }
    },
    fontSize: {
      get () {
        return this.$store.state.text.fontSize
      },
      set (value) {
        this.$store.dispatch('SettingTextFontSize', value)
      }
    },
    color () {
      return this.$store.state.text.color
    },
    bgColor () {
      return this.$store.state.text.bgColor
    }
  },
  watch: {
    'color': {
      handler: function (value) {
        this.$store.dispatch('SettingTextColor', value)
      },
      deep: true
    },
    'bgColor': {
      handler: function (value) {
        this.$store.dispatch('SettingTextBgColor', value)
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-text {
    
  }
</style>