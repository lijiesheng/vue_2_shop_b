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
<!--  before-leave 可以获取将要改变的 Tab 和 oldTab  -->
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="handleClickTabs">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <!--type="number" 只能输入数字-->
            <el-form-item label="商品价格" prop="goods_price" >
              <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" >
              <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="cateList"
                :props="cascaderParamsProps"
                v-model="addGoodsForm.goods_cat"
                style="width:700px"
                @change="parentParamsChange" clearable>
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
<!--    渲染表单的 Item    -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableDate" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals" border>
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>

          <el-tab-pane label="商品图片" name="3">
            <!--Upload 图片列表缩略图-->
            <!-- action 上传图片请求的 API 接口 这里要写完整的API地址 -->
            <!-- on-preview 图片预览 -->
            <!-- headers 携带token -->
            <!-- on-remove 删除图片 -->
            <!-- file-list 删除图片 -->
            <!-- list-type 预览图片的方式 -->
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :headers="headerObj"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-tab-pane>
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
        goods_number: 0,
        goods_cat: [] // 商品的分类数组
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
        ],
        goods_cat: [
          {required: true, message: '请输入商品分类', trigger: 'blur'}
        ]
      },
      // 商品分类列表
      cateList: [],
      // 指定级联选择器的配置对象
      cascaderParamsProps: {
        value: 'cat_id', // 指定选项的值为选项对象的某个属性值【一般是id】
        label: 'cat_name', // 指定选项标签为选项对象的某个属性值 【一般是name】
        children: 'children', // 通过children 实现嵌套
        checkStrictly: false // false,是严格的遵守; 是否严格的遵守父子节点不互相关联 【可以选中一级，也可以选中二级，三级。。。】
      },
      manyTableDate: [], // 动态参数的列表
      // 图片上传组件的headers请求对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取所有商品分类数据
    async getCateList () {
      const {data: res} = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      this.cateList = res.data
    },
    // 级联器发生变化触发这个函数
    async parentParamsChange () {
      console.log(this.addGoodsForm.goods_cat)
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
      }
    },
    // oldActiveIndex 之前的 tab，改变后的 activeIndex
    beforeTabLeave (activeIndex, oldActiveIndex) {
      console.log('activeIndex=', activeIndex)
      console.log('oldActiveIndex=', oldActiveIndex)
      if (parseInt(oldActiveIndex) === 0 && this.addGoodsForm.goods_cat.length !== 3) {
        this.$message.error(`请选择商品分类`)
        return false // 阻止标签页的切换
      }
      return true
    },
    async handleClickTabs () {
      if (this.activeIndex === '1') {
        const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'many'}})
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态列表参数失败！')
        }
        this.manyTableDate = res.data
        this.manyTableDate.forEach(item => {
          if (item.attr_vals) {
            item.attr_vals = item.attr_vals.split(' ')
          } else {
            item.attr_vals = []
          }
        })
        console.log(this.manyTableDate)
      }
    },
    // 处理图片预览效果
    handlePreview () {

    },
    // 处理移除图片的操作
    handleRemove () {

    }
  },
  computed: {
    cateId () {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[2]
      }
      return null
    }
  },
  created () {
    this.getCateList()
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
