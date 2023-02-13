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
<!--用户列表区域 使用 table-->
<!--    border边框线  -->
      <el-table :data="userlist" style="width: 100%" border size="medium">
        <el-table-column type="index" width="60" ></el-table-column>
        <el-table-column prop="username"  label="姓名" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
<!--     slot-scope 的 scope.row 可以用来接收这一对象的所有值     -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="120"></el-table-column>
<!-- slot -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
<!--            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
<!--            <el-button type="" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
<!--  tooltip 是文字提示          -->
            <el-tooltip content="分配权限" placement="bottom" effect="light">
              <el-button size="mini" type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--     分页 -->
<!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
<!--   current-page 当前是第几页 -->
<!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 1 // 这个值要和:page-sizes 数组的第一个值相同
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
    },
    // pageSize的改变
    handleSizeChange (newSize) {
      console.log(`每页 ${newSize} 条`)
      this.queryInfo.pagesize = newSize
      // 重新获取数据
      this.getUsers()
    },
    // 页码值
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryInfo.pagenum = newPage
      // 重新获取数据
      this.getUsers()
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

.el-table {
  margin: 0px;
  font-size: 12px;
}
.el-pagination {
  margin: 30px;
  margin-top: 15px;
}
</style>
