<template>
  <div class="interactive">
    <confetti :isConfettiShow="isConfettiShow" @handleClose="handleClose"></confetti>
    <div class="timer-box">
      <timer :isShow="isShow" @countdownEnd="countdownEnd"></timer>
    </div>
    <countdown :isShow.sync="isShow"></countdown>
    <div class="shakes" v-if="!isShow">
      <div v-for="item in shakes.slice(0, 5)" class="stick" :class="item.color" :style="{transform: `translate3d(0, -${(item.count / (shakes[0].count * 1.3)) * 100}%, 0)`}">
        <div class="header">
          <img class="avatar" :src="item.avatarUrl">
          <div class="count">{{item.count}}</div>
        </div>
        <ul>
          <li v-for="i in 10"></li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="提示"
      :append-to-body="appendToBody"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>本次互动无人参与</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">重新开始</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Countdown from './Animation/Countdown'
import Timer from './Animation/Timer'
import Confetti from './Animation/Confetti'

export default {

  name: 'Interactive',

  data () {
    return {
      number: 120,
      isShow: true,
      isConfettiShow: false,
      appendToBody: true,
      dialogVisible: false
    }
  },
  components: {
    Countdown,
    Timer,
    Confetti
  },
  computed: {
    ...mapGetters(['socket']),
    shakes () {
      return this.$store.state.socket.shakes
    },
    newUser () {
      return this.$store.state.socket.newUser
    }
  },
  watch: {
    newUser (newData) {
      console.log('监听新用户数据：', newData)
      this.$notify({
        dangerouslyUseHTMLString: true,
        message: `<div class="notify-content"><img src="${newData.avatarUrl}"><p>欢迎 ${newData.nickName}</p></div>`,
        position: 'top-left',
        customClass: 'join-notify'
      })
    }
  },
  methods: {
    countdownEnd () {
      if (this.shakes.length) {
        this.isConfettiShow = true
      } else {
        // 本次互动无人参与，弹出提示
        this.dialogVisible = true
      }
    },
    handleClose () {
      // 关闭 dialog
      this.dialogVisible = false
      // 显示开始按钮
      this.isShow = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .join-notify {
    .el-notification__content {
      margin: 0;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .notify-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      font-size: 20px;
      color: #444;
    }
  }
  .interactive {
    height: 100%;
    width: 100%;
    .timer-box {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .shakes {
      position: absolute;
      left: 0;
      bottom: -100%;
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      height: 100%;
      width: 100%;
    }
    .header {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      flex-wrap: wrap;
      position: absolute;
      top: -150px;
      left: 50%;
      width: 120px;
      margin-left: -60px;
    }
    .stick {
      position: relative;
      height: 100%;
      width: 90px;
      background-image: url("./images/noise.png");
      transition: transform 500ms;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      &:nth-child(1) {
        order: 3;
      }
      &:nth-child(2) {
        order: 4;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 5;
      }
      &:nth-child(5) {
        order: 1;
      }
      img.avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid white;
      }
      .count {
        font-size: 30px;
        color: #333;
        margin-top: 5px;
        font-weight: bold;
        width: 100%;
      }
      ul {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: animate 25s linear infinite;
        bottom: -150px;
        &:nth-child(1) {
          left: 25%;
          width: 50px;
          height: 50px;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          left: 10%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }

        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }

        &:nth-child(4) {
          left: 40%;
          width: 40px;
          height: 40px;
          animation-delay: 0s;
          animation-duration: 18s;
        }

        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }

        &:nth-child(6) {
          left: 75%;
          width: 50px;
          height: 50px;
          animation-delay: 3s;
        }

        &:nth-child(7) {
          left: 35%;
          width: 40px;
          height: 40px;
          animation-delay: 7s;
        }

        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }

        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }

        &:nth-child(10) {
          left: 85%;
          width: 30px;
          height: 30px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
    @keyframes animate {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }
    }
    .stick.red {
      background-color: #FF4571;
      transform: translate3d(0, 100px, 0);
    }
    .stick.yellow {
      background-color: #FFD145;
      transform: translate3d(0, 200px, 0);
    }
    .stick.green {
      background-color: #28DAD4;
      transform: translate3d(0, 300px, 0);
    }
    .stick.purple {
      background-color: #8260F6;
      transform: translate3d(0, 400px, 0);
    }
    .stick.inactive {
      background-color: #4C4660;
      transform: translate3d(0, 500px, 0);
    }
  }
</style>