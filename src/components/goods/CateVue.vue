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
        <el-button class="button-position" type="primary" round @click="showAddCateDialog">添加分类</el-button>
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

      <!--    添加分类对话框    写在哪里都可以  -->
      <el-dialog title="添加分类" :visible.sync="dialogAddCateFormVisible" width="50%" @close="closeAddCateDialog">
        <!-- rules 添加表单规则      -->
        <!-- ref 引用      -->
        <!--     label-width="auto" 默认对其       -->
        <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRef" label-width="80px">
          <!--  prop 验证规则的属性       -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addCateForm.cat_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类父级">
<!--     Cascader 级联选择器       -->
<!--     expand-trigger="hover" 通过鼠标展开       -->
<!--     :options="parentCateList" 数据源       -->
<!--     :props 用来指定配置对象     -->
<!--     v-model 选中的值，双向绑定到数组中，这里的指只能是数组     -->
<!--     @change="handleChange" 只要级联选择器的数据发生了变化，就会调用这个方法    -->
<!--     clearable 支持清空    -->
              <el-cascader
                expand-trigger="hover"
                :options="parentCateList"
                :props="cascaderProps"
                v-model="selectKeys"
                @change="parentCateChange" clearable>
              </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogAddCateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCateInfo">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑分类" :visible.sync="dialogEditCateFormVisible" width="50%" @close="closeEditCateDialog">
        <!-- rules 添加表单规则      -->
        <!-- ref 引用      -->
        <!-- label-width 文字的宽度      -->
        <el-form :model="editCateForm" :rules="editCateRules" ref="editCateRef" label-width="90px">
<!--    prop 校验      -->
          <el-form-item label="分类名称" prop="cat_name" >
              <el-input v-model="editCateForm.cat_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogAddCateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCate">确 定</el-button>
        </div>
      </el-dialog>
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
      // 编辑对话框
      dialogEditCateFormVisible: false,
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
      ],
      //
      addCateForm: {
        cat_name: '', // 分类名称
        cat_id: 0, // 分类父级  这个可以根据后端需要传入的参数确定
        // 分类的等级，默认是一级分类
        cat_level: 0 // 不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类
      },
      editCateForm: {
        cat_name: '', // 分类名称
        cat_id: '',
        cat_pid: '',
        cat_level: ''
      },
      addCateRules: {
        // 验证分类名称是否合法
        cat_name: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      editCateRules: {
        // 验证分类名称是否合法
        cat_name: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      selectedCateId: '', // 选择器选择的值
      parentCateList: [], // 获取所有的分类
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id', // 指定选项的值为选项对象的某个属性值【一般是id】
        label: 'cat_name', // 指定选项标签为选项对象的某个属性值 【一般是name】
        children: 'children', // 通过children 实现嵌套
        checkStrictly: true // 是否严格的遵守父子节点不互相关联 【可以选中一级，也可以选中二级，三级。。。】
      },
      // 选中父级分类的 Id 数组
      selectKeys: []
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    // 获取一级二级三级的分类
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
    },

    // 对话框关闭的时候，清空数据
    closeAddCateDialog () {
      this.$refs.addCateRef.resetFields()
      this.selectKeys = []
      this.addCateForm.cat_id = 0
      this.addCateForm.cat_level = 0
    },
    // 对话框关闭的时候，清空数据
    closeEditCateDialog () {
      this.$refs.editCateRef.resetFields()
    },
    saveCateInfo () {
      this.$refs.addCateRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return

        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.post('categories', {
          cat_pid: this.addCateForm.cat_id,
          cat_name: this.addCateForm.cat_name,
          cat_level: this.addCateForm.cat_level
        })
        if (res.meta.status !== 201) {
          this.$message.error('添加分类错误')
        }
        this.getGoodList()
        this.$message.success('添加分类成功')
        // 关闭对话框
        this.dialogAddCateFormVisible = false
      })
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog () {
      this.dialogAddCateFormVisible = true
      this.getParentCateList()
    },
    // 获取父级分类的数据列表 【一级和二级】
    async getParentCateList () {
      const {data: res} = await this.$http.get('categories', {params: {type: 2}})
      console.log('res = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      this.parentCateList = res.data
      console.log('parentCateList=', this.parentCateList)
    },
    // 级联器发生变化触发这个函数
    parentCateChange (value) {
      console.log(this.selectKeys)
      // 如果 selectedKeys 数组中的 length 大于 0, 证明选中了父级分类
      if (this.selectKeys.length > 0) {
        // 父分类id
        this.addCateForm.cat_id = this.selectKeys[this.selectKeys.length - 1]
        // 为当前分类的等级
        this.addCateForm.cat_level = this.selectKeys.length
      } else { // 没有选中父分类
        this.addCateForm.cat_id = 0
        // 为当前分类的等级
        this.addCateForm.cat_level = 0
      }
    },
    // 编辑 导入数据
    async showEditCateDialog (info) {
      // 显示对话框
      this.dialogEditCateFormVisible = true
      console.log('info = ', info)
      const {data: res} = await this.$http.get(`categories/${info.cat_id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
      }
      console.log('res=', res)
      this.editCateForm = res.data
    },
    async showDeleteCateMessageBox (info) {
      // 如果返回成功,不会进入 catch; 返回失败 进入 catch
      const res = await this.$confirm(`此操作将删除分类 ${info.cat_name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      console.log('res_res = ', res)
      if (res === 'cancel') { // 取消
        return this.$message.info('已取消删除')
      }
      if (res === 'confirm') { // 确认
        const {data: res} = await this.$http.delete(`categories/${info.cat_id}`)
        console.log('res == ', res)
        if (res.meta.status !== 200) {
          return this.$message.error(info.cat_name + '删除失败')
        } else {
          await this.getGoodList()
          // 重新获取数据
          this.$message.info(info.cat_name + '删除成功')
        }
      }
    },
    editCate () {
      this.$refs.editCateRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        console.log('this.editCateForm = ', this.editCateForm)
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.put(`categories/${this.editCateForm.cat_id}`, {
          cat_name: this.editCateForm.cat_name
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改分类信息失败')
        }
        this.$message.success('修改分类信息成功')
        // 重新获取数据
        await this.getGoodList()
        // 关闭对话框
        this.dialogEditCateFormVisible = false
      })
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

/*占满全部的宽度*/
.el-cascader {
  width: 100%;
}

</style>
