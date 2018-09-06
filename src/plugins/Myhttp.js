// 引入axios
import axios from 'axios';
// 创建插件对象
const Myhttp = {};
// vue插件必须有公开的install方法
Myhttp.install = function (Vue) {
// 设置baseurl基地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  //   放到Vue的每一个实例上
  Vue.prototype.$http = axios;
};
// 必须有一个导出文件
export default Myhttp;
