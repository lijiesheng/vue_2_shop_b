<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--element-ui Card 卡片-->
    <el-card class="box-card">
<!--搜索与添加区域-->
      <!--因为这里有搜索和添加用户,可以使用 element-ui layout 布局中的分栏间隔-->
      <el-row :gutter="15">
        <el-col :span="15">
<!--   clearable 文本可清空, 清空的同时, 查询       -->
<!--   clear 在点击由 clearable 属性生成的清空按钮时触发  @clear 绑定的事件  -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsers()">
            <!--        <el-select v-model="select" slot="prepend" placeholder="请选择">-->
            <!--          <el-option label="餐厅名" value="1"></el-option>-->
            <!--          <el-option label="订单号" value="2"></el-option>-->
            <!--          <el-option label="用户电话" value="3"></el-option>-->
            <!--        </el-select>-->
            <el-button slot="append" icon="el-icon-search" @click="getUsers()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="dialogFormVisible = true">添加用户</el-button>
<!--    添加用户的对话框   -->
<!-- close 当对话框关闭, close 会调用         -->
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="50%" @close="closeDialog">
<!-- rules 添加表单规则      -->
<!-- ref 引用      -->
            <el-form :model="addUserForm" :rules="addUserRules" ref="addFormRef" label-width="70px">
<!--  prop 验证规则的属性       -->
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
<!--       dialogFormVisible = false 隐藏对话框       -->
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
<!--用户列表区域 使用 table-->
<!--    border边框线  -->
      <el-table :data="userlist" style="width: 100%" border size="medium">
        <el-table-column type="index" width="60" ></el-table-column>
        <el-table-column prop="username"  label="姓名" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
<!--     slot-scope 的 scope.row 可以用来接收这一对象的所有值     -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"  active-color="#13ce66" inactive-color="#ff4949" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="120"></el-table-column>
<!-- slot -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
<!--            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
<!--            <el-button type="" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteMessageBox(scope.row)"></el-button>
<!--  tooltip 是文字提示          -->
            <el-tooltip content="分配角色" placement="bottom" effect="light">
              <el-button size="mini" type="warning" icon="el-icon-setting" circle @click="showSetRoles(scope.row)"></el-button>
            </el-tooltip>
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
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
<!--   编辑用户信息的对话框 对话框写在哪里都没有关系 -->
      <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible" width="50%" @close="closeEditDialog">
        <!-- rules 添加表单规则      -->
        <!-- ref 引用      -->
        <!-- label-width 文字的宽度      -->
        <el-form :model="editUserForm" :rules="editUserRules" ref="editFormRef" label-width="70px">
        <!--  prop 验证规则的属性       -->
          <el-form-item label="用户名">
            <!--  disabled="true" 不能编辑       -->
            <el-input v-model="editUserForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </div>
      </el-dialog>
<!--    分配权限对话框  -->
      <el-dialog title="分配角色" :visible.sync="dialogDistributionRoleVisible" width="50%" @close="setDistributionRoleClose">
        <div>
          <p>当前用户：{{row.username}}</p>
          <p>当前角色：{{row.role_name}}</p>
          <p>分配新角色：
<!--   selectedRoleId  选择的值   -->
            <el-select v-model="selectedRoleId" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </p>
        </div>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogDistributionRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>

