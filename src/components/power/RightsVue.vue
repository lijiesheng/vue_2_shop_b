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
      <el-table :data="rightsList" style="width: 100%" border size="medium">
        <el-table-column type="index" width="60" ></el-table-column>
        <el-table-column prop="authName"  label="权限名称" width="120"></el-table-column>
        <el-table-column prop="path"  label="路径" width="120"></el-table-column>
        <el-table-column prop="authName"  label="权限等级" width="120"></el-table-column>
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
        return this.$message.error('获取全新列表失败！')
      }
      this.rightsList = res.data
      console.log('this.rightsList = ', this.rightsList)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
