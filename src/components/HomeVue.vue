<template>
    <el-container class="home-container">
      <!--头部布局-->
      <el-header>
        <!---->
        <div class="el_header_div">
          <img src="../assets/heima.png" alt="">
          <span class="el_header_span">电商后台管理系统</span>
        </div>
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
  /*左右布局*/
  display: flex;
  /*两遍对齐*/
  justify-content: space-between;
  /*左边间距为0*/
  padding-left: 0;
  /*右边间距为0*/
  padding-right: 0;
  /*上下居中显示*/
  align-items: center;
  /*文本颜色*/
  color:#fff;
  /*文本的大小*/
  font-size: 20px;
}

/*对el-header 的 el_header_div 进行布局*/
.el_header_div {
  /*左右布局*/
  display: flex;
  /*上下居中显示*/
  align-items: center;
}

.el_header_span {
  /*span 距离左边的 15px*/
  margin-left: 15px ;
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
