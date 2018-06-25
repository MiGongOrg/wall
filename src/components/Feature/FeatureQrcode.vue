<template>
  <div class="feature-qrcode">
    <img :src="qrcode.url" class="qrcode">
    <div class="feature-edit">
      <ol>
        <li @click="setting">
          <font-awesome-icon :icon="['fas', 'cogs']"/>
        </li>
        <li @click="close">
          <font-awesome-icon :icon="['fas', 'times']"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'FeatureQrcode',

  data () {
    return {

    }
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['qrcode']),
    qrcode () {

      console.log(this.$store.state.qrcode)
      return this.$store.state.qrcode
    }
  },
  methods: {
    setting () {
      console.log('点击了组件设置')
      let value = [{
        name: 'SettingQrcode'
      }]
      this.$store.dispatch('SettingNav', value)
    },
    close () {
      document.getElementById(this.parentId).innerHTML = ''
      // 清空该容器内的功能模块，设置为 default
      this.$store.dispatch('ClearFeature', this.parentId)
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-qrcode {
    .qrcode {
      display: block;
      width: 100%;
    }
  }
</style>