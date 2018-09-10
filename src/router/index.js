import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login.vue';
import home from '@/views/home';
import User from '@/views/users/list';

// var User = {
//   template: '<h3>edfghjsdfg</h3>'

// };
Vue.use(Router);
export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: User
        }
      ]
    }
  ]
});
