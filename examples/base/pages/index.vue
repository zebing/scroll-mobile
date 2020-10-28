<template>
  <div>
    <scroll-mobile class="scroll">
      <div class="Item" v-for="(data, index) in list" :key="index">
        <div class="left">
          <div class="title">
            <div class="tag" v-for="(value, index) in []" :key="index">
              <span class="hot">{{value}}</span>
            </div>
            <span v-if="data.vip" class="vip"></span>
            {{data.title}}
          </div>
          <div class="context">
            <div class="middle">
              <span v-if="data.source" class="source">{{data.source}}</span>
              <span>{{data.time}}</span>
            </div>
            <div v-if="[].length" class="bottom" @touchmove="(e) => e.stopPropagation()">
              <tag v-for="(item, index) in tags" :key="index" :data="item"/>
            </div>
          </div>
        </div>
        <div class="right"><img :src="data.image" /></div>
      </div>
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
    // this.list = Array.from({ length: 12 }, (value, key) => key)
    const item = {
      image: "https://img.zhitongcaijing.com/astock/13.jpg?x-oss-process=image/format,jpg/quality,Q_100/resize,h_300",
      source: "第三方资讯",
      title: "智通港股早知道︱(10月28日)蚂蚁集团(06688)首日打新火热，带动腾讯(00700)价值重估",
      time: "2020-10-28 07:45",
    }

    const item1 = {
      image: "https://img.zhitongcaijing.com/image/20201028/20201028033516_59770.png?x-oss-process=image/format,jpg/quality,Q_80",
      source: "第三方资讯",
      title: "摩根大通：若特朗普成功连任，美股或将出现两位数涨幅",
      time: "2020-10-28 07:45",
    }

    this.list = Array.from({ length: 12 }, (value, key) => key%2 ? item : item1)
  }
};
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0!important;
}

.scroll {
  height: 100vh;
  width: 100vw;
}
.list-item {
  font-size: 30px;
  padding: 20px;
  border-bottom: 1px solid;
}

.Item {
  height: 2.4rem;
  padding: 0.28rem 0.3rem;
  display: flex;

  .left {
    flex: 1;
    padding-right: 0.3rem;
    width: 4.6rem;

    .title {
      font-size: 0.3rem;
      font-family: PingFangSC, PingFangSC-Regular, sans-serif;
      font-weight: 400;
      color: #333;
      line-height: 0.44rem;
      height: 0.88rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;

      .vip {
        display: inline-block;
        width: 0.56rem;
        height: 0.44rem;
        // background-image: url(~assets/images/news/vip/vip_light.png);
        background-repeat: no-repeat;
        background-size: 0.48rem 0.28rem;
        background-position: left center;
        vertical-align: top;
      }

      .tag {
        // margin-right: 0.12rem;
        padding-top: 0.06rem;
        display: inline-block;
        height: 0.44rem;
        font-size: 0;
        vertical-align: top;

        span {
          padding: 0 0.06rem;
          display: inline-block;
          height: 0.3rem;
          line-height: 0.28rem;
          background: #fa6400;
          border-radius: 0.04rem;
          font-size: 0.17rem;
          font-family: PingFangSC, PingFangSC-Medium, sans-serif;
          font-weight: 500;
          color: #fff;
          text-align: center;
        }

        .hot {
          background: #fa6400;
        }

        .exclusive {
          background: #ee881c;
        }

        .exclusivePrimary {
          background: #447eff;
        }
      }
    }

    .context {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      height: 0.96rem;

      .middle {
        height: 0.22rem;
        font-size: 0;
        font-family: PingFangSC, PingFangSC-Regular, sans-serif;
        font-weight: 400;
        color: #666;
        line-height: 0.22rem;

        span {
          font-size: 0.22rem;
        }

        .source {
          margin-right: 0.38rem;
        }
      }

      .bottom {
        margin-top: 0.18rem;
        overflow: hidden;
        font-size: 0;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  }

  .right {
    flex: 0 0 2.3rem;
    height: 1.84rem;
    font-size: 0;

    img {
      width: 2.3rem;
      height: 1.84rem;
      border-radius: 0.08rem;
    }
  }
}
</style>