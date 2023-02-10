import Vue from 'vue'
import Router from 'vue-router'
import LoginVue from '../components/LoginVue'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
