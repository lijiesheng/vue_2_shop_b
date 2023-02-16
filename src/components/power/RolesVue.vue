<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
<!--   一个添加角色按钮   el-row 代表一行 el-col代表一列 -->
      <el-row>
        <el-col>
          <el-button class="button-position" type="primary" round>添加角色</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="roleList" border stripe >
        <el-table-column type="index" width="60" label="#"></el-table-column>
        <el-table-column prop="roleDesc" width="60" label="角色描述"></el-table-column>
        <el-table-column prop="roleName" width="60" label="角色名称"></el-table-column>
        <el-table-column width="60" label="操作">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RolesVue',
  data () {
    return {
      // 所有角色列表数据
      roleList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.data
      console.log('this.roleList = ', this.roleList)
    }
  }
}
</script>

<style scoped>
. el-button {
}

.el-card {
  margin-top: 20px;
}

.button {
  /* text-align: center; */
}

.button-position {
  position: relative;
  left: -40%;
  top: 50%;
  transform: translate(-50%, -120%)
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}

</style>
