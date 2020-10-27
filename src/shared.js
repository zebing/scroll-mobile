import { PULLUP, DROPDOWN } from './constants';

// 动作，上拉/下拉
export const getAction = (preClientY, clientY) => {
  return preClientY < clientY ? DROPDOWN : PULLUP;
}

// 是否到达边界，顶部或底部
export const isEdge = (e) => {
  // console.log('isEdge++++', action)
  // // 上拉到底
  // if (action === PULLUP) {
  //   console.log(PULLUP, 123, e.clientHeight + e.scrollTop >= e.scrollHeight);
  //   return e.clientHeight + e.scrollTop >= e.scrollHeight;
  // }

  // // 下拉到顶
  // if (action === DROPDOWN) {
  //   console.log(DROPDOWN, e.scrollTop <= 0);
  //   return e.scrollTop <= 0;
  // }
  return (e.clientHeight + e.scrollTop >= e.scrollHeight) || (e.scrollTop <= 0) ? true : false;
}

// 设置style
export const setHeight = (e, value) => {
  e.style.height = `${value}px`;
}