<template>
  <div class="controls-video">
    <h3>控制选项</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>控制面板</span>
            <span class="sub">(是否显示控制面板)</span>
          </p>
          <el-switch v-model="video.controls"></el-switch>
        </div>
        <div class="flex-space-between">
          <p>
            <span>自动播放</span>
            <span class="sub">(自动播放视频)</span>
          </p>
          <el-switch v-model="video.autoplay"></el-switch>
        </div>
        <div class="flex-space-between">
          <p>
            <span>循环播放</span>
            <span class="sub">(循环播放视频)</span>
          </p>
          <el-switch v-model="video.loop"></el-switch>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'ControlsVideo',

  data () {
    return {

    }
  },
  props: {
    video: Object
  },
  created () {

  }
}
</script>

<style lang="css" scoped>
  .controls-video {

  }
</style>