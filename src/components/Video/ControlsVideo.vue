<template>
  <div class="controls-video">
    <h3>{{$t('message.controls')}}</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.controls')}}</span>
            <span class="sub">是否显示控制面板</span>
          </p>
          <el-switch v-model="video.controls"></el-switch>
        </div>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.autoplay')}}</span>
            <span class="sub">自动播放视频</span>
          </p>
          <el-switch v-model="video.autoplay"></el-switch>
        </div>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.loop')}}</span>
            <span class="sub">循环播放视频</span>
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