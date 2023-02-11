<template>
  <div class="login_container">
<!--    Login 页面-->
    <div class="login_box">
<!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
<!--    登录表单区域  -->
<!--    ref="form" :model="form" 数据绑定  ref="loginFormRef" 这个表单的引用 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="70px" class="login_form">
<!--        用户名  prop 是校验的 username-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
<!--        密码 prop 是校验的 password-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-s-opportunity" type="password"></el-input>
        </el-form-item>
<!--        按钮-->
        <el-form-item class = "btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginVue',
  data () {
    return {
      // 这是登录表单的数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 64, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    // 重置按钮, 表单清空
    resetLoginForm () {
      console.log(this)
      // this.$refs.loginFormRef 表单的引用
      this.$refs.loginFormRef.resetFields()
    },
    // 表单的预校验
    login () {
      // this.$refs.loginFormRef 表单的引用
      this.$refs.loginFormRef.validate(async valid => {
        // 字段的校验通过了, 返回true; 没有通过，返回false
        console.log(valid)
        // 校验不通过
        if (!valid) return
        // data 是服务器返回的数据，这里将其解构赋值到了 res 对象
        const {data: res} = await this.$http.post('login', this.loginForm)
        console.log('res = ', res)
        // 登录失败
        if (res.meta.status !== 200) {
          // return console.log('登录失败')
          // 弹框
          // this.$alert('重新输入用户名和密码', '登录失败', {
          //   confirmButtonText: '确定',
          //   callback: action => {
          //     // 登录失败，去掉错误的用户名和密码
          //     this.$refs.loginFormRef.resetFields()
          //   }
          // })
          // 消息提示
          this.$message.error('用户名和密码错误')
          // 登录失败，去掉错误的用户名和密码
          this.$refs.loginFormRef.resetFields()
        } else { // 登录成功
          this.$message({
            message: '恭喜您' + this.loginForm.username + '登录成功',
            type: 'success'
          })

          // 1. 将登录成功之后的 token, 保存到客户端的 sessionStorage 中
          //   1.1 项目中除了登录之外的其他 API 接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以 token 保存在 sessionStorage 中
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          window.sessionStorage.setItem('token', res.data.token)
          // 可以在google浏览器检查中的Application-->storage中查询
          await this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style scoped>

/*背景色*/
.login_container{
  background: #2b4bdb;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;  /*login_box 的位置*/
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width:130px;
  height:130px;
  border : 1px solid #eee;
  border-radius: 50%;
  left: 50%;
  box-shadow: 0 0 10px #ddd;
  transform: translate(-50%, -50%);   /*撤掉自己的一半距离*/
  position: absolute;
}

img {
  width : 100%;
  height : 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.btns {
  display: flex;
  justify-content: right; /*  按钮尾部对齐*/
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
