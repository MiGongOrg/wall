<template>
  <div class="list">
    <div class="list-dropdown">
      <div class="list-button" :class="open ? 'open' : ''">
        <div class="left-border" :class="open ? '' : 'left-border-animation'"></div>
        共有 {{shakes.length}} 人参与
        <div class="list-burger" @click="toggle">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="right-border" :class="open ? '' : 'right-border-animation'"></div>
      </div>
      <div class="list-box">
        <ul class="list-li" :style="{transform: `translate3d(0,${open ? '0' : '-100%'}, 0)`}" >
          <li v-for="item in shakes"><a href="#">{{item.nickName}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'List',

  data () {
    return {
      open: true
    }
  },
  props: {
    shakes: {
      type: Array
    }
  },
  methods: {
    toggle () {
      this.open ? this.open = false : this.open = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .list {
    $f-body:'Open Sans', sans-serif;

    @mixin centre($axis: "both") {
      position: absolute;
      @if $axis == "y" {
        top: 50%;
        transform: translateY(-50%);
      }
      @if $axis == "x" {
        left: 50%;
        transform: translateX(-50%);
      }
      @if $axis == "both" {
        top: 50%;
        left: 50%;
        transform: translate(-51%, -50%);
      }
    }
    @mixin font-size($sizeValue: 1.6, $lineHeight: 2.4) {
      font-size: ($sizeValue * 10) + px;
      line-height: ($lineHeight * 10) + px;
    }
    @mixin transition($property) {
      transition: $property;
    }
    @mixin border-radius($radius) {
      border-radius: $radius;
    }

    &-dropdown {
      box-sizing: unset;
      margin: 0 auto;
      width: 300px;
      display: block;
      
      .list-button {
        box-sizing: unset;
        @include transition(all .3s ease-in-out);
        @include border-radius(20px);
        @include font-size(1.4, 2);
        padding: 8px 40px 8px 15px;
        z-index: 900;
        color: white;
        font-weight: 900;
        position: relative;
        border: 2px solid transparent;
        margin-top: 2px;
        font-family: $f-body;
        z-index: 5;
        display: block;
        width: 100px;
        margin: 0 auto;
        background: #30386B;
        
        &:hover{
          cursor: pointer;
          box-shadow: 0 3px 6px rgba(0,0,0,0.2);
          color: #669999;
          
          .list-burger{
            span{
              background: #669999;
            }
          }
        }

        .list-burger {
          @include transition(all .3s ease-in-out);
          @include centre(y);
          right: 15px;
          width: 15px;
          height: 14px;
          transform-origin: center;
          z-index: -1;
          span {
            @include transition(all .2s ease-in-out);
            @include centre(y);
            @include border-radius(2px);
            width: 100%;
            height: 2px;
            background: white;
            display: block;
            left: 0;
            transform-origin: center;
            &:first-child {
              top: 0;
              transform: none;
            }

            &:last-child {
              top: auto;
              bottom: 0;
              transform: none;
            }
          }
        }
        .left-border, .right-border {
          position: absolute;
          top: 0;
          width: 40px;
          height: 40px;
          overflow: hidden;
          z-index: -2;
          opacity: 1;
          transform: translate3d(0, 0, 0);
          @include transition(all .3s ease-in-out);
          &:after {
            position: absolute;
            display: block;
            content: '';
            width: 80px;
            height: 80px;
            border: 22px solid #30386B;
            border-radius: 50%;
          }
        }
        .left-border {
          left: -20px;
          top: 20px;
          &:after {
            right: 0;
            bottom: 0;
          }
        }
        .right-border {
          right: -20px;
          top: 20px;
          &:after {
            left: 0;
            bottom: 0;
          }
        }
        .left-border-animation {
          transform: translate3d(20px, 0, 0);
          opacity: 0;
        }
        .right-border-animation {
          transform: translate3d(-20px, 0, 0);
          opacity: 0;
        }
        &.open {
          box-sizing: unset;
          border-color: transparent;
          background: #30386B;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          color: white;
          .list-burger {
            span {
              background: white;
              &:first-child {
                opacity: 0;
              }
              &:nth-child(2) {
                transform: translateY(-50%) rotate(-45deg);
              }
              &:nth-child(3) {
                transform: translateY(-50%) rotate(45deg);
              }

              &:last-child {
                opacity: 0;
              }
            }

            &:after {
              height: 15px;
              opacity: 1;       
            }
          }
        }
      }
      .list-box {
        overflow: hidden;
      }
      .list-li {
        @include border-radius(5px);
        position: relative;
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        background: #30386B;
        float: left;
        overflow: hidden;
        z-index: 999;
        @include transition(all .3s ease-in-out);
        li {
          display: block;
          width: 100%;
          float: left;
          border-bottom: 1px solid rgba(255,255,255,0.01);
          box-sizing: border-box;
          &:last-child{
            border: none;
          }
          a {
            @include transition(all .3s ease-in-out);
            padding: 15px;
            float: left;
            width: 100%;
            text-decoration: none;
            color: #fff;
            font-weight: 600;
            box-sizing: border-box;
            &:hover{
              background: #fff;
              color: #111;
            }
          }
        }
      }
    }
  }
</style>