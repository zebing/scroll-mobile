export const ACTIVATE = 'activate'; // 下拉/上拉
export const DEACTIVATE = 'deactivate'; // 释放
export const RELEASE = 'release'; // 已释放
export const FINISH = 'finish'; // 完成
export const PULLUP = 'pullup'; // 上拉动作
export const DROPDOWN = 'dropdown'; // 下拉动作
export const DAMPINGCOEFFICIENT = 0.5; // 滑动距离有效系数
export const DISTANCETOREFRESH = 80; // 下拉刷新满足的距离
export const DISTANCETOREFLEASE = 50; // 下拉刷新释放之后的距离
export const COMPLETEDTEXT = '全部已加载';

// 刷新指示器文本
export const REFRESHINDICATOR = {
  activate: '下拉刷新',
  deactivate: '释放刷新',
  release: '刷新中...',
  finish: '刷新完成',
}

// 加载指示器文本
export const LOADINDICATOR = {
  activate: '上拉加载更多',
  deactivate: '释放加载',
  release: '加载中...',
  finish: '加载完成',
}