<template>
  <div class="sidebar-module">
    <div
      class="sidebar-item"
      v-for="item in app.sidebar.module"
      :is="item.component"
    >
    </div>
    <div class="select-language" @click="selectLanguage">
      <div class="language">
        <p>{{$t('message.selectLanguage')}}</p>
        <img :src="language[app.language]">
      </div>
      <p class="prompt-text">{{$t('message.selectLanguagePrompt')}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DragLayout, CustomFeature, GlobalSetting } from '@/components/Menu'
import { SettingText } from '@/components/Text'
import { SettingQrcode } from '@/components/Qrcode'
import { SettingImage } from '@/components/Image'
import { SettingClock } from '@/components/Clock'
import { SettingBarrage } from '@/components/Barrage'
import { SettingVideo } from '@/components/Video'
import { SettingIframe } from '@/components/Iframe'
import { SettingRolling } from '@/components/Rolling'

export default {

  name: 'SidebarModule',

  data () {
    return {
      language: {
        cn: require('./images/cn.png'),
        en: require('./images/en.png'),
      }
    }
  },
  components: {
    Drag: DragLayout,
    Custom: CustomFeature,
    Global: GlobalSetting,
    SettingText,
    SettingQrcode,
    SettingClock,
    SettingBarrage,
    SettingImage,
    SettingVideo,
    SettingIframe,
    SettingRolling
  },
  // 在 DOM 加载后马上执行
  computed: {
    ...mapGetters(['app']),
    app () {
      return this.$store.state.app
    }
  },
  methods: {
    selectLanguage () {
      this.$store.dispatch('SettingAppLanguage')
      this.$i18n.locale = this.app.language
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-module {
    .sidebar-item {
      box-sizing: border-box;
      height: 100%;
      width: 245px;
      background-color: #fff;
      padding: 10px 10px 100px 10px;
      overflow: auto;
      ul {
        margin-bottom: 10px;
      }
    }
    .select-language {
      position: absolute;
      left: 182.5px;
      bottom: 0;
      font-size: 14px;
      color: #454545;
      transform: translate(-50%, 0%);
      background-color: #fff;
      z-index: 9999;
      .language {
        box-sizing: border-box;
        display: flex;
        padding: 10px;
        justify-content: center;
        align-items: center;
        p {
          width: 100%;
          flex: 1;
        }
      }
      img {
        display: block;
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 0px 10px rgba(33,32,36,.3);
        }
        &:active {
          box-shadow: 0px 0px 10px rgba(33,32,36,.5);
        }
      }
      .prompt-text {
        box-sizing: border-box;
        padding: 0 10px;
        width: 245px;
        height: 30px;
        font-size: 12px;
        color: #c9c9c9;
        text-align: center;
      }
    }
  }
</style>