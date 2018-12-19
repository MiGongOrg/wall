<template>
  <div class="timer" :class="isShow ? 'hidden' : timeAnim">
    <svg shape-rendering="geometricPrecision"
      :style="{ width: size + 'px', height: size + 'px'}">
      <g :transform="svgTransform">
        <circle class="background" cx="50%" cy="50%" :r="radius"
          :style="{ strokeWidth: thickness }"></circle>
        <circle class="fill" cx="50%" cy="50%" :r="radius"
          :stroke-dasharray="fillDash" :transform="fillTransform"
          :style="{ strokeWidth: thickness }"></circle>
        <circle class="knob" :cx="knobx + 'px'"
          :cy="knoby + 'px'" :r="knobRadius"></circle>
      </g>
    </svg>
    <div class="time" :class="startTime ? 'pscaleUpCenter' : ''">{{time}}</div>
  </div>
</template>

<script>
export default {

  name: 'Timer',

  data () {
    return {
      permille: 1000,
      radius: 60,
      thickness: 13,
      knobRadius: 13,
      cc: false,
      time: 30,
      startTime: false,
      timeAnim: 'fadeInDown'
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cf () {
      // The circumference of the fill and background circles
      return 2 * Math.PI * this.radius;
    },
    center () {
      // The center of the component
      return this.size / 2;
    },
    fillDash () {
      // This is what controls the length of the stroke on the fill circle
      // See https://developer.mozilla.org/en/docs/Web/SVG/Attribute/stroke-dasharray
      return `${this.value * this.cf}, ${this.cf}`;
    },
    size () {
      // The size of the bounds of the component
      return (this.radius * 2) + Math.max(this.thickness, this.knobRadius * 2);
    },
    svgTransform () {
      // Rotate the SVG by 270 degrees around the center
      // to put the start at the top
      return `rotate(270 ${this.center} ${this.center})`;
    },
    fillTransform () {
      // Flip the fill circle horizontally
      // if the counter-clockwise setting is enabled
      return this.cc ? `scale(1,-1) translate(0,-${this.size})` : '';
    },
    knobAngle () {
      // The angle of the knob in radians
      // The angle is reversed (1 - value)
      // if the counter-clockwise setting is enabled
      return (this.cc ? 1 - this.value : this.value) * 360.0 * (Math.PI / 180);
    },
    knobx () {
      // The x coordinate of the knob circle
      return (this.radius * Math.cos(this.knobAngle)) + this.center;
    },
    knoby () {
      // The y coordinate of the knob circle
      return (this.radius * Math.sin(this.knobAngle)) + this.center;
    },
    percent () {
      return this.permille / 10.0;
    },
    value () {
      return this.permille / 1000.0;
    },
  },
  watch: {
    isShow (newValue) {
      if (!newValue) {
        this.countdown()
      }
    }
  },
  methods: {
    countdown () {
      this.time = 30
      this.timeAnim = 'fadeInDown'
      clearInterval(timer)
      var timer = setInterval(() => {
        this.startTime = true
        this.permille = this.permille - (1000/30)
        --this.time
        if (this.permille <= 0) {
          clearInterval(timer)
          this.permille = 1000
          this.startTime = false
          this.timeAnim = 'fadeOutUp'
          this.$emit('countdownEnd')
        }
      }, 1000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .timer {
    position: relative;
    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: #FC6E6D;
    }
    .background {
      fill: none;
      stroke: #D2D3D7;
    }
    .fill {
      fill: none;
      stroke: #FC6E6D;
    }
    .knob {
      fill: #FC6E6D;
    }
  }
  .hidden {
      opacity: 0;
    }
  .pscaleUpCenter {
    animation: pscaleUpCenter 1000ms infinite both;
  }
  @keyframes pscaleUpCenter {
    from {
      opacity: 0;
      transform: scale(.7);
    }
  }
  .fadeOutUp {
    animation: fadeOutUp 1000ms both;
  }
  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }
  .fadeInDown {
    animation: fadeInDown 1000ms both;
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>