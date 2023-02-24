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
              <!--     Cascader 级联选择器       -->
              <!--     expand-trigger="hover" 通过鼠标展开       -->
              <!--     :options="parentCateList" 数据源       -->
              <!--     :props 用来指定配置对象     -->
              <!--     v-model 选中的值，双向绑定到数组中，这里的指只能是数组     -->
              <!--     @change="handleChange" 只要级联选择器的数据发生了变化，就会调用这个方法    -->
              <!--     clearable 支持清空    -->
              <el-cascader
                expand-trigger="hover"
                :options="goodParamsList"
                :props="cascaderParamsProps"
                v-model="selectParamsKeys"
                @change="parentParamsChange" clearable>
              </el-cascader>
            </span>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ParamsVue',
  data () {
    return {
      goodParamsList: [],
      // 指定级联选择器的配置对象
      cascaderParamsProps: {
        value: 'cat_id', // 指定选项的值为选项对象的某个属性值【一般是id】
        label: 'cat_name', // 指定选项标签为选项对象的某个属性值 【一般是name】
        children: 'children', // 通过children 实现嵌套
        checkStrictly: false // false,是严格的遵守; 是否严格的遵守父子节点不互相关联 【可以选中一级，也可以选中二级，三级。。。】
      },
      // 级联选择框双向绑定到数组
      selectParamsKeys: []
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    // 获取一级二级三级的分类
    async getGoodList () {
      const {data: res} = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      this.goodParamsList = res.data
      console.log('this.goodParamsList=', this.goodParamsList)
    },
    // 级联器发生变化触发这个函数
    parentParamsChange () {
      console.log(this.selectParamsKeys)
    }
  }
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
  left: -35%;
  top: 100%;
  /*transform: translate(-80%, -50%)*/
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}
</style>
