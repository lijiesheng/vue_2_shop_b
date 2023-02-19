<template>
  <div>
    <!--使用面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--点击首页 跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
<!--   一个添加角色按钮   el-row 代表一行 el-col代表一列 -->
      <el-row>
        <el-col>
<!--  点击添加角色按钮，dialogAddRolesFormVisible = true 显示对话框   -->
          <el-button class="button-position" type="primary" round @click="dialogAddRolesFormVisible = true">添加角色</el-button>
<!--    添加角色对话框      -->
          <el-dialog title="添加角色" :visible.sync="dialogAddRolesFormVisible" width="50%" @close="closeAddRoleDialog">
            <!-- rules 添加表单规则      -->
            <!-- ref 引用      -->
<!--     label-width="auto" 默认对其       -->
            <el-form :model="addRolesForm" :rules="addRolesRules" ref="addRolesRef" label-width="80px">
              <!--  prop 验证规则的属性       -->
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addRolesForm.roleName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addRolesForm.roleDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="add-roles-dialog-footer">
              <!--       dialogFormVisible = false 隐藏对话框       -->
              <el-button @click="dialogAddRolesFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRoles">确 定</el-button>
            </div>

          </el-dialog>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="roleList" border stripe style="width: 100%" size="medium">
<!--展开行-->
        <el-table-column  type="expand" width="100" label="<">
          <!--作用域插槽，拿到所有的数据-->
          <template slot-scope="scope">
            <!--每一行都分成了24个列 ，如果有组件需要并排，可以使用el-->
            <el-row :class="['dbbuttom', i1 === 0? 'dbtop': '' ,'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!--渲染一级权限 一级权限有5列-->
              <el-col :span="5">
                  <el-tag type="success" closable @close="closeRoleById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二、三级权限 有19列-->
              <el-col :span="19">
                <!--通过for循环得到二级权限-->
                <!--去掉二级分割线的头部分割线，一级分割线已经有了-->
                <el-row :class="[i2 === 0? '': 'dbtop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                      <el-tag type="success" closable @close="closeRoleById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--通过for循环得到三级权限-->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="closeRoleById(scope.row,item3.id)">{{item3.authName}}></el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!--输出scope的数据-->
            <pre>
<!--                          {{scope.row}}-->
            </pre>
          </template>
        </el-table-column>
<!-- 索引列 -->
        <el-table-column type="index" width="100" label="#"></el-table-column>
        <el-table-column prop="roleDesc" width="200" label="角色描述"></el-table-column>
        <el-table-column prop="roleName" width="200" label="角色名称"></el-table-column>
