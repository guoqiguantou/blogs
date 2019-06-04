<template>
  <div class="blog">
    <div class="blog-left">
      <router-view></router-view>
    </div>
    <div class="blog-right">
      <div class="blog-box">
        <div class="header">搜索</div>
        <div class="blog-con">
          <Input search placeholder="请输入关键字搜索" v-model="searchdata"  @on-search="searchfunc"/>
        </div>
      </div>
      <div class="blog-box">
        <div class="header">文章分类</div>
        <div class="blog-con">
          <ul class="category">
            <li v-for="(item,index) in category" :key="index">
              <p>
                {{item.text}}
                <span>[{{item.num}}]</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="blog-box timebox">
        <div class="header">文章归档</div>
        <div class="blog-con">
          <ul class="timeList">
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
            <li>
              <p>
                2017年5月
                <span>[20]</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCategory } from "../api";
export default {
  data() {
    return {
      category: null,
      searchdata:null
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      let res = await getCategory();
      if (res) {
        this.category = res.data;
        console.log(res);
      }
    },
    searchfunc(){
      if(this.searchdata){
        this.$router.push({ path: '/', query: { title: this.searchdata }})
        this.searchdata=''
      }else{
        this.$router.push({ path: '/'})
      }
     
    }
  }
};
</script>
<style  scoped lang="less">
.blog {
  display: flex;
  .blog-left {
    flex: 1;
    height: 100%;
    margin-right: 30px;
  }
  .blog-right {
    width: 240px;
    height: 100%;

    .header {
      color: #333;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px dashed #ccc;
      padding-left: 5px;
    }
    .blog-box {
      margin-bottom: 15px;
      .blog-con {
        padding: 10px 0;
        padding-left: 5px;
        .category {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 50%;
            cursor: pointer;
            p {
              line-height: 30px;
              color: #8e6955;
              font-size: 14px;
              span {
                font-size: 12px;
                font-family: serif;
                margin-left: 3px;
                color: #b7b7b7;
              }
            }
          }
        }
        .timeList {
          li {
            cursor: pointer;
            p {
              line-height: 35px;
              color: #8e6955;
              font-size: 14px;
              &:hover {
                color: #500707;
              }
              span {
                font-size: 12px;
                font-family: serif;
                margin-left: 3px;
                color: #b7b7b7;
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1220px) {
  .blog {
    display: flex;
    flex-direction: column-reverse;
    .blog-left {
      flex: 1;
      height: 100%;
      margin-right: 0px;
    }
    .blog-right {
      width: 100%;
      height: 100%;
      .category {
        display: flex;
        flex-wrap: wrap;
        li {
          width: auto !important;
          cursor: pointer;
          margin: 0 10px;
          p {
            line-height: 30px;
            color: #8e6955;
            font-size: 14px;
            span {
              font-size: 12px;
              font-family: serif;
              margin-left: 3px;
              color: #b7b7b7;
            }
          }
        }
      }
      .timebox {
        display: none;
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  .blog {
    display: flex;
    flex-direction: column-reverse;
    .blog-left {
      flex: 1;
      height: 100%;
      margin-right: 0px;
    }
    .blog-right {
      width: 100%;
      height: 100%;
      .category {
        display: flex;
        flex-wrap: wrap;
        li {
          width: auto !important;
          cursor: pointer;
          margin: 0 10px;
          p {
            line-height: 30px;
            color: #8e6955;
            font-size: 14px;
            span {
              font-size: 12px;
              font-family: serif;
              margin-left: 3px;
              color: #b7b7b7;
            }
          }
        }
      }
      .timebox {
        display: none;
      }
    }
  }
}
</style>
