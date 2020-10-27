<template>
  <div 
    ref="scroll"
    class="scroll-mobile"
    @touchstart="touchstart"
    @touchmove="touchmoveThrottle"
    @touchend="touchend"
    @touchcancel="touchend"
  >
    <div class="refresh" ref="refresh" :class="{transition: !onTouch}">
      <div class="refresh-content">{{indicator}}</div>
    </div>
    <slot></slot>
    <div class="load">finish</div>
  </div>
</template>
<script>
import { isEdge } from './shared';
import {
  ACTIVATE, 
  DEACTIVATE, 
  RELEASE, 
  COEFFICIENT, 
  REFRESHDISTANCE, 
  REFRESHFREEDISTANCE,
} from './constants';

export default {
    name: 'scroll-mobile',

    data () {
      this.isRequestAnimationFrame = true;
      this.refreshHeight = 0;
      return {
        startY: 0, // touch start 位置
        satrtX: 0, // touch start 位置
        currentY: 0, // touch move 位置
        onTouch: false,
        indicator: ACTIVATE,
      }
    },

    methods: {
      touchstart (e) {
        const touch = e.touches[0];
        this.startY = this.currentY = touch.screenY;
        this.startX = touch.screenX;
        this.onTouch = true;
        console.log(e.touches)
      },

      touchmove (e) {
        console.log('onTouchMove')
        const touch = e.touches[0];
        const _screenY = touch.screenY;
        const _screenX = touch.screenX;
        this.currentY = _screenY;
        
        // 横滑
        if (Math.abs(_screenX - this.startX) > 20 * window.devicePixelRatio) {
          console.log('横滑')
          return;
        }

        // 到达边界
        if (isEdge(this.$refs['scroll'])) {
          this.doEdge(_screenY);
        }
      },

      touchend () {
        this.onTouch = false;
        const isDeactivate = this.indicator === DEACTIVATE;
        if (isDeactivate) {
          this.indicator = RELEASE;
        }

        if (this.currentY >= this.startY) {
          this.$nextTick(() => {
            const height = isDeactivate || this.indicator === RELEASE ? REFRESHFREEDISTANCE : 0;
            this.setHeight(height);
          })
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
        console.log('setHeight', value)
        this.refreshHeight = value;
        this.$refs['refresh'].style.height = `${this.refreshHeight}px`;
      },

      // 处理边界情况
      doEdge (_screenY) {
        // 下拉
        if (this.startY <= _screenY) {
          let indicator = REFRESHDISTANCE <= this.refreshHeight ? DEACTIVATE : ACTIVATE;
          let height = (_screenY - this.startY) * COEFFICIENT;
          if (this.indicator === RELEASE) {
            height += REFRESHFREEDISTANCE;
            indicator = RELEASE;
          }

          this.indicator = indicator;
          this.setHeight(height);
          console.log('下拉')

          // 上拉
        } else {
          this.indicator = ACTIVATE;
        }
      }
    }
}
</script>
<style lang="scss" scoped>
.scroll-mobile {
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .refresh {
    position: relative;
    text-align: center;
    font-size: 24px;
    color: #999;

    .refresh-content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .transition {
    transition: height 0.3s;
  }
}
</style>