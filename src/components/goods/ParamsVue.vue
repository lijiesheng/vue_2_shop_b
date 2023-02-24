<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
<!--  :closable="false" 不能关闭    -->
      <el-alert type="warning" description="注意: 只允许为第三级分类设置相关参数!" show-icon :closable="false"></el-alert>
        <el-row :gutter="15">
          <el-col>
            <span class="shopCateText">
              选择商品分类：
            </span>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ParamsVue'
}
</script>

<style scoped>
.box-card {
  margin-top: 25px;
}
.el-alert {
  height: 30px;
}
.shopCateText {
  /*!*上下是15px 左右是0*!*/
  /*margin: 15px 0;*/
  position: relative;
  left: -43%;
  top: 100%;
  /*transform: translate(-80%, -50%)*/
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}
</style>
