import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import router from './router'
import TreeTable from 'vue-table-with-tree-grid'
// 导入全局样式
import './assets/css/global.css'

Vue.use(ElementUI)
Vue.component('tree-table', TreeTable)

// 全局过滤器
Vue.filter('dateFormat', function (originval) {
  const dt = new Date(originval)
  var year = dt.getFullYear()
  var Month = dt.getMonth() + 1
  var strDate = dt.getDate()
  var Hours = dt.getHours()
  var Minutes = dt.getMinutes()
  var Seconds = dt.getSeconds()
  if (Month >= 1 && Month <= 9) {
    Month = '0' + Month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (Hours >= 0 && Hours <= 9) {
    Hours = '0' + Hours
  }
  if (Minutes >= 0 && Minutes <= 9) {
    Minutes = '0' + Minutes
  }
  if (Seconds >= 0 && Seconds <= 9) {
    Seconds = '0' + Seconds
  }
  return year + '-' + Month + '-' + strDate + ' ' + Hours + ':' + Minutes
})

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
