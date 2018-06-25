<template>
  <div class="setting-title">
    <ul>
      <li>
        <label class="label-title">标题</label>
        <el-input v-model="layout.init[index].setting[0].text" placeholder="输入标题"></el-input>
      </li>
      <li>
        <label class="label-title">背景颜色</label>
        <chrome-picker :value="layout.init[index].setting[0].rgba" @input="updateColor"></chrome-picker>
      </li>
      <li>
        <label class="label-title">字体大小</label>
        <el-slider v-model="layout.init[index].setting[0].fontSize" :min="20" :max="60"></el-slider>
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
  props: ['index'],
  components: {
    ChromePicker: Chrome
  },
  computed: {
    ...mapGetters(['layout']),
    layout () {
      return this.$store.state.app.layout
    }
  },
  methods: {
    /* 更新 bg color */
    updateColor (value) {

      let rgbaObj = value.rgba
        , rgbaArr = Object.keys(rgbaObj).map(function(k){return rgbaObj[k]})
        , rgbaStr = rgbaArr.toString()

      let val = {}
      val['index'] = this.index
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