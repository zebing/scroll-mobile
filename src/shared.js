import { PULLUP, DROPDOWN, RELEASE } from './constants';

// 获取临界动作
export const getAction = (indicator, status, startY, currentY) => {
  const action = isDropDown(indicator, status, startY, currentY);
  return action === DROPDOWN ? DROPDOWN : PULLUP;
}

export const isDropDown = (indicator, status, startY, currentY) => {
  // 加载状态，判断status
  if (RELEASE === indicator) {
    return status === DROPDOWN;
  }
  
  // 滑动状态，判断滑动位置
  return startY <= currentY;
}

// 是否到达边界，顶部或底部
export const isEdge = (e, startY, currentY) => {
  return (Math.round(e.clientHeight + e.scrollTop) >= e.scrollHeight && startY >= currentY) || (e.scrollTop <= 0 && startY <= currentY) ? true : false;
}

// 刷新/加载默认回调
export const callback = () => new Promise((resolve) => {
  setTimeout(resolve, 300);
})
