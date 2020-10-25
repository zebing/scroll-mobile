<template>
  <div>
    <scroll-mobile>
      <div class="list-item" v-for="(value, key) in list" :key="key">{{value}}</div>
    </scroll-mobile>
  </div>
</template>
<script>
import ScrollMobile from "../../../dist";
export default {
  components: { ScrollMobile },
  data() {
    return {
      list: [],
    };
  },
  mounted () {
    this.list = Array.from({ length: 30 }, (value, key) => key)
  }
};
</script>
<style scoped>
.list-item {
  font-size: 30px;
  padding: 20px;
  border-bottom: 1px solid;
}
</style>