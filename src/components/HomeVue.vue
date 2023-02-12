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
        <el-aside :width=width >
          <!--实现菜单的折叠和展开-->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!--侧边栏菜单区域  unique-opened 仅仅展开一个
          collapse  是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
          collapse-transition 不开启开启折叠动画
          router 启用该模式会在激活导航时以 index 作为 path 进行路由跳转[在二级菜单中可以使用到]
          default-active 当前激活菜单的 index 【高亮显示】
          -->
          <el-col>
            <el-menu
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#409EFF" unique-opened
              :collapse=collapse
              :collapse-transition="false" :router="true"
              :default-active="activePath">
              <!--一级菜单-->
              <!--每一个 v-for ,尽量都提供一个唯一的key; index 不能一样，否则展开一个，就都展开了 -->
              <el-submenu :index="(item.id).toString()" v-for="item in munuList" :key="item.id">
                <!--一级菜单的模板-->
                <template slot="title">
                  <!--图标-->
                  <i :class=iconsObj[item.id] id="icon"></i>
                  <!--文本-->
                  <span>{{item.authName}}</span>
                </template>
                <!--二级菜单-->
                <!--这里的 :index 一定要是字符串， index 是跳转的path-->
                <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                  <template slot="title">
                    <!--图标-->
                    <i class="el-icon-menu"></i>
                    <!--文本-->
                    <span>{{subItem.authName}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <!--右侧内容-->
        <el-main>
          <!--路由占位符-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'HomeVue',
  // 进入这个页面就会调用 create()方法
  created () {
    this.getMunuList()
    // 进入这个页面就会调用这个方法
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  // 这里需要电商管理后台API接口文档 1.4.2
  data () {
    return {
      // 左侧菜单数据
      munuList: [],
      // 这些图标的值最好在后端返回来，先不管了
      iconsObj: {
        '125': 'el-icon-s-custom',
        '103': 'el-icon-s-marketing',
        '101': 'el-icon-s-marketing',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-order'
      },
      collapse: false,
      width: '200px',
      // 被激活的链接地址
      activePath: ''
    }
  },
  methods: {
    logOut () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login') // 重定向到登录页面
    },
    // 获取所有的菜单
    async getMunuList () {
      const {data: res} = await this.$http.get('menus')
      console.log('res1 = ', res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.message)
      }
      this.munuList = res.data
      console.log(this.munuList)
    },
    // 折叠和展开
    toggleCollapse () {
      if (this.collapse) {
        this.width = '200px'
      } else {
        this.width = '64px'
      }
      this.collapse = !this.collapse
    },
    saveNavState (str) {
      window.sessionStorage.setItem('activePath', str)
      this.activePath = str
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
/*二级菜单展开和一级菜单展开一样长*/
.el-menu {
  border-right: none;
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

.el-icon-menu  {
  margin-right: 20px;
}

#icon {
  margin-right: 30px;
}

/*折叠和展开*/
.toggle-button {
  background-color: #2b4bdb;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  /*居中*/
  text-align: center;
}
</style>
