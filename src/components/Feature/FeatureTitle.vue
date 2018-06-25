<template>
  <div class="feature-title" :style="{ backgroundColor: `rgba(${layout.init[index].setting[0].rgbaStr})`}">
    <span class="title" :style="{ fontSize: `${layout.init[index].setting[0].fontSize}px` }">{{layout.init[index].setting[0].text}}</span>
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

  name: 'FeatureTitle',

  data () {
    return {

    }
  },
  props: ['parentId', 'index'],
  methods: {
    setting () {
      let value = [{
        name: 'SettingTitle',
        index: this.index
      }]

      this.$store.dispatch('SettingNav', value)
    },
    close () {
      document.getElementById(this.parentId).innerHTML = ''
      // 清空该容器内的功能模块，设置为 default
      this.$store.dispatch('ClearFeature', this.parentId)
    }
  },
  computed: {
    ...mapGetters(['layout']),
    layout () {
      return this.$store.state.app.layout
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