<template>
<div>
  <!--使用面包屑导航区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!--点击首页 跳转到 /home-->
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

  <!--element-ui Card 卡片-->
  <el-card class="box-card">
    <!--   一个添加角色按钮   el-row 代表一行 el-col代表一列 -->
    <el-row>
      <el-col>
        <!--  点击添加角色按钮，dialogAddRolesFormVisible = true 显示对话框   -->
        <el-button class="button-position" type="primary" round @click="dialogAddCateFormVisible = true">添加分类</el-button>
      </el-col>
      <!--表格-->
      <el-table>
      </el-table>
      <!--分页-->
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'CateVue',
  data () {
    return {
      // 添加对话框的显示与隐藏 false 隐藏; true 打开
      dialogAddCateFormVisible: false
    }
  }
}
</script>

<style scoped>

</style>
