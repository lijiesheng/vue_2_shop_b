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
<!--  el-row 一行    -->
        <el-row :gutter="15">
          <el-col>
            <span class="shopCateText">
              选择商品分类：
            </span>
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
                style="width:700px"
                @change="parentParamsChange" clearable>
              </el-cascader>
          </el-col>
        </el-row>
<!--  Tab 标签页    -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-row :gutter="15">
            <el-col>
              <el-button class="button-position" type="primary" round :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
            </el-col>
          </el-row>
<!-- 动态参数表格  -->
          <el-table :data="manyTableData" border stripe>
<!--       type="expand" 展开行     -->
            <el-table-column type="expand" width="60" label="#">
              <template slot-scope="scope">
                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="closeParamsById(scope.row, index)">{{item}}</el-tag>
                <!--动态编辑标签 element-ui-->
                <!--如果 inputVisible 为 true 则文本框显示 按钮隐藏-->
                <!--如果 inputVisible 为 false 则文本框隐藏 按钮显示-->
                <!--keyup 键盘抬起 触发 handleInputConfirm-->
                <!--blur 失去焦点-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 新增</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="attr_name"  label="参数名称" width="200"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <!--            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
                <!--            <el-button type="" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteParamsBox(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row :gutter="15">
            <el-col>
              <el-button class="button-position" type="primary" round :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
            </el-col>
          </el-row>
          <!-- 静态参数表格  -->
          <el-table :data="onlyTableData" border stripe>
            <!--       type="expand" 展开行     -->
            <el-table-column type="expand" width="60" label="#">
              <template slot-scope="scope">
                <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="closeParamsById(scope.row, index)">{{item}}</el-tag>
                <!--动态编辑标签 element-ui-->
                <!--如果 inputVisible 为 true 则文本框显示 按钮隐藏-->
                <!--如果 inputVisible 为 false 则文本框隐藏 按钮显示-->
                <!--keyup 键盘抬起 触发 handleInputConfirm-->
                <!--blur 失去焦点-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ 新增</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="attr_name"  label="属性名称" width="200"></el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <!--            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
                <!--            <el-button type="" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteParamsBox(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
<!-- 添加参数的对话框 添加参数和添加属性共用一个对话框 -->
    <el-dialog :title="'添加'+getDialogTitleName" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- rules 添加表单规则      -->
      <!-- ref 引用      -->
      <!-- label-width 文字的宽度      -->
      <el-form :model="addForm" :rules="addFormRules" ref="addParamsFormRef" label-width="90px">
        <!--    prop 校验      -->
        <el-form-item :label="getDialogTitleName" prop="attr_name" >
          <el-input v-model="addForm.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--       dialogFormVisible = false 隐藏对话框       -->
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParam">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改动态参数-->
    <el-dialog :title="'修改'+getDialogTitleName" :visible.sync="editDialogVisble" width="50%">
      <el-form :model="editForm" :rule="editFormRules" ref="editParamsFormRef" label-width="90px">
        <el-form-item :label="getDialogTitleName" prop="attr_name" >
          <el-input v-model="editForm.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--       dialogFormVisible = false 隐藏对话框       -->
        <el-button @click="editDialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="editParam">确 定</el-button>
      </div>
    </el-dialog>
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
      selectParamsKeys: [],
      // 哪个页签被选中  【在本例中，可以选择的的 many only】
      activeName: 'many',
      manyTableData: [], // 动态的参数
      onlyTableData: [], // 静态的参数
      addDialogVisible: false, // 控制添加对话框的显示和隐藏
      editDialogVisble: false,
      addForm: {
        attr_name: ''
      }, // 添加参数的表单数据对象
      editForm: {
        attr_name: '',
        attr_id: ''
      },
      addFormRules: {
        // 验证角色名是否合法
        attr_name: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur'}
        ]
      },
      editFormRules: {
        // 验证角色名是否合法
        attr_name: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getGoodList()
  },
  computed: {
    // 如果按钮需要被禁用 返回 ture, 否则 false
    isBtnDisabled () {
      return this.selectParamsKeys.length !== 3
    },
    // 当前选中的三级分类的id
    getThirdCateId () {
      if (this.selectParamsKeys.length === 3) {
        return this.selectParamsKeys[2]
      }
      return null
    },
    // 计算标题的文本
    getDialogTitleName () {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    }
    // 是否显示对话框
    // isShowDialog () {
    // }
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
    async parentParamsChange () {
      if (this.getThirdCateId != null) {
        await this.getParamData()
      } else {
        this.selectParamsKeys = []
        if (this.activeName === 'many') {
          this.manyTableData = []
        } else {
          this.onlyTableData = []
        }
      }
    },
    // tab 页签点击事件的处理函数
    handleTabClick () {
      console.log(this.activeName)
      // 切换面板重新获取数据
      this.getParamData()
    },

    // 一个公共的方法
    async getParamData () {
      // 证明选中的不是三级分类
      if (this.selectParamsKeys.length !== 3) {
        this.selectParamsKeys = []
        return
      }
      // 证明选中的是三级分类
      console.log(this.selectParamsKeys)
      // 根据所选的分类Id,和当前所处的面板，获取对应的参数
      const {data: res} = await this.$http.get(
        `categories/${this.getThirdCateId}/attributes`, {params: {sel: this.activeName}})
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      console.log('res=', res)
      res.data.forEach(item => {
        if (item.attr_vals) {
          item.attr_vals = item.attr_vals.split(' ')
        } else {
          item.attr_vals = []
        }
        // 控制文本框的显示与隐藏
        item.inputVisible = false
        // 文本框中输入的值
        item.inputValue = ''
      })
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    // 监听对话框的关闭时间
    addDialogClose () {
      console.log('ok')
      this.$refs.addParamsFormRef.resetFields()
    },
    // 添加参数
    addParam () {
      console.log('this.selectParamsKeys[2]=', this.selectParamsKeys[2])
      this.$refs.addParamsFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        const {data: res} = await this.$http.post(`categories/${this.selectParamsKeys[2]}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) {
          return this.$message.error(`${this.getDialogTitleName}失败`)
        }
        this.$message.success(`${this.getDialogTitleName}成功`)
        // 获取参数列表和静态参数列表
        await this.getParamData()
        this.addDialogVisible = false
      })
    },
    // 点击按钮，显示对话框
    async showEditDialog (info) {
      // 显示对话框
      this.editDialogVisble = true
      // 通过 id 获取数据
      console.log('info=', info)
      const {data: res} = await this.$http.get(`categories/${info.cat_id}/attributes/${info.attr_id}`,
        {params: {attr_sel: this.activeName}})
      if (res.meta.status !== 200) {
        return this.$message.error(`查询${this.getDialogTitleName}失败`)
      }
      this.editForm = res.data
      console.log('res=', res)
    },
    editParam () {
      this.$refs.editParamsFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        const {data: res} = await this.$http.put(`categories/${this.getThirdCateId}/attributes/${this.editForm.attr_id}`, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 200) {
          return this.$message.error(`${this.getDialogTitleName}失败`)
        }
        this.$message.success(`${this.getDialogTitleName}成功`)
        // 获取参数列表和静态参数列表
        await this.getParamData()
        this.editDialogVisble = false
      })
    },
    async showDeleteParamsBox (info) {
      // 如果返回成功,不会进入 catch; 返回失败 进入 catch
      const res = await this.$confirm(`此操作将${this.getDialogTitleName} ${info.attr_name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (res === 'cancel') { // 取消
        return this.$message.info('已取消删除')
      }
      console.log('info1=>', info)
      if (res === 'confirm') { // 确认
        const {data: res} = await this.$http.delete(`categories/${info.cat_id}/attributes/${info.attr_id}`)
        console.log('res == ', res)
        if (res.meta.status !== 200) {
          return this.$message.error(info.attr_name + '删除失败')
        } else {
          // 获取参数列表和静态参数列表
          await this.getParamData()
          // 重新获取数据
          this.$message.info(info.attr_name + '删除成功')
        }
      }
    },
    async closeParamsById (info, index) {
      const res = await this.$confirm(`此操作会删除阐述, 是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (res === 'cancel') { // 取消
        return this.$message.info('已取消删除')
      }
      if (res === 'confirm') { // 确认
        console.log('index=', index)
        console.log('info.attr_vals before=', info.attr_vals)
        // splice 会修改数组
        info.attr_vals.splice(index, 1)
        console.log('info.attr_vals after=', info.attr_vals)
        const {data: res} = await this.$http.put(`categories/${info.cat_id}/attributes/${info.attr_id}`, {
          attr_name: info.attr_name,
          attr_sel: info.attr_sel,
          attr_vals: info.attr_vals.join(' ')
        })
        if (res.meta.status !== 200) {
          return this.$message.error(`更新失败`)
        }
        this.$message.info(`更新成功`)
        // 重新获取数据
        // 获取参数列表和静态参数列表
        await this.getParamData()
      }
    },
    // 文本框失去焦点，或摁下了 enter 键都会调用这个方法
    async handleInputConfirm (row) {
      console.log('ok')
      // 文本框如果输入空格，清空
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      console.log('row.attr_vals=', row.attr_vals)
      if (!row.attr_vals) {
        row.attr_vals = []
      }
      // 如果没有 return ，输入的内容需要后序处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 提交到数据库
      const {data: res} = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(' ')
      })
      console.log('res=', res)
      if (res.meta.status !== 200) {
        return this.$message.error(`更新失败`)
      }
      this.$message.info(`更新成功`)
      // 重新获取数据
      // 获取参数列表和静态参数列表
      await this.getParamData()
    },
    // 点击按钮，展示文本框 ture 显示文本框
    showInput (row) {
      row.inputVisible = true
      // $nextTick 方法作用，就是当页面上元素被重新渲染之后，
      // 才会指定回调函数中的代码
      this.$nextTick(_ => {
        // 让文本框自动获取焦点的代码
        this.$refs.saveTagInput.$refs.input.focus()
      })
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
  left: -10%;
  top: 100%;
  /*transform: translate(-80%, -50%)*/
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}
.button-position {
  position: relative;
  left: -40%;
  top: 50%;
  transform: translate(-50%, -120%)
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}

.el-cascader {
  min-width: 100px;
  max-width: 250px;
}
.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>
