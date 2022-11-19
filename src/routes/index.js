import * as VueRouter from 'vue-router'
import Home from '@/pages/Home.vue';
import SignManager from '@/pages/SignManager.vue';

const routesBase = [
  {
    path: '/', name: 'home',
    component: Home,
  },
  {
    path: '/sign/add', name: 'sign-manager',
    component: SignManager,
  },
];

const routesAll = [
  ...routesBase,
];

export default VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes: routesAll,
});
