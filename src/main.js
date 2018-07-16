import Vue from 'vue'
import Wilddog from 'wilddog'
import WildVue from 'wildvue'

import fullscreen from 'vue-fullscreen'

import App from './App'
import router from './router'
import store from './store'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

import 'normalize.css/normalize.css'

// 按需引入 Element UI 组件
import { Slider, Input, Switch, Upload, Button, Tabs, TabPane, Radio, RadioGroup, ButtonGroup, Select, Option, Notification } from 'element-ui'
import './styles/element-variables.scss'
// 初始化 Size
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.prototype.$notify = Notification

Vue.use(Slider)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(ButtonGroup)

/* color 选择器 */
import { chrome } from 'vue-color'

/* 阿里 Rem 适配解决方案 */
import 'amfe-flexible'

/* font-awesome */
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(fullscreen, {name: 'fs'})

/* 野狗云 */

Vue.use(Wilddog)
Vue.use(WildVue)

Vue.config.productionTip = false

// 初始化野狗云
var wilddog = Wilddog.initializeApp({
  syncURL: 'https://wd5619279824ctzdha.wilddogio.com'
})

let ref = wilddog.sync().ref('chats')

// 生产环境关闭调试信息
const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  wilddog: {
    ref: ref
  }
})
