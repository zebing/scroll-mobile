# scroll-mobile
一个移动端页面高性能滑动加载组件, 原生一般的加载体验。

### 如何使用
```
// 安装
npm install scroll-mobile

// 使用
import 'scroll-mobile/dist/scroll-mobile.css';
import ScrollMobile from 'scroll-mobile';
```

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
| loadIndicator | 加载指示器内容 | Object | `{ activate: '下拉刷新', deactivate: '释放刷新', release: '刷新中...',  finish: '刷新完成' }`  |
| refreshIndicator | 刷新指示器内容 | Object | `{ activate: '上拉加载更多', deactivate: '释放加载', release: '加载中...', finish: '加载完成' }` |
| distanceToRefresh  | 下拉刷新距离 | Number | 80 |
| dampingCoefficient  | 滑动阻尼系数 | Number | 0.5 |
| refresh | 刷新回调, 函数返回值为promise时，指示器刷新状态将交由primise管理，否则加载状态300毫秒将自动关闭 | Function | - |
| load | 加载回调, 函数返回值为promise时，指示器刷新状态将交由primise管理，否则加载状态300毫秒将自动关闭 | Function | - |
| repeat | 请求动作重复，比如加载未完成继续下拉或向上滑动加载 | Function | - |
| completed | 是否加载完成 | Boolean | false |
| completeText | 全部已加载提示文本 | String | 全部已加载 |

## 例子

线上链接：[https://0pbs5.csb.app/](https://0pbs5.csb.app/)

本地查看：
```
npm i
npm run build

cd examples/base
npm i
npm run start
```

打开链接 ```http://localhost:8000```

