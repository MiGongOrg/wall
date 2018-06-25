<template>
  <div class="feature-barrage">
    <barrage
      :isShow="barrageIsShow"
      :barrageList="barrageList"
      :loop="barrage.loop"
    >
    </barrage>
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
import Barrage from './Barrage'

export default {

  name: 'FeatureBarrage',

  data () {
    return {
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
    Barrage
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
    setting () {
      let value = [{
        name: 'SettingBarrage'
      }]
      this.$store.dispatch('SettingNav', value)
    },
    close () {
      document.getElementById(this.parentId).innerHTML = ''
      // 清空该容器内的功能模块，设置为 default
      this.$store.dispatch('ClearFeature', this.parentId)
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