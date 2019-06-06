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
    <Table :columns="columns1" :data="data"></Table>
  </div>
</template>
<script>
import { Divider } from "iview";
import { getBloglist, getBlogdel, getCategory } from "../../api";
export default {
  name: "bolgAdmin",
  data() {
    return {
      searchData: {
        title: "",
        cid: ""
      },
      columns1: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "blumb",
          key: "blumb",
          render: (h, params) => {
            return h(
              "img",
              {
                attrs: {
                  src: params.row.blumb
                }
              },
              "qqqqqqq"
            );
          }
        },
        {
          title: "title",
          key: "title"
        },
        {
          title: "desc",
          key: "desc"
        },
        {
          title: "cname",
          key: "cname"
        },
        {
          title: "content",
          key: "content",
          render: (h, params) => {
            return h("span", params.row.content.slice(0, 100));
          }
        },
        {
          title: "time",
          key: "time"
        },

        {
          title: "Action",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBlogdel(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      category: null
    };
  },
  mounted() {
    this.getBloglist();
    this.getCategory();
  },
  methods: {
    reset(name) {
      this.$refs[name].resetFields();
      this.getBloglist();
    },
    Submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(valid);
          this.getBloglist({
            title: this.searchData.title,
            cid: this.searchData.cid
          });
          //this.$Message.success("Success!");
        } else {
          //this.$Message.error("Fail!");
        }
      });
    },
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
