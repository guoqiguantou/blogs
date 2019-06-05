<template>
  <div>  
    <Alert show-icon>
        新增一篇文章
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <template slot="desc">Custom icon copywriting. Custom icon copywriting. Custom icon copywriting. </template>
    </Alert>
    <Form ref="formInline" :model="addData" :label-width="80" style="marginTop:30px">
        <FormItem label="标题" style="width: 400px;">
            <Input type="text" v-model="addData.title" placeholder="请输入标题"/>
          </FormItem>
        <FormItem label="类别" style="width: 400px;">
            <Select v-model="addData.cid" placeholder="请选择类别">
              <Option :value="item.id" v-for="(item,index) in category" :key="index">{{item.text}}</Option>
            </Select>
          </FormItem>
          <FormItem label="文章封面图" style="width: 600px;">
            <Upload
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/">
              <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>Click or drag files here to upload</p>
              </div>
          </Upload>
          </FormItem>
          <FormItem label="描述" style="width: 600px;">
            <Input v-model="addData.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
          </FormItem>
          <Divider><p style="font-size:14px">文章正文</p></Divider>
          <div>
            <mavon-editor v-model="addData.content" style="min-height:500px"/>
          </div>
        <FormItem style="marginTop:30px">
            <Button type="primary" @click="submit">新增</Button>
            <Button @click="reset('formInline')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Row>
    </Form>
  </div>
</template>
<script>
import { getBloglist, getBlogdel, getCategory,blogadd } from "../../api";
export default {
  name: "addAdmin",
  data() {
    return {
      value:'',
      addData: {
        title: null,
        desc:null,
        content:'',
        cid: 1,
      },
      category: null
    };
  },
  mounted() {
    this.getBloglist();
    this.getCategory();
  },
  methods: {
    async getBloglist(data) {
      let res = await getBloglist(data);
      console.log(res);
      if (res) {
        this.data = res.data;
      }
    },
    async getBlogdel(id) {
      let data = {
        id: id
      };
      let res = await getBlogdel({ id: 3 });
      console.log(res);
      if (res) {
        this.getBloglist();
      }
    },
    async getCategory() {
      let res = await getCategory();
      console.log(res);
      if (res) {
        this.category = res.data;
      }
    },
    async blogadd(data){
      let res=await blogadd(data);
      console.log(res)
    },
    submit(){
      this.blogadd(this.addData)
    }
  }
};
</script>
<style lang="less" scoped>
</style>
