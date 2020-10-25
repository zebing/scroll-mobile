<template>
  <div 
    class="scroll"
  >
    <div class="refresh">finish</div>
    <slot></slot>
    <div class="load">finish</div>
  </div>
</template>
<script>
export default {
    name: 'scroll-mobile',
}
</script>
<style lang="scss" scoped>
.scroll {
  .refresh {
    font-size: 24px;
    color: #999;
  }
}
</style>