<template>
  <div class="list">
    <ul>
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <el-tooltip effect="light" placement="left">
          <div slot="content"><a :href="item.url" target="_blink" class="history-url">{{item.url}}</a></div>
          <p @click="handlePreview(index)">{{item.url}}</p>
        </el-tooltip>
        <label @click="handleRemove(index)">
          <i class="el-icon-close"></i>
        </label>
      </li>
    </ul>
  </div>
</template>


<script>
function noop() {}

export default {

  name: 'List',

  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      propsync: true
    },
    onRemove: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function,
      default: noop
    }
  },
  methods: {
    handleRemove (index) {
      this.onRemove(index)
    },
    handlePreview (index) {
      this.onPreview(index)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .list {
    .list-item {
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      &:hover {
        background-color: #f5f7fa;
      }
      p {
        color: #606266;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        transition: color .3s;
        white-space: nowrap;
        text-decoration: none;
        &:hover {
          color: #47DEBA;
          cursor: pointer;
        }
      }
      label {
        position: absolute;
        right: 5px;
        top: 0;
        line-height: inherit;
        &:hover {
          cursor: pointer;
          color: #47DEBA;
        }
      }
    }
  }
  .history-url {
    color: #606266;
    &:hover {
      color: #47DEBA;
    }
  }
</style>