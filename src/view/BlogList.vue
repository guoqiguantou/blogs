<template>
  <div class="banenr">
    <BolgList
      :title="item.title"
      v-for="(item,index) in bloglist"
      v-bind:key="index"
      :time="item.time"
      :desc="item.desc"
      :cname="item.cname"
      :id="item.id"
    />
  </div>
</template>
<script>
import { getCategory, getBloglist } from "../api";
import BolgList from "../components/BolgList";
export default {
  data() {
    return {
      bloglist: null
    };
  },
  components: {
    BolgList
  },
  mounted() {
    this.getBloglist();
    
  },
  methods: {
    async getBloglist(data) {
      let res = await getBloglist(data);
      if (res) {
        this.bloglist = res.data;
        console.log(res);
      }
    }
  },
  watch:{
    $route:{
handler: function (val, oldVal) { 
  console.log(val, oldVal)
  if(this.$route.query.title){
      console.log(val.query.title)
      this.getBloglist({title:val.query.title});
    }else{
      this.getBloglist()
    }
 },
      deep: true
    }
  }
};
</script>
<style  scoped lang="less">
</style>
