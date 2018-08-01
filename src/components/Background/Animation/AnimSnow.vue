<template>
  <div class="anim-snow" ref="snow"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as THREE from 'three'
import snow from './../images/snow.png'

export default {

  name: 'AnimSnow',

  data () {
    return {
      req      : null,
      camera   : null,
      scene    : null,
      renderer : null,
      particles: [],
      halfX    : null,
      halfY    : null,
      mouseX   : 0,
      mouseY   : 0,
      fallSpeen: 2,
      amount   : 200
    }
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.z = 100
      
      this.scene = new THREE.Scene()

      let textureLoader = new THREE.TextureLoader()
      console.log(snow)
      let map  = textureLoader.load(snow)
      let material = new THREE.SpriteMaterial({map: map})

      for (var i = 0; i < this.amount; i++) {
        let particle = new THREE.Sprite(material)
        let randomScale = this.randomRange(10,20)
        
        particle.position.x = this.randomRange(-1000, 1000)
        particle.position.y = this.randomRange(-1000, 1000)
        particle.position.z = this.randomRange(-1000, 1000)
        particle.scale.x = particle.scale.y = particle.scale.z = randomScale
        particle.v = new THREE.Vector3(0, - this.fallSpeen, 0)
        particle.v.z = (1 * this.randomRange(-1, 1))
        particle.v.x = (1 * this.randomRange(-1, 1))
        
        
        this.particles.push(particle)
        this.scene.add(particle)
      }

      this.renderer = new THREE.WebGLRenderer({ alpha: true })
      this.renderer.setPixelRatio( window.devicePixelRatio )
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.$refs.snow.appendChild(this.renderer.domElement)

      this.render()

    },
    render () {
      for (var i = 0; i < this.particles.length; i++) {
        let particle = this.particles[i]
        let pp = particle.position
        pp.add(particle.v)
        
        if (pp.y < -1000) {
          pp.y = 1000
        }
        
        if (pp.x > 1000) {
          pp.x = -1000
        } else if (pp.x < -1000) {
          pp.x = 1000
        }

        if (pp.z > 1000) {
          pp.z = -1000
        } else if (pp.z < -1000) {
          pp.z = 1000
        }
      }

      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.0005
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.0005
      this.camera.lookAt(this.scene.position)
      
      this.renderer.render(this.scene, this.camera)

      this.req = requestAnimationFrame(this.render)

    },
    // 随机范围，返回 min 与 max 之间的随机数
    randomRange (min, max) {
      return ((Math.random() * (max - min)) + min)
    }
  },
  mounted () {
    this.halfX = window.innerWidth / 2
    this.halfY = window.innerHeight / 2
    this.init()
  },
  // 组件销毁前执行
  beforeDestroy () {
    cancelAnimationFrame(this.req)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .anim-snow {
    z-index: 4;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>