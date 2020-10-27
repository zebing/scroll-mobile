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
      <div class="scroll-mobile-refresh-content scroll-mobile-indicator-content">{{indicator}}</div>
    </div>
    <slot></slot>
    <div class="scroll-mobile-load scroll-mobile-indicator-content">
      {{loadIndicator}}
    </div>
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
  DROPDOWN, 
  PULLUP, 
  FINISH
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
        status: null,
      }
    },

    computed: {
      refreshIndicator () {
        if (this.status === DROPDOWN) {
          return this.indicator;
        }

        return ACTIVATE;
      },

      loadIndicator () {
        if (this.status === PULLUP) {
          return this.indicator;
        }

        return ACTIVATE;
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
        const _screenY = touch.screenY;
        const _screenX = touch.screenX;
        this.currentY = _screenY;
        
        // 横滑
        if (Math.abs(_screenX - this.startX) > 20 * window.devicePixelRatio) {
          return;
        }

        // 到达边界
        if (isEdge(this.$refs['scroll'])) {
          this.doEdge();
        }
      },

      touchend () {
        this.onTouch = false;

        this.doFetch();

        if (this.indicator === DEACTIVATE) {
          this.indicator = RELEASE;
        }

        const action = this.getAction(); 

        if (action === DROPDOWN) {
          this.$nextTick(() => {
            const height = this.indicator === RELEASE ? REFRESHFREEDISTANCE : 0;
            this.setHeight(height);
          })
        }
      },

      doFetch () {
        console.log('doFetch', this.indicator)
        if (this.indicator === RELEASE) {
          return;
        }
        console.log('doFetch123')

        const action = this.getAction();
        if (action === DROPDOWN) {
          
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
        const action = this.getAction();
        console.log('action', action)
        // 下拉
        if (action === DROPDOWN) {
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
      },

      //  获取临界动作
      getAction () {
        if (RELEASE === this.indicator) {
          console.log(1)
          return this.status;
        }

        if (this.startY <= this.currentY) {
          console.log(2)
          return DROPDOWN;
        }
        console.log(3)
        return PULLUP;
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
    font-size: 24px;
    color: #999;
  }

  .scroll-mobile-transition {
    transition: height 0.3s;
  }
}
</style>