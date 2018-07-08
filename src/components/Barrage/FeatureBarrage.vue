<template>
  <div class="feature-barrage">
    <fs ref="fullscreenBarrage" @change="fullscreenChange" :background="fsbackground" class="full-screen">
      <div class="full-screen-content">
        <barrage
          :isShow="barrageIsShow"
          :barrageList="barrageList"
          :loop="barrage.loop"
        >
        </barrage>
        <feature-setting :parentId="parentId" :settingName="settingName" @toggleFullScreen="toggleFullScreen"></feature-setting>
      </div>
    </fs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Barrage from './Barrage'
import { FeatureSetting } from '@/components/Setting'

export default {

  name: 'FeatureBarrage',

  data () {
    return {
      settingName: 'SettingBarrage',
      fsbackground: '#fff',
      fullscreen: false,
      msg: 'Hello vue-baberrage',
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: false,
      barrageList: [{
        id: 0,
        avatar: "https://cdn.v2ex.com/avatar/678f/d08a/112024_normal.png",
        msg: '发',
        barrageStyle: "normal",
        time: 5,
        type: 0,
        position: 'bottom'
      }]
    }
  },
  components: {
    Barrage,
    FeatureSetting
  },
  props: ['parentId', 'index'],
  computed: {
    ...mapGetters(['barrage']),
    barrage () {
      console.log(this.$store.state.barrage)
      return this.$store.state.barrage
    }
  },
  methods: {
    // 全屏
    toggleFullScreen () {
      this.$refs['fullscreenBarrage'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    // 没有记录时，初始化内容
    initList () {
      this.barrageList.push({
        id: 0,
        avatar: "https://cdn.v2ex.com/avatar/678f/d08a/112024_normal.png",
        msg: '发送一条消息，让我知道你还活着...',
        barrageStyle: "normal",
        time: 5,
        type: 0,
        position: 'bottom'
      });
    },
    // 计算中英文字符长度
    strlen (str) {
      var len = 0
      for (var i in str) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          len += 2
        } else {
          len++
        }
      }
      return len
    },
    // 获得一个区间随机数
    random (min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  },
  // 生命周期函数（在整个实例中只执行一次）
  created () {
    const that = this
    let ref = that.$root.$wilddogRefs.ref
    // 监听初始化数据与新增数据（最新10条数据）
    ref.limitToLast(10).on('child_added', function (snapshot, prKey) {
      let key = snapshot.key()
      let val = snapshot.val()

      let item = {
        barrageStyle: "normal",
        type: 0,
        position: 'bottom'
      }

      let len = that.strlen(val.message)
      let random = that.random(1,9)

      item.id = key
      item.time = len / 2
      item.msg = val.message
      item.avatar = val.user.avatarUrl

      that.barrageList.push(item)
    }, that)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .feature-barrage {

  }
</style>