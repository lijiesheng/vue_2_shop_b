<template>
    <el-container class="home-container">
      <!--头部布局-->
      <el-header>
        Header
        <el-button type="info" @click="logOut">退出</el-button>
      </el-header>

      <!--页面主体区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside width="200px">Aside</el-aside>
        <!--右侧内容-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'HomeVue',
  methods: {
    logOut () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login') // 重定向到登录页面
    }
  }
}
</script>

<style scoped>
/*el-header 就是类名*/
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/*el-aside 就是类名  侧边栏*/
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

/*el-main 就是类名 主体区域*/
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.home-container {
  height: 100%;
}
</style>