export default {
  name: 'UserVue',
  data () {
    // 自定义校验规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证邮箱的规则
    var checkMobile = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/
      if (!phoneReg.test(value)) {
        return callback(new Error('请输入合法的电话号码'))
      }
      // 合法
      return callback()
    }
    return {
      // 获取用户列表参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5 // 这个值要和:page-sizes 数组的第一个值相同
      },
      userlist: [],
      total: 0,
      // 添加对话框的显示与隐藏 false 隐藏; true 打开
      dialogFormVisible: false,
      // 编辑对话框
      dialogEditFormVisible: false,
      // 分配角色对话框
      dialogDistributionRoleVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addUserRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          // trigger 触犯校验的时间
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      editUserRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          // trigger 触犯校验的时间
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 保存分配角色按钮对话框 保存当前的信息
      row: {},
      // 所有角色的列表
      rolesList: [],
      // 已经选择的值
      selectedRoleId: ''
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const {data: res} = await this.$http.get('users', {params: this.queryInfo})
      console.log('users = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      console.log('res1111 = ', res)
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // pageSize的改变
    handleSizeChange (newSize) {
      console.log(`每页 ${newSize} 条`)
      this.queryInfo.pagesize = newSize
      // 重新获取数据
      this.getUsers()
    },
    // 页码值
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryInfo.pagenum = newPage
      // 重新获取数据
      this.getUsers()
    },
    // 监听 switch 开关的改变
    async userStateChanged (info) {
      // console.log(`info = `, info)
      let url = `users/${info.id}/state/${info.mg_state}`
      console.log('url = ', url)
      const {data: res} = await this.$http.put(url)
      if (res.meta.status !== 200) {
        info.mg_state = !info.mg_state
        return this.$message.error(res.meta.message)
      }
      this.$message.success('更新数据成功')
    },
    // 监听添加用户对话框的关闭事件
    closeDialog () {
      // 关闭对话框时候，对话框的数据清空
      this.$refs.addFormRef.resetFields()
    },
    // 监听编辑用户对话框的关闭事件
    closeEditDialog () {
      this.$refs.editFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.post('users', this.addUserForm)
        console.log('res = ', res)
        if (res.meta.status !== 201) {
          this.$message.error('用户名和密码错误')
        }
        // 登录失败，去掉错误的用户名和密码
        this.$message({
          message: this.addUserForm.username + '添加成功',
          type: 'success'
        })
        // 关闭对话框
        this.dialogFormVisible = false
        // 用户有新增，需要重新刷新用户
        await this.getUsers()
      })
    },
    async showEditDialog (info) {
      // 显示对话框
      this.dialogEditFormVisible = true
      console.log('info = ', info)
      // 这里是否需要通过id 获取数据
      const {data: res} = await this.$http.get(`users/${info.id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
      }
      // 插入值
      this.editUserForm = res.data
      console.log('this.editUserForm = ', this.editUserForm)
    },
    editUser () {
      this.$refs.editFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        console.log('this.editUserForm = ', this.editUserForm)
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.put(`users/${this.editUserForm.id}`, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改用户信息失败')
        }
        // 重新获取数据
        await this.getUsers()
        // 关闭对话框
        this.dialogEditFormVisible = false
        // 提示修改成功
        this.$message({
          message: this.editUserForm.username + '修改成功',
          type: 'success'
        })
      })
    },

    async showDeleteMessageBox (info) {
      // 如果返回成功,不会进入 catch; 返回失败 进入 catch
      const res = await this.$confirm(`此操作将删除用户 ${info.username}, 是否继续?`, '提示', {
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
        const {data: res} = await this.$http.delete(`users/${info.id}`)
        console.log('res == ', res)
        if (res.meta.status !== 200) {
          return this.$message.error(info.username + '删除失败')
        } else {
          await this.getUsers()
          // 重新获取数据
          this.$message.info(info.username + '删除成功')
        }
      }
    },
    // 展示分配角色的对话框
    async showSetRoles (row) {
      this.row = row
      this.dialogDistributionRoleVisible = true
      console.log('row=', row)
      // 获取所有角色的数据
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
    },
    // 点击按钮 分配角色
    async saveRoleInfo () {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      const {data: res} = await this.$http.put(`users/${this.row.id}/role`, {rid: this.selectedRoleId})
      if (res.meta.status !== 200) {
        return this.$message.error('分配角色列表失败')
      }
      this.$message.success('分配角色列表成功')
      await this.getUsers()
      this.dialogDistributionRoleVisible = false
    },
    // 分配角色对话框的关闭事件
    setDistributionRoleClose () {
      this.selectedRoleId = ''
      this.row = {}
    }
  }
}

</script>

<style scoped>
/*.text {*/
/*  font-size: 14px;*/
/*}*/

/*.item {*/
/*  padding: 18px 0;*/
/*}*/

.box-card {
  width: 960px;
}

/*面包屑和下面卡片的距离*/
.el-breadcrumb {
  /*元素的下外边距*/
  margin-bottom: 15px;
  /*文字大小*/
  font-size: 12px;
}
/*卡片*/
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-input {

}

.el-table {
  margin: 0px;
  font-size: 12px;
}
.el-pagination {
  margin: 30px;
  margin-top: 15px;
}
</style>
