<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--element-ui Card 卡片-->
    <el-card class="box-card">
<!--搜索与添加区域-->
      <!--因为这里有搜索和添加用户,可以使用 element-ui layout 布局中的分栏间隔-->
      <el-row :gutter="15">
        <el-col :span="15">
          <el-input placeholder="请输入内容">
            <!--        <el-select v-model="select" slot="prepend" placeholder="请选择">-->
            <!--          <el-option label="餐厅名" value="1"></el-option>-->
            <!--          <el-option label="订单号" value="2"></el-option>-->
            <!--          <el-option label="用户电话" value="3"></el-option>-->
            <!--        </el-select>-->
            <el-button slot="append" icon="el-icon-search" @click="getUsers()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain>添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>

export default {
  name: 'UserVue',
  data () {
    return {
      // 获取用户列表参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      userlist: [],
      total: 0
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const {data: res} = await this.$http.get('users', {params: this.queryInfo})
      console.log('users = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      console.log('res1111 = ', res)
      this.userlist = res.data.users
      this.total = res.data.total
    }
  }
}

</script>

<style scoped>
/*.text {*/
/*  font-size: 14px;*/
/*}*/

/*.item {*/
/*  padding: 18px 0;*/
/*}*/

.box-card {
  width: 960px;
}

/*面包屑和下面卡片的距离*/
.el-breadcrumb {
  /*元素的下外边距*/
  margin-bottom: 15px;
  /*文字大小*/
  font-size: 12px;
}
/*卡片*/
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-input {

}

</style>
