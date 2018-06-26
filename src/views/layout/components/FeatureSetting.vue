<template>
  <div class="feature-setting">
    <div class="feature-setting-item"
      v-for="item in settingNav"
      :is="item.name"
      :index="item.index"
    ></div>
    <div class="close-feature-setting" @click="closeSetting">
      <font-awesome-icon :icon="['fas','times']"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SettingTitle, SettingQrcode, SettingClock, SettingBarrage, SettingImage } from '@/components/Setting'

export default {
  name: 'FeatureSetting',

  data () {
    return {
      
    }
  },
  components: {
    SettingTitle,
    SettingQrcode,
    SettingClock,
    SettingBarrage,
    SettingImage
  },
  computed: {
    ...mapGetters(['setting']),
    settingNav () {
      return this.$store.state.app.setting.nav
    }
  },
  methods: {
    closeSetting () {
      this.$store.dispatch('SettingNav', '')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-setting {
    position: relative;
    background-color: #ccc;
    transition: width 1.28s;
  }
  .close-feature-setting {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .52083333rem; /* 100px */
    line-height: .52083333rem; /* 100px */
    text-align: center;
    color: #fff;
    font-size: .10416667rem; /* 20px */
    cursor: pointer;
    background-color: tomato;
  }
  .feature-setting-item {
    box-sizing: border-box;
    height: 100%;
    min-width: 245px;
    background-color: #fff;
    padding: 10px;
    .label-title {
      display: block;
      width: 100%;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid tomato;
      padding: 5px 0;
      margin-bottom: 10px;
    }
    .title-item {
      width: 100%;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid tomato;
      padding: 5px 0;
      margin-bottom: 10px;
    }
    .flex-space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #606266;
      font-size: 14px;
    }
    li {
      margin-bottom: 20px;
    }
  }
</style>