<template>
  <div class="rolling">
    <div v-for="item in rollingList" class="rolling-item">
      <div class="rolling-left">
        <div class="avatar" :style="{ width: `${rolling.avatarSize}px`, height: `${rolling.avatarSize}px`}"><img :src="item.message.user.avatarUrl"></div>
      </div>
      <div class="rolling-right">
        <div class="rolling-right-header">
          <div class="nickName">{{item.message.user.nickName}}</div>
          <div class="time">{{item.message.time}}</div>
        </div>
        <div class="message" :style="{ backgroundColor: `rgba(${rolling.bgColor.rgbaStr})`, fontSize: `${rolling.fontSize}px`, color: `rgba(${rolling.color.rgbaStr})`}">
          <div class="picture" v-if="item.message.type === 'picture'"><img :src="'http://img.migong.org/' + item.message.content"></div>
          <div class="text" v-html="item.message.content" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'Rolling',

  data () {
    return {

    }
  },
  props: {
    rollingList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    rollingList () {
      // 延迟计算更新动画
      setTimeout(() => {
        this.$emit('scrollToTop')
      }, 500);
    }
  },
  computed: {
    ...mapGetters(['rolling']),
    rolling () {
      return this.$store.state.rolling
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.rolling {
  .rolling-item {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    color: #333;
    padding: 10px;
    margin: 10px 0;
  }
  .rolling-left {
    margin-right: 10px;
    .avatar {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid white;
      img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .rolling-right {
    width: 100%;
    text-align: left;
    color: #333;
    font-size: 24px;
    .rolling-right-header {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 50px;
    }
    .nickName {
      width: 50%;
      text-align: left;
    }
    .time {
      width: 50%;
      text-align: right;
    }
    .message {
      box-sizing: border-box;
      padding: 8px 15px;
      width: 100%;
      word-break: break-all;
      background-color: rgba(0, 0, 0, .3);
      border-top-right-radius: 6px;
      border-bottom-left-radius: 6px;
      img {
        vertical-align: middle;
        max-width: 66px;
      }
    }
  }
}
</style>