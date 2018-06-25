<template>
  <div id="sidebar" :class="{hideSidebar:!sidebar.opened}">
    <div
      class="sidebar-item"
      v-for="item in sidebar.module"
      :is="item.component"
    >
    </div>
    <div class="close-sidebar" @click="toggleSideBar">
      <font-awesome-icon :icon="['fas','times']"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DragLayout, CustomFeature, GlobalSetting } from './Sidebar/'

export default {
  name: 'Sidebar',

  data () {
    return {

    }
  },

  components: {
    Drag: DragLayout,
    Custom: CustomFeature,
    Global: GlobalSetting
  },
  // 在 DOM 加载后马上执行
  computed: {
    ...mapGetters(['sidebar']),
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  #sidebar {
    position: relative;
    background-color: #ccc;
    transition: width .28s;
  }
  #sidebar.hideSidebar {
    width: 0;
  }
  .close-sidebar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .52083333rem; /* 100px */
    line-height: .52083333rem; /* 100px */
    text-align: center;
    color: #fff;
    font-size: .10416667rem; /* 20px */
    cursor: pointer;
    background-color: tomato;
  }
</style>