<!-- 操作是要获取数据id , 需要用到作用域插槽-->
        <el-table-column width="300" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="showEditRolesDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteMessageBox(scope.row)">删除</el-button>
            <!--  tooltip 是文字提示          -->
            <el-tooltip content="分配权限" placement="bottom" effect="light">
              <el-button size="mini" type="warning" icon="el-icon-setting" circle @click="showSetRightDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--   编辑用角色信息的对话框 对话框写在哪里都没有关系 -->
      <el-dialog title="编辑角色" :visible.sync="dialogEditRolesVisible" width="50%">
        <!-- rules 添加表单规则      -->
        <!-- ref 引用      -->
        <!-- label-width 文字的宽度      -->
        <el-form :model="editRolesForm" :rules="editRolesRules" ref="editRolesFormRef" label-width="70px">
          <!--  prop 验证规则的属性       -->
          <el-form-item label="角色名称">
            <el-input v-model="editRolesForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <!--  disabled="true" 不能编辑       -->
            <el-input v-model="editRolesForm.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogEditRolesVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRoles">确 定</el-button>
        </div>
      </el-dialog>
      <!--分配权限对话框-->
      <!--@close关闭对话空调用-->
      <el-dialog title="分配权限" :visible.sync="dialogDistributeRolesVisbile" width="50%" @close="setRightDialogClose">
        <!--使用 tree 树形控件  show-checkbox 可以勾选的  -->
        <!-- node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的-->
        <!-- default-expand-all 是否默认展开所有节点-->
        <el-tree :data="rightsList" show-checkbox :props="defaultProps" default-expand-all node-key="id" :default-checked-keys="default_checked_keys"></el-tree>
        <div slot="footer" class="dialog-footer">
          <!--       dialogFormVisible = false 隐藏对话框       -->
          <el-button @click="dialogDistributeRolesVisbile = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RolesVue',
  data () {
    return {
      // 所有角色列表数据
      roleList: [],
      addRolesForm: {
        roleName: '', // 角色名
        roleDesc: '' // 角色描述
      },
      editRolesForm: {
        roleId: '', // 根据角色id获取后端接口数据居然是roleId
        roleName: '',
        roleDesc: ''
      },
      // 添加对话框的显示与隐藏 false 隐藏; true 打开
      dialogAddRolesFormVisible: false,
      // 编辑对话框的显示与隐藏 false 隐藏; true 打开
      dialogEditRolesVisible: false,
      // 分配对话框的显示与隐藏 false 隐藏; true 打开
      dialogDistributeRolesVisbile: false,
      addRolesRules: {
        // 验证角色名是否合法
        roleName: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入决胜描述', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      editRolesRules: {
        // 验证角色名是否合法
        roleName: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入决胜描述', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      // 全新列表的数据
      rightsList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认勾选的节点的 key 的数组【id数组】
      default_checked_keys: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.data
      console.log('this.roleList = ', this.roleList)
    },
    // 监听添加决胜对话框的关闭事件
    closeAddRoleDialog () {
      // 关闭对话框的时候, 对话框的数据清空
      this.$refs.addRolesRef.resetFields()
    },
    addRoles () {
      this.$refs.addRolesRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.post('roles', this.addRolesForm)
        console.log('res = ', res)
        if (res.meta.status !== 201) {
          // 对话框的数据清空
          this.closeAddRoleDialog()
          this.$message.error('添加角色失败')
        }
        // 添加成功
        this.$message({
          message: this.addRolesForm.roleName + '添加成功',
          type: 'success'
        })
        // 对话框的数据清空
        this.closeAddRoleDialog()
        // 关闭对话框
        this.dialogAddRolesFormVisible = false
        // 决色有新增，需要重新刷新用户
        await this.getRolesList()
      })
    },
    editRoles () {
      this.$refs.editRolesFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        console.log('this.editUserForm = ', this.editRolesForm)
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.put(`roles/${this.editRolesForm.roleId}`, {
          roleDesc: this.editRolesForm.roleDesc,
          roleName: this.editRolesForm.roleName
        })
        if (res.meta.status !== 200) {
          return this.$message.error('修改角色信息失败')
        }
        // 重新获取数据
        await this.getRolesList()
        // 关闭对话空
        this.dialogEditRolesVisible = false
        // 提示修改成功
        this.$message.info(`角色${this.editRolesForm.roleName}修改成功`)
      })
    },
    async showEditRolesDialog (info) {
      // 显示编辑对话框
      this.dialogEditRolesVisible = true
      console.log('editRoleInfo = ', info)
      const {data: res} = await this.$http.get(`roles/${info.id}`)
      if (res.meta.status !== 200) {
        this.$message.error('查询角色信息失败')
      }
      // 插入值
      this.editRolesForm = res.data
      console.log('this.editRolesForm111 = ', this.editRolesForm)
    },

    async showDeleteMessageBox (info) {
      const res = await this.$confirm(`此操作会删除用户 ${info.roleName}, 是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      console.log('res = ', res)
      if (res === 'cancel') { // 取消
        return this.$message.info('已取消删除')
      }
      if (res === 'confirm') { // 确认
        const {data: res} = await this.$http.delete(`roles/${info.id}`)
        console.log('res == ', res)
        if (res.meta.status !== 200) {
          return this.$message.error(info.roleName + '删除失败')
        } else {
          await this.getRolesList()
          // 重新获取数据
          this.$message.info(info.roleName + '删除成功')
        }
      }
    },
    // roleId 角色 ID
    // rightId 权限 ID
    async closeRoleById (row, rightId) {
      const res = await this.$confirm(`此操作会删除角色, 是否继续`, '提示', {
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
        const {data: res} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
        console.log('res == ', res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败')
        } else {
          // 这里如果重新获取请求数据，需要再次展开才能看到，
          // 因为删除权限后返回的是当前这条数据删除后的权限列表，所以重新赋值就行了
          // await this.getRolesList()
          row.children = res.data
          // 重新获取数据
          this.$message.info('删除成功')
        }
      }
    },
    // 展示分配权限的对话框
    async showSetRightDialog (row) {
      this.dialogDistributeRolesVisbile = true
      // 获取所有权限的数据
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('查询权限信息失败')
      }
      this.rightsList = res.data
      console.log('this.rightsList = ', this.rightsList)
      // 获取这个角色的权限
      console.log('row=', row)
      this.getLeafKeys(row, this.default_checked_keys)
    },
    // 通过递归的形式，获取角色下所有三级权限的id,并且保存到 key default_checked_keys
    getLeafKeys (node, arr) {
      if (!node.children) { // 是三级节点
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    // 监听分配权限对话框
    setRightDialogClose () {
      this.default_checked_keys = []
    }
  }
}
</script>

<style scoped>
. el-button {
}

.el-card {
  margin-top: 20px;
}

.button {
  /* text-align: center; */
}

.button-position {
  position: relative;
  left: -40%;
  top: 50%;
  transform: translate(-50%, -120%)
  /*如果只需要一个 可以用 translateX(-50%) 或者 translateY(-50%)*/
}

.el-table {
  margin: 0px;
  font-size: 12px;
}
.el-tag {
  margin: 7px;
}

/*上面的边框线*/
.dbtop {
  border-top: 1px solid #eeeeee;
}

/*底部的边框线*/
.dbbuttom {
  border-bottom: 1px solid #eeeeee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
