<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
<!--  table 数据表格  -->
<!--  border 是边框线    -->
<!--  stripe 各行变色    -->
      <el-table :data="rightsList" style="width: 100%" border stripe size="medium">
        <el-table-column type="index" width="60" label="#"></el-table-column>
        <el-table-column prop="authName"  label="权限名称" width="200"></el-table-column>
        <el-table-column prop="path"  label="路径" width="200"></el-table-column>
<!--  element-ui 的标签  -->
        <el-table-column prop="level"  label="权限等级" width="200">
          <!--     slot-scope 的 scope.row 可以用来接收这一对象的所有值     -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="info" v-else-if="scope.row.level === '2'">三级</el-tag>
          </template>

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RightsVue',
  data () {
    return {
      // 权限列表
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      const {data: res} = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.rightsList = res.data
      console.log('this.rightsList = ', this.rightsList)
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 15px;
}
</style>
