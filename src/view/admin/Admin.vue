<template>
  <Layout class="layout">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>博客管理
            </template>
            <router-link to="/admin/bolgAdmin">
              <MenuItem name="1-1">文章列表</MenuItem>
            </router-link>
            <router-link to="/admin/categoryAdmin">
              <MenuItem name="1-2">分类列表</MenuItem>
            </router-link>
            <router-link to="/admin/addAdmin">
              <MenuItem name="1-3">文章新增</MenuItem>
            </router-link>
            <router-link to="/admin/categoryAdmin">
              <MenuItem name="1-4">分类新增</MenuItem>
            </router-link>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 0px 24px'}">
        <Content
          :style="{padding: '24px', minHeight: '280px', background: '#fff',boxSizing:'border-box'}"
        >
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
export default {
  name: "admin"
};
</script>
<style lang="less" scoped >
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100vh;
  box-sizing: border-box;
}
.layout-logo {
  width: 160px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  // left: 20px;
}
// .layout-nav {
//   width: 420px;
//   margin: 0 auto;
//   margin-right: 20px;
// }
</style>
