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
<!--   label-position= top 文本在文本框上面-->
      <el-form ref="addGoodsRef" :model="addGoodsForm" :rules="addGoodsRules" label-width="70px" label-position="left">
        <el-tabs :tab-position="'left'" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <!--type="number" 只能输入数字-->
            <el-form-item label="商品价格" prop="goods_price" type="number">
              <el-input v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" type="number">
              <el-input v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="number">
              <el-input v-model="addGoodsForm.goods_number" ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_number" type="number">
              <el-input v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
          <el-tab-pane label="完成" name="5">完成</el-tab-pane>
      </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddGoodsVue',
  data () {
    return {
      activeIndex: 0,
      addGoodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0
      },
      addGoodsRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 1, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'}
        ]
      }
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
