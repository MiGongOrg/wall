<template>
  <div class="feature-title" :style="{ backgroundColor: `rgba(${title.rgbaStr})`}">
    <span class="title" :style="{ fontSize: `${title.fontSize}px` }">{{title.text}}</span>
    <feature-setting :parentId="parentId" :settingName="settingName"></feature-setting>
  </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureTitle',

  data () {
    return {
      settingName: 'SettingTitle',
    }
  },
  components: {
    FeatureSetting
  },
  props: ['parentId', 'index'],
  methods: {

  },
  computed: {
    ...mapGetters(['title']),
    title () {
      return this.$store.state.title
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-title {
    .title {
      width: 100%;
      text-align: center;
    }
  }
</style>