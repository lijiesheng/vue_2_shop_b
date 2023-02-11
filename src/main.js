import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'

Vue.use(ElementUI)

// 配置请求的根路经
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 通过 axios 请求拦截器添加 token, 保证拥有获取数据的权限
// 这个是在每次请求后端API之前执行的
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log('config = ', config)
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
