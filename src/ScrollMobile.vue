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
      <div class="scroll-mobile-refresh-content scroll-mobile-indicator-content">{{refreshIndicator}}</div>
    </div>
    <slot></slot>
    <div class="scroll-mobile-load scroll-mobile-indicator-content">
      {{loadIndicator}}
    </div>
  </div>
</template>
<script>
import { isEdge, isDropDown } from './shared';
import {
  ACTIVATE, 
  DEACTIVATE, 
  RELEASE, 
  COEFFICIENT, 
  REFRESHDISTANCE, 
  REFRESHFREEDISTANCE, 
  DROPDOWN, 
  PULLUP, 
  FINISH,
  REFRESHINDICATOR,
  LOADINDICATOR
} from './constants';

export default {
    name: 'scroll-mobile',

    data () {
      this.isRequestAnimationFrame = true;
      this.refreshHeight = 0; // 刷新指示内容高度
      return {
        startY: 0, // touch start 位置
        satrtX: 0, // touch start 位置
        currentY: 0, // touch move 位置
        onTouch: false, // touch 状态
        indicator: ACTIVATE, // 刷新/加载指示器
        status: null, // 刷新/加载
      }
    },

    computed: {
      refreshIndicator () {
        if (this.status === DROPDOWN) {
          return REFRESHINDICATOR[this.indicator];
        }

        return REFRESHINDICATOR[ACTIVATE];
      },

      loadIndicator () {
        if (this.status === PULLUP) {
          return LOADINDICATOR[this.indicator];
        }

        return LOADINDICATOR[ACTIVATE];
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

        // 到达边界
        if (isEdge(this.$refs['scroll'])) {
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
            const height = this.indicator === RELEASE ? REFRESHFREEDISTANCE : 0;
            this.setHeight(height);
          })
        }
      },

      doCallback () {
        if (this.indicator === RELEASE) {
          return;
        }

        if (isDropDown(this.indicator, this.status, this.startY, this.currentY)) {
          
          setTimeout(() => {
            this.indicator = FINISH;
            this.$nextTick(() => {
              this.setHeight(0);
            })
          }, 300);
        } else {
          setTimeout(() => {
            this.indicator = ACTIVATE;
          }, 300);
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
        let indicator = REFRESHDISTANCE <= this.refreshHeight ? DEACTIVATE : ACTIVATE;
        let height = (this.currentY - this.startY) * COEFFICIENT;

        if (this.indicator === RELEASE) {
          height = Math.max(height + REFRESHFREEDISTANCE, REFRESHFREEDISTANCE);
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