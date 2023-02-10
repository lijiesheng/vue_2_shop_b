<template>
  <div class="login_container">
<!--    Login 页面-->
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginVue'
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

</style>
