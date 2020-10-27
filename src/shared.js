import { PULLUP, DROPDOWN } from './constants';

export const getAction = (preClientY, clientY) => {
  return preClientY < clientY ? DROPDOWN : PULLUP;
}

export const isEdge = (e, action) => {
  console.log('isEdge++++', action)
  // 上拉到底
  if (action === PULLUP) {
    console.log(PULLUP, 123, e.clientHeight + e.scrollTop >= e.scrollHeight);
    return e.clientHeight + e.scrollTop >= e.scrollHeight;
  }

  // 下拉到顶
  if (action === DROPDOWN) {
    console.log(DROPDOWN, e.scrollTop <= 0);
    return e.scrollTop <= 0;
  }

  return false;
}