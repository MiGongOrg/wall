<template>
  <div class="setting-interactive">
    <h2>{{$t('message.interactive')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.interactive')}} {{$t('message.banner')}}</h3>
    <ul>
      <li>
        <el-slider v-model="bannerSize" :min="30" :max="100"></el-slider>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  name: 'SettingInteractive',

  data () {
    return {
      
    }
  },
  computed: {
    bannerSize: {
      get () {
        return this.$store.state.interactive.bannerSize
      },
      set (value) {
        this.$store.dispatch('SettingBannerSize', value)
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-interactive {

  }
</style>