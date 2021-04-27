import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../views/register/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  }
  // {
  //   path: '/',
  //   name: '首页',
  //   component: () => import('@/views/layout'),
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'Home',
  //       component: () => import('@/views/home')
  //     },
  //     {
  //       path: 'member',
  //       name: 'Member',
  //       component: () => import(/* webpackChunkName: "member" */ '@/views/member/index.vue')
  //     }
  //   ]
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// let whiteList = ['/register', '/login', '/modifyPwd'];
router.beforeEach((to, from, next) => {
  Vue.prototype.routerfrom = from;
  Vue.prototype.routerto = to;
  next();
  // let token = sessionStorage.getItem('jwtToken');
  // if (whiteList.includes(to.path)) {
  //   next();
  // } else {
  //   if (token) {
  //     next();
  //   } else {
  //     next({ path: '/login' });
  //   }
  // }
});
router.afterEach(() => {
  // NProgress.done();
});

export default router;
