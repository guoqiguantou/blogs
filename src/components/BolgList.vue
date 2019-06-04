
<template>
  <div class="list">
    <div class="listheader">
      <router-link v-bind:to="'/detai/'+id">{{title}}</router-link>
    </div>
    <div class="listcon">
      <ul class="info">
        <li>{{time|format}}</li>
        <li>{{cname}}</li>
        <li>3595</li>
        <li>3条评论</li>
      </ul>
      <div class="listblumb">
        <router-link v-bind:to="'/detai/'+id">
          <img src="../assets/img/list.jpg" alt>
        </router-link>
      </div>
      <div class="listtxt">{{desc}}</div>
      <div class="listurl">
        <router-link v-bind:to="'/detai/'+id">
          <span>阅读全文></span>
        </router-link>
      </div>
      <BackTop></BackTop>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "BolgList",
  props: {
    title: String,
    time: String,
    desc: String,
    cname: String,
    id: Number
  },
  filters: {
    format: function(value) {
      return dayjs(value).format("YYYY年MM月DD日 mm:ss");
    }
  }
};
</script>
<style scoped lang='less'>
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
    padding: 0 5px;
    a {
      color: #8e6955;
    }
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
</style>
