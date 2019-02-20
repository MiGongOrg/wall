<template>
  <div class="setting-rolling">
    <h2>{{$t('message.rolling')}} {{$t('message.setting')}}</h2>
    <h3>{{$t('message.color')}}</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.background')}} {{$t('message.color')}}</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="bgColor"></picker>
        </div>
      </li>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.text')}} {{$t('message.color')}}</span>
            <span class="sub">点击右侧色块修改</span>
          </p>
          <picker :color="color"></picker>
        </div>
      </li>
    </ul>
    <h3>{{$t('message.font')}} {{$t('message.size')}}</h3>
    <ul>
      <li>
        <el-slider v-model="fontSize" :min="24" :max="60"></el-slider>
      </li>
    </ul>
    <h3>{{$t('message.avatar')}} {{$t('message.size')}}</h3>
    <ul>
      <li>
        <el-slider v-model="avatarSize" :min="60" :max="120"></el-slider>
      </li>
    </ul>
    <h3>{{$t('message.other')}}</h3>
    <ul>
      <li>
        <div class="flex-space-between">
          <p>
            <span>{{$t('message.remove')}}</span>
            <span class="sub">清除全部消息</span>
          </p>
          <el-button @click="clearAllMsg" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Picker from '../Picker'

export default {

  name: 'SettingRolling',

  data () {
    return {

    }
  },
  components: {
    Picker: Picker
  },
  computed: {
    ...mapGetters(['rolling']),
    fontSize: {
      get () {
        return this.$store.state.rolling.fontSize
      },
      set (value) {
        this.$store.dispatch('SettingTextFontSize', value)
      }
    },
    avatarSize: {
      get () {
        return this.$store.state.rolling.avatarSize
      },
      set (value) {
        this.$store.dispatch('SettingAvatarSize', value)
      }
    },
    color () {
      return this.$store.state.rolling.color
    },
    bgColor () {
      return this.$store.state.rolling.bgColor
    }
  },
  watch: {
    'color': {
      handler: function (value) {
        this.$store.dispatch('SettingTextColor', value)
      },
      deep: true
    },
    'bgColor': {
      handler: function (value) {
        this.$store.dispatch('SettingTextBgColor', value)
      },
      deep: true
    }
  },
  methods: {
    clearAllMsg () {

      this.$confirm(`${this.$i18n.t('message.remove')} ${this.$i18n.t('message.all')}`, `${this.$i18n.t('message.prompt')}`, {
        type: 'warning'
      }).then(() => {
        // 清空全部消息
        this.$store.dispatch('SettingMsgData')
        this.$message({
          type: 'success',
          message: `${this.$i18n.t('message.success')}`
        })
      }).catch(() => {
        console.log('取消')
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting-rolling {
    
  }
</style>