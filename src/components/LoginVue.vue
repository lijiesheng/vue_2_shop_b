<template>
  <div class="login_container">
<!--    Login 页面-->
    <div class="login_box">
<!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
<!--    登录表单区域  -->
<!--    ref="form" :model="form" 数据绑定  -->
      <el-form :model="loginForm" :rules="loginFormRules" label-width="70px" class="login_form">
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
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
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
        username: 'aa',
        password: '11'
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
    // onSubmit() {
    //   console.log('submit!');
    // }
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
