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
              <el-form-item label="角色名" prop="roleName">
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
        <el-table-column  type="expand" width="100" label="<"></el-table-column>
<!-- 索引列 -->
        <el-table-column type="index" width="100" label="#"></el-table-column>
        <el-table-column prop="roleDesc" width="200" label="角色描述"></el-table-column>
        <el-table-column prop="roleName" width="200" label="角色名称"></el-table-column>
<!-- 操作是要获取数据id , 需要用到作用域插槽-->
        <el-table-column width="300" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle>编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle>删除</el-button>
            <!--  tooltip 是文字提示          -->
            <el-tooltip content="分配权限" placement="bottom" effect="light">
              <el-button size="mini" type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
      // 添加对话框的显示与隐藏 false 隐藏; true 打开
      dialogAddRolesFormVisible: false,
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
      }
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
</style>
