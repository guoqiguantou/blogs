<template>
  <div class="list" v-if="blogcontent">
    <div class="listheader">{{blogcontent.title}}</div>
    <div class="listcon">
      <ul class="info">
        <li>{{blogcontent.time|format}}</li>
        <li>{{blogcontent.text}}</li>
        <li>3595</li>
        <li>3条评论</li>
      </ul>
      <div class="listcenter">
        <div class="listblumb">
          <img src="../assets/img/list.jpg" alt>
        </div>
        <div class="content" v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { getBlogContent, getBloglist } from "../api/index";
import marked from "marked";

export default {
  data() {
    return {
      blogcontent: null,
      content: null
    };
  },
  mounted() {
    this.getBlogcontent();
  },
  filters: {
    format: function(value) {
      return dayjs(value).format("YYYY年MM月DD日 mm:ss");
    }
  },
  methods: {
    async getBlogcontent() {
      let res = await getBlogContent({ id: this.$route.params.id });
      if (res) {
        this.blogcontent = res.data[0];
        console.log(res);
        this.content = marked(res.data[0].content);
      }
    }
  }
};
</script>
<style  scoped lang="less">
.list {
  margin-bottom: 15px;
  .listheader {
    height: 60px;
    line-height: 60px;
    font-weight: normal;
    font-size: 25px;
    font-family: "微软雅黑";
    border-bottom: 1px dashed #ccc;
    text-shadow: 1px 1px 1px #ccc;
    color: #8e6955;
    padding: 0 5px;
  }
  .listcon {
    padding: 0 5px;
    .info {
      line-height: 30px;
      display: flex;
      li {
        font-size: 12px;
        color: #aaa;
        margin-right: 15px;
        display: inline;
        cursor: pointer;
      }
    }
    .listcenter {
      .listblumb {
        margin-bottom: 15px;
        img {
          width: 100%;
          height: 250px;
          display: block;
          border: 1px solid #ccc;
        }
      }
      .listtxt {
        line-height: 25px;
        max-height: 50px;
        overflow: hidden;
        color: #333;
      }
      .listurl {
        float: right;
        line-height: 25px;
        span {
          color: #8e6955;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
