<template>
  <div>
    <Form ref="formInline" :model="searchData">
      <Row :gutter="16">
        <Col span="4">
          <FormItem prop="user" width="100%">
            <Input type="text" v-model="searchData.title" placeholder="请输入标题"/>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem prop="password">
            <Select v-model="searchData.cid" placeholder="请选择类别">
              <Option :value="item.id" v-for="(item,index) in category" :key="index">{{item.text}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary" @click="Submit('formInline')">搜索</Button>
            <Button @click="reset('formInline')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { getBloglist, getBlogdel, getCategory } from "../../api";
export default {
  name: "addAdmin",
  data() {
    return {
     
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>
