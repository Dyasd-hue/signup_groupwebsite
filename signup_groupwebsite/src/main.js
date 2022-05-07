import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from "dayjs"
import * as echarts from 'echarts';
import 'default-passive-events'
Vue.prototype.$echarts = echarts
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  //注册路由
  router
}).$mount('#app')
