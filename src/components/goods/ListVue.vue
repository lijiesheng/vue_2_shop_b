<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--element-ui Card 卡片-->
    <el-card class="box-card">
      <!-- el-row 代表一行 el-col代表一列 -->
      <el-row>
        <!--一列-->
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryGoodsInfo.query" clearable @clear="getGoodsList()">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList()"></el-button>
          </el-input>
        </el-col>
        <!--二列-->
        <el-col :span="4">
          <el-button type="primary" plain @click="dialogFormVisible = true">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" style="width: 100%" border stripe>
        <el-table-column type="index" width="60px" ></el-table-column>
        <!--商品名称不写 width , 而其他每一列都写了具体的 width 可以让 商品名称这一列自适应宽度-->
        <el-table-column prop="goods_name"  label="商品名称"></el-table-column>
        <el-table-column prop="goods_price"  label="商品价格(元)" width="95px"></el-table-column>
        <el-table-column prop="goods_weight"  label="商品重量" width="95px"></el-table-column>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">
            <!--过滤器 调用 main.js 的 filter-->
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditGoodsDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteGoodsMessageBox(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--     分页 -->
      <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
      <!--   current-page 当前是第几页 -->
      <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryGoodsInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryGoodsInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ListVue',
  data () {
    return {
      // 查询
      queryGoodsInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5 // 这个值要和:page-sizes 数组的第一个值相同
      },
      goodsList: [],
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      console.log('queryGoodsInfo=', this.queryGoodsInfo)
      const {data: res} = await this.$http.get('goods', {params: this.queryGoodsInfo})
      console.log('goodsList = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    showEditGoodsDialog (info) {},
    showDeleteGoodsMessageBox (info) {},
    // pageSize的改变
    handleSizeChange (newSize) {
      console.log(`每页 ${newSize} 条`)
      this.queryGoodsInfo.pagesize = newSize
      // 重新获取数据
      this.getGoodsList()
    },
    // 页码值
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryGoodsInfo.pagenum = newPage
      // 重新获取数据
      this.getGoodsList()
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 25px;
}
</style>
