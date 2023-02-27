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
<!--    active 激活下面的那个  0代表第一个-->
      <el-steps :space="200" :active="parseInt(activeIndex)" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

<!--  Tabs 标签页 -->
<!--   el-tabs 和  el-tab-pane 中间不能插入 form 表单-->
      <el-tabs :tab-position="'left'" style="height: 250px;" v-model="activeIndex">
        <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        <el-tab-pane label="完成" name="5">完成</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddGoodsVue',
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    // handleClick () {
    //   console.log('name=', this.activeName)
    //   this.activeIndex = parseInt(this.activeName)
    // }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 25px;
  height: 900px;
}
.el-alert {
  height: 40px;
}
.el-steps {
  /*height: 100px;*/
  margin: 15px 0;
}

.el-tabs {
  margin: 30px 0;
}
</style>
