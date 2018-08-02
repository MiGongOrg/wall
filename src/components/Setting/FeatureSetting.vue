<template>
  <div class="feature-setting">
    <ol>
      <li @click="fullscreen">
        <p class="icon-image feature-fullscreen-icon"></p>
      </li>
      <li @click="setting">
        <p class="icon-image feature-setting-icon"></p>
      </li>
      <li @click="close">
        <p class="icon-image feature-close-icon"></p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {

  name: 'FeatureSetting',

  data () {
    return {

    }
  },
  props: ['parentId', 'settingName'],
  methods: {
    fullscreen () {
      this.$emit('toggleFullScreen')
    },
    setting () {
      let val = [{ component: this.settingName }]
      this.$store.dispatch('SettingAppSidebarModule', val)
    },
    close () {
      document.getElementById(this.parentId).innerHTML = ''
      // 清空该容器内的功能模块，设置为 default
      this.$store.dispatch('SettingAppClearFeature', this.parentId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-setting {
    position: absolute;
    top: -35px;
    right: 0;
    padding: 5px;
    z-index: 1;
    transition: top .28s;
    ol {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li {
      cursor: pointer;
      margin-left: 5px;
    }
    .icon-image {
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
    .feature-fullscreen-icon {
      background-image: url('./images/icon-fullscreen.png');
    }
    .feature-setting-icon {
      background-image: url('./images/icon-setting.png');
    }
    .feature-close-icon {
      background-image: url('./images/icon-close.png');
    }
  }
</style>