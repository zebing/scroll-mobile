<template>
  <div 
    ref="scroll"
    class="scroll-mobile"
    @touchstart="touchstart"
    @touchmove="touchmoveThrottle"
    @touchend="touchend"
    @touchcancel="touchend"
  >
    <div class="scroll-mobile-refresh" ref="refresh" :class="{'scroll-mobile-transition': !onTouch}">
      <div class="scroll-mobile-refresh-content scroll-mobile-indicator-content">{{refreshIndicatorText}}</div>
    </div>
    <slot></slot>
    <div class="scroll-mobile-load scroll-mobile-indicator-content">
      {{loadIndicatorText}}
    </div>
  </div>
</template>
<script>
import { isEdge, isDropDown, callback } from './shared';
import {
  ACTIVATE, 
  DEACTIVATE, 
  RELEASE, 
  DAMPINGCOEFFICIENT, 
  DISTANCETOREFRESH, 
  DISTANCETOREFLEASE, 
  DROPDOWN, 
  PULLUP, 
  FINISH,
  REFRESHINDICATOR,
  LOADINDICATOR
} from './constants';

export default {
    name: 'scroll-mobile',

    props: {
      // 加载指示器文本
      loadIndicator: {
        type: Object,
        default: () => {},
      },

      // 刷新指示器文本
      refreshIndicator: {
        type: Object,
        default: () => {},
      },

      // 下拉刷新距离
      distanceToRefresh: {
        type: Number,
        default: DISTANCETOREFRESH
      },

      dampingCoefficient: {
        type: Number,
        default: DAMPINGCOEFFICIENT
      },

      // 刷新回调
      refresh: {
        type: Function,
        default: callback,
      },

      // 加载回调
      load: {
        type: Function,
        default: callback,
      },

      // 重复请求提示回调
      repeat: {
        type: Function,
        default: () => {}
      }
    },

    data () {
      return {
        isRequestAnimationFrame: true,
        refreshHeight: 0, // 刷新指示内容高度
        startY: 0, // touch start 位置
        satrtX: 0, // touch start 位置
        currentY: 0, // touch move 位置
        onTouch: false, // touch 状态
        indicator: ACTIVATE, // 刷新/加载指示器
        status: null, // 刷新/加载
        edge: false, // 滑动到达边界
      }
    },

    computed: {
      refreshIndicatorText () {
        if (this.status === DROPDOWN) {
          return this.refreshIndicator[this.indicator] || REFRESHINDICATOR[this.indicator];
        }

        return this.refreshIndicator[ACTIVATE] || REFRESHINDICATOR[ACTIVATE];
      },

      loadIndicatorText () {
        if (this.status === PULLUP) {
          return this.loadIndicator[this.indicator] || LOADINDICATOR[this.indicator];
        }

        return this.loadIndicator[ACTIVATE] || LOADINDICATOR[ACTIVATE];
      }
    },

    methods: {
      touchstart (e) {
        const touch = e.touches[0];
        this.startY = this.currentY = touch.screenY;
        this.startX = touch.screenX;
        this.onTouch = true;
      },

      touchmove (e) {
        const touch = e.touches[0];
        const _screenY = this.currentY = touch.screenY;
        const _screenX = touch.screenX;

        if (!this.onTouch) {
          return;
        }

        // 角度大于45度，视为横滑
        if (Math.abs(_screenX - this.startX) > Math.abs(_screenY - this.startY)) {
          this.touchstart(e);
          return;
        }

        this.edge = isEdge(this.$refs['scroll']);
        // 到达边界
        if (this.edge) {
          this.doEdge();
        }
      },

      touchend () {
        this.onTouch = false;
        this.doCallback();

        if (this.indicator === DEACTIVATE) {
          this.indicator = RELEASE;
        }

        // 下拉刷新，处理下拉提示内容高度
        if (isDropDown(this.indicator, this.status, this.startY, this.currentY)) {
          this.$nextTick(() => {
            const height = this.indicator === RELEASE ? DISTANCETOREFLEASE : 0;
            this.setHeight(height);
          })
        }
      },

      doCallback () {
        // 当前已有回调状态未完成
        if (this.indicator === RELEASE) {
          const dropdown = this.startY <= this.currentY;
          this.edge && this.repeat({
            action: this.status,
            same: dropdown 
              ? (this.status === DROPDOWN) 
              : (this.status === PULLUP),
          });
          return;
        }

        // 刷新回调
        if (isDropDown(this.indicator, this.status, this.startY, this.currentY)) {
          const result = this.refresh();
          const fn = () => {
            this.indicator = FINISH;
            setTimeout(() => {
              this.status = null;
              this.setHeight(0);
            }, 300);
          }

          if (result instanceof Promise) {
            result.finally(() => setTimeout(fn, 300));
          } else {
            setTimeout(fn, 300);
          }
          
          // 加载回调
        } else {
          const result = this.load();
          const fn = () => {
            this.indicator = ACTIVATE;
            this.status = null;
          };

          if (result instanceof Promise) {
            result.finally(() => setTimeout(fn, 300))
          } else {
            setTimeout(fn, 300);
          }
        }
      },

      touchmoveThrottle (e) {
        if (this.isRequestAnimationFrame) {
          this.isRequestAnimationFrame = false;
          const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
          requestAnimationFrame(() => {
            this.isRequestAnimationFrame = true;
            this.touchmove(e);
          });
        }
      },

      // 设置高度
      setHeight (value) {
        this.refreshHeight = value;
        this.$refs['refresh'].style.height = `${this.refreshHeight}px`;
      },

      // 处理边界情况
      doEdge () {
        // 下拉
        if (isDropDown(this.indicator, this.status, this.startY, this.currentY)) {
          this.dropdown();

          // 上拉
        } else {
          this.pullup();
        }
      },

      // 下拉
      dropdown () {
        let indicator = this.distanceToRefresh <= this.refreshHeight ? DEACTIVATE : ACTIVATE;
        let height = (this.currentY - this.startY) * this.dampingCoefficient;

        if (this.indicator === RELEASE) {
          height = Math.max(height + DISTANCETOREFLEASE, DISTANCETOREFLEASE);
          indicator = RELEASE;
        }

        this.status = indicator === ACTIVATE ? null : DROPDOWN;
        this.indicator = indicator;
        this.setHeight(height);
      },

      // 上拉
      pullup () {
        this.status = PULLUP;
        if (this.indicator !== RELEASE) {
          this.indicator = DEACTIVATE;
        }
      }
    }
}
</script>
<style lang="scss">
.scroll-mobile {
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .scroll-mobile-refresh {
    position: relative;

    .scroll-mobile-refresh-content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .scroll-mobile-indicator-content {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .scroll-mobile-transition {
    transition: height 0.3s;
  }
}
</style>