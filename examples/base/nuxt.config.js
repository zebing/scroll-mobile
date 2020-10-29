module.exports = {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  css: [
    // 项目里要用的 CSS 文件
    '../../dist/scroll-mobile.css',
  ],

  plugins: [
    { src: '~/plugins/responsive.js', ssr: false },
    { src: '~/plugins/eruda.js', ssr: false },
  ],
}