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
      <!--    来自第三方库的表格 vue-table-with-tree-grid  -->
<!--    show-index 序号  border 列的边框线-->
      <tree-table :data="goodList" :columns="columns" :selection-type="false" :expand-type="false" show-index border>
        <template slot="is_ok" slot-scope="scope">
          <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen"></i>
          <i v-else-if="scope.row.cat_deleted === true" class="el-icon-error" style="color: lightgreen"></i>
        </template>

        <template slot="is_cat_level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="info" v-else-if="scope.row.cat_level === 2">三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditCateDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteCateMessageBox(scope.row)">删除</el-button>
        </template>
      </tree-table>

      <!--     分页 -->
      <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
      <!--   current-page 当前是第几页 -->
      <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryGoodInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryGoodInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
      dialogAddCateFormVisible: false,
      // 获取商品列表参数对象
      queryGoodInfo: {
        query: '',
        type: '', // 值：1，2，3 分别表示显示一层二层三层分类列表 【可选参数】如果不传递，则默认获取所有级别的分类
        // 当前的页数
        pagenum: 1, // 【可选参数】如果不传递，则默认获取所有分类
        // 当前每页显示多少条数据
        pagesize: 5 // 【可选参数】如果不传递，则默认获取所有分类
      },
      goodList: [],
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '300px'
        },
        {
          label: '是否有效',
          // 表示，当前列定义为模版列
          type: 'template',
          // 表示当前这列使用的模版名称
          template: 'is_ok'
        },
        {
          label: '排序',
          // 表示，当前列定义为模版列
          type: 'template',
          // 表示当前这列使用的模版名称
          template: 'is_cat_level'
        },
        {
          label: '操作',
          // 表示，当前列定义为模版列
          type: 'template',
          // 表示当前这列使用的模版名称
          template: 'opt'
        }
      ]
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    async getGoodList () {
      const {data: res} = await this.$http.get('categories', {params: this.queryGoodInfo})
      console.log('res = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      this.goodList = res.data.result
      this.total = res.data.total
    },
    // pageSize的改变
    handleSizeChange (newSize) {
      console.log(`每页 ${newSize} 条`)
      this.queryGoodInfo.pagesize = newSize
      // 重新获取数据
      this.getGoodList()
    },
    // 页码值
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryGoodInfo.pagenum = newPage
      // 重新获取数据
      this.getGoodList()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
}

.button-position {
  position: relative;
  left: -40%;
  top: 50%;
  transform: translate(-50%, -120%)
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}

.el-card {
  margin-top: 20px;
}
</style>
