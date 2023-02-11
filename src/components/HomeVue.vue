<template>
  <div>
    这是 homeVue 页面
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
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

</style>
