module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
  },
  pwa: {
    manifestOptions: {
      short_name: "tianqin",
      theme_color: '#3f9cda',
      msTileColor: '#000000',
      iconPaths: {
        favicon32: 'img/icons/favicon-32x32.png',
        favicon16: 'img/icons/favicon-16x16.png',
        appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
        maskIcon: 'img/icons/favicon-96x96.png',
        msTileImage: 'img/icons/ms-icon-144x144.png'
      }
    }
  }
}
