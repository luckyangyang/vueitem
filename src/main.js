// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import Myhttp from '@/plugins/Myhttp';
import Moment from 'moment';
// 设置过滤器
Vue.filter('fmtDate', (value, fmtStr) => {
  return Moment(value).format(fmtStr);
});
// 注册插件
Vue.use(Myhttp);
Vue.use(ElementUI);

Vue.config.productionTip = false;
// function aa(){
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
