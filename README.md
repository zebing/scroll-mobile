# scroll-mobile
一个移动端页面高性能滑动加载组件

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
| distanceToRefresh | distance to pull to refresh | number | 50  |
| refreshing | Whether the view should be indicating an active refresh | bool | false |
| onRefresh  | Called when the view starts refreshing. | () => void | - |
| indicator  | indicator config | Object | `{ activate: 'release', deactivate: 'pull', release: 'loading', finish: 'finish' }` |
| className | additional css class of root dom node | String | - |
| prefixCls | prefix class | String | 'rmc-pull-to-refresh' |
| damping | pull damping, suggest less than 200 | number | 100 |
| scale | damping scale | number | 0.6 |
