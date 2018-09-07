import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login.vue';
import home from '@/views/home';

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
      component: home
    }
  ]
});
