import Vue from 'vue'
import Router from 'vue-router'
import LoginVue from '../components/LoginVue'
import HomeVue from '../components/HomeVue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginVue',
      component: LoginVue
    },
    // 重定向,如果用户访问是/ ,重定向到 /login
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'HomeVue',
      component: HomeVue
    }
  ]
})

// 挂在路由导航守卫
// 功能: 如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面
// to 要访问的路径
// from 代表从哪个路径跳转过来
// next 是一个函数, 表示放行
//   1、next() 放行
//   2、next('/aaa')  跳转到/aaa路由
router.beforeEach((to, form, next) => {
  // 如果用户访问登录页，直接放行
  console.log(to)
  if (to.path === '/login') {
    return next()
  }
  // 如果不是，从sessionStorage 中获取保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    console.log('没有获取到', tokenStr)
    return next('/login') // 跳转到登录页
  }
  // 获取到了，放行
  next()
})

export default router
