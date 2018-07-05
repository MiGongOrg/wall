<template>
  <div class="feature-qrcode">
    <img :src="qrcode.url" class="qrcode">
    <feature-setting :parentId="parentId" :settingName="settingName"></feature-setting>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureQrcode',

  data () {
    return {
      settingName: 'SettingQrcode',
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['qrcode']),
    qrcode () {
      return this.$store.state.qrcode
    }
  },
  methods: {
    
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