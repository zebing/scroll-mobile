<template>
  <div 
    ref="scroll"
    class="scroll-mobile"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @touchcancel="touchend"
  >
    <div class="refresh">finish</div>
    <slot></slot>
    <div class="load">finish</div>
  </div>
</template>
<script>
import { isEdge, getAction } from './shared';

export default {
    name: 'scroll-mobile',

    data () {
      return {
        startY: 0, // touch start 位置
        satrtX: 0, // touch start 位置
        currentY: 0, // touch move 位置
      }
    },

    methods: {
      touchstart (e) {
        const touch = e.touches[0];
        this.startY = this.currentY = touch.screenY;
        this.startX = touch.screenX;
        console.log(e.touches)
      },

      touchmove (e) {
        // console.log(e.touches)
        const touch = e.touches[0];
        const _screenY = touch.screenY;
        const _screenX = touch.screenX;
        const action = getAction(this.currentY, _screenY);
        this.currentY = _screenY;
        
        // 横滑
        if (Math.abs(_screenX - this.startX) > 20 * window.devicePixelRatio) {
          console.log('横滑')
          return;
        }

        // 到达边界
        if (isEdge(this.$refs['scroll'], action)) {
          // console.log('touchmove', touch)
        }
      },

      touchend () {

      },


    }
}
</script>
<style lang="scss" scoped>
.scroll-mobile {
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .refresh {
    text-align: center;
    font-size: 24px;
    color: #999;
  }
}
</style>