<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!--element-ui Card 卡片-->
    <el-card class="box-card">
      <!--  :closable="false" 不能关闭    -->
      <el-alert type="warning" description="添加商品信息" show-icon :closable="false"></el-alert>
      <!--element-ui Steps 步骤条-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddGoodsVue'
}
</script>

<style scoped>
.box-card {
  margin-top: 25px;
}
.el-alert {
  height: 40px;
}

</style>
