const getters = {
  sidebar: state => state.app.sidebar,
  setting: state => state.app.setting,
  layout: state => state.app.layout,
  occupied: state => state.app.occupied,
  settingNav: state => state.app.setting.nav,
  margin: state => state.app.setting.global.margin,

  qrcode: state => state.qrcode,
  barrage: state => state.loop
}

export default getters