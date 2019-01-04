<template>
  <div class="countdown" v-if="isShow">
    <div class="ribbon-box" :style="{width: `${bannerSize}%`}">
      <h1 class=ribbon>
        <i><u>共有 {{shakes.length}} 人参与</u></i>
      </h1>
      <ul>
        <li v-for="item in shakes"><img :src="item.avatarUrl"></li>
      </ul>
    </div>
    <div class="countdown-box">
      <div class="countdown-colored-blocks" :class="start ? 'start-anim' : ''">
        <div class="countdown-colored-blocks-rotater">
          <div class="countdown-colored-block"></div>
          <div class="countdown-colored-block"></div>
          <div class="countdown-colored-block"></div>
        </div>
        <div class="countdown-colored-blocks-inner"></div>
        <div class="countdown-text" :class="start ? 'hide-text' : ''" @click="startGame">{{text}}</div>
      </div>

      <div class="countdown-inner" v-if="start">
        <svg class="countdown-numbers" viewBox="0 0 100 100">
          <defs>
            <path class="countdown-num-path-1" d="M40,28 55,22 55,78"/>
            <path class="countdown-num-join-1-2" d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"/>
            <path class="countdown-num-path-2" d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"/>
            <path class="countdown-num-join-2-3" d="M28,69 Q25,44 34.4,27.4"/>
            <path class="countdown-num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"/>
          </defs>
          <path class="countdown-numbers-path" d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 Q25,44 34.4,27.4 l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 l0,-61 L40,28" />
        </svg>
      </div>
    </div>
    <el-dialog
      title="提示"
      :append-to-body="appendToBody"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>当前参与人数少于3人，无法开始</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'Countdown',

  data () {
    return {
      text: 'Start',
      start: false,
      appendToBody: true,
      dialogVisible: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['socket', 'interactive']),
    shakes () {
      return this.$store.state.socket.shakes
    },
    bannerSize () {
      return this.$store.state.interactive.bannerSize
    }
  },
  methods: {
    startGame () {
      // if (this.shakes.length < 1) {
      //   this.dialogVisible = true
      //   return false
      // }
      this.$socket.emit('new countdown', {})
      this.start = true
      let timer = setTimeout(() => {
        this.start = false
        this.$emit('update:isShow', this.start)
        clearTimeout(timer);
      }, 3500);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  $bgColor: #32386D;

  $numOfColBlocks: 3; // 必须大于 2
  $deg: 360deg / $numOfColBlocks;

  $red: #FD3359;
  $yellow: #F4D302;
  $blue: #21BDFF;

  $blocksColors: (
    1: $red,
    2: $yellow,
    3: $blue
  );


  $size: 140px;
  $sizeBig: 500px;
  $pad: 10px;
  $numSize: 100px;
  $totalAT: 4s;
  $contBr: 20px;

  $num1Len: 72.1554946899414;
  $num2Len: 136.02162170410156;
  $num3Len: 144.4256591796875;
  $numJoin1-2: 82.63925170898438;
  $numJoin2-3: 42.81303787231445;
  $numJoin3-0: 40;

  $totalLen: $num1Len + $num2Len + $num3Len + $numJoin1-2 + $numJoin2-3 + $numJoin3-0;

  .countdown {
    height: 100%;
    width: 100%;
    .countdown-box {
      position: absolute;
      left: 50%;
      bottom: 5%;
      width: $sizeBig;
      height: $size;
      padding: $pad;
      border-radius: 20px;
      transform: translateX(-50%);
      cursor: pointer;
    }
    &-colored-blocks {
      overflow: hidden;
      position: absolute;
      left: 50%;
      top: 0;
      width: $sizeBig;
      height: 100%;
      margin-left: $sizeBig/-2;
      padding: $pad;
      border-radius: $contBr;
      perspective: 1000px;
    
      &-rotater {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        animation: rotation 1.3s linear infinite;
      }

      &-inner {
        overflow: hidden;
        position: relative;
        height: 100%;
        background: $bgColor;
        border-radius: inherit;
      }
    }
    .start-anim {
      animation: startAnim $totalAT ease-in-out infinite, contAnim $totalAT infinite;
    }

    &-colored-block {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 300%;
      height: 300%;
      transform-origin: 0 0;

      @for $i from 1 through $numOfColBlocks {
        &:nth-child(#{$i}) {
          $rt: $deg * ($i - 1);
          $skew: 90deg - $deg;
          transform: rotate($rt) skewX($skew);
          background-color: map-get($blocksColors, $i);
        }
      }
    }

    &-inner {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 100%;
    }

    &-numbers {
      overflow: visible;
      position: absolute;
      left: 50%;
      top: 50%;
      width: $numSize;
      height: $numSize;
      margin-left: $numSize/-2;
      margin-top: $numSize/-2;

      &-path {
        fill: none;
        stroke-width: 10px;
        stroke: white;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 0, $totalLen;
        stroke-dashoffset: 0;
        animation: numAnim $totalAT ease-in-out infinite;
        opacity: 0;
      }
    }

    &-text {
      position: absolute;
      left: 50%;
      top: 0;
      width: $sizeBig;
      height: 100%;
      margin-left: $sizeBig/-2;
      text-align: center;
      line-height: $size;
      font-size: 100px;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 15px;
      transform: translateX(10px);
    }
    .hide-text {
      animation: hideText $totalAT infinite;
    }
  }

  @keyframes contAnim {
    15%, 100% {
      margin-left: $sizeBig/-2;
      width: $sizeBig;
    }
    25%, 90% {
      margin-left: $size/-2;
      width: $size;
    }
  }

  @keyframes numAnim {
    15% {
      stroke-dasharray: 0, $totalLen;
      stroke-dashoffset: 0;
      opacity: 0;
    }
    25%, 41% {
      opacity: 1;
      stroke-dasharray: $num3Len, $totalLen;
      stroke-dashoffset: -$numJoin3-0;
    }
    53%, 66% {
      stroke-dasharray: $num2Len, $totalLen;
      stroke-dashoffset: -$num3Len - $numJoin2-3 -$numJoin3-0;
    }
    76% {
      stroke-dasharray: $num1Len + $numJoin1-2/2, $totalLen;
      stroke-dashoffset: -$num3Len - $numJoin2-3 - $num2Len - $numJoin1-2 -$numJoin3-0;
    }
    88%, 100% {
      stroke-dasharray: $num1Len, $totalLen;
      stroke-dashoffset: -$num3Len - $numJoin2-3 - $num2Len - $numJoin1-2 -$numJoin3-0;
    }
    92% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .ribbon-box {
    margin: 0 auto;
    border-top-left-radius: 50% 16px;
    border-top-right-radius: 50% 16px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    transition: .2s;
    background-color: #FFFFEA;
    background-image: url("../images/ribbon.png");
    ul {
      display: flex;
      justify-content: center;
      width: 100%;
      box-sizing: border-box;
      flex-wrap: wrap;
      padding: 10px 10px 30px 10px;
    }
    li {
      img {
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 8px;
      }
    }
  }
  /* Ribbon */
  .ribbon {
    position: relative;
    width: 100%;
    margin: 0;
  }

  .ribbon:before,
  .ribbon i:before {
      content: '';
      position: absolute;
      bottom: -23px;
      border: 24px solid #c45045;
  }

  .ribbon:before {
    left: -54px;
    border-left-color: transparent;
    transform: rotate(-16deg);
  }
  .oldie .ribbon:before {
      left: -48px;
  }

  .ribbon i:before {
    right: -54px;
    border-right-color: transparent;
    transform: rotate(16deg);
    z-index: -1;
  }
  .oldie .ribbon i:before {
    right: -48px;
  }

  .ribbon i:after,
  .ribbon u:after {
    content: '';
    position: absolute;
    border-style: solid;
    bottom: -16px;
    z-index: 0;
  }

  .ribbon i:after {
    right: -16px;
    border-color: transparent transparent transparent #a33d33;
    border-width: 0 0 16px 16px;
  }

  .ribbon u:after {
    left: 0;
    border-color: transparent #a33d33 transparent transparent;
    border-width: 0 16px 16px 0;
  }

  .ribbon u {
    display: block;
    position: relative;
    width: 100%;
    left: -16px;
    padding: 0 16px 16px;
    background: #d0726a;
    background-image: linear-gradient(#d0726a, #c7574d);
    border-top-left-radius: 50% 16px;
    border-top-right-radius: 50% 16px;
    text-align: center;
    font: 28px/48px Museo, cursive;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;
    text-shadow: 0 1px 1px rgba(163, 61, 51, .8), 0 2px 1px rgba(163, 61, 51, .6);
  }
  .oldie .ribbon u {
    padding: 0 16px;
    *left: 0px;
    *padding: 0;
  }

  .ribbon u {
    left: 0;
    margin: 0 -16px;
    width: auto;
  }

  .ribbon u::selection { background-color: #a33d33; }
  .ribbon u::-moz-selection { background-color: #a33d33; }

  .ribbon u:before,
  .ribbon:after {
    content: '';
    position: absolute;
    height: 16px;
    left: 0;
    bottom: 0;
    border-top-left-radius: 50% 16px;
    border-top-right-radius: 50% 16px;
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, .3);
  }
  .oldie .ribbon u:before,
  .oldie .ribbon:after {
    content: none;
  }

  .ribbon u:before {
    width: 100%;
    background: #a33d33;
  }

  .ribbon:after {
    width: 100%;
    background: #FFFFEA;
    z-index: 1;
  }

  @keyframes rotation {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes startAnim {
    15% {
      border-radius: $contBr;
      transform: rotate(0);
    }
    30%, 43% {
      border-radius: 50%;
      transform: rotate(360deg);
    }

    52%, 65% {
      border-radius: 0;
      transform: rotate(720deg);
    }

    78%, 90% {
      border-radius: 50%;
      transform: rotate(1080deg);
    }
    
    100% {
      border-radius: $contBr;
      transform: rotate(1440deg);
    }
  }

  @keyframes hideText {
    15%, 100% {
      opacity: 1;
    }
    20%, 96% {
      opacity: 0;
    }
  }
</style>