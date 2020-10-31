module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    // 告诉 Jest 处理 `*.vue` 文件
    "vue"
  ],

  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    // 用 `babel-jest` 处理 js
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },

  "collectCoverage": true,
  "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"],
  "coverageReporters": ["html", "text-summary"],
  "snapshotSerializers": ["jest-serializer-vue"]
}