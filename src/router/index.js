import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home.vue'
import Login from '@/views/layout/Login.vue';
import store from '../store/index';
import  getMenuRoute  from '../utils/permission';

Vue.use(VueRouter)



const ayncRouter = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      display: true,
      icon: 'skin'
    },
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        display: true,
        icon: 'unordered-list',
      },
      component: () => import('@/views/layout/page/ProductList.vue'),
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '商品添加',
        display: true,
        icon: 'file-add'
      },
      component: () => import('@/views/layout/page/ProductAdd.vue'),
    },
    {
      path: 'edit',
      name: 'ProductEdit',
      meta: {
        title: '商品编辑',
        display: false,
        icon: 'file-add'
      },
      component: () => import('@/views/layout/page/ProductEdit.vue'),
    },
    {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        display: true,
        icon: 'database'
      },
      component: () => import('@/views/layout/page/Category.vue'),
    }
   ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/statistics',
    meta: {
      title: '首页',
      display: true,
      icon: 'home',
    },
    children: [{
      path: 'statistics',
      name: 'Statistics',
      meta: {
        title: '统计',
        display: true,
        icon: 'bar-chart'
      },
      component: () => import('@/views/layout/page/Statistics.vue'),
    
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      display: false,
    },
    component: Login
  },
]

const router = new VueRouter({
  routes,
})




let isAddRoutes = false;
router.beforeEach(function(to,from,next) {
  if(to.path != '/login') {
    if(store.state.user.username && store.state.user.email && store.state.user.appkey) {
      if(!isAddRoutes) {
        const newRoutes = getMenuRoute(store.state.user.role,ayncRouter);
        
        store.dispatch('changeMenuRoutes',routes.concat(newRoutes)).then(() => {
          router.addRoutes(newRoutes);
          
          next();
        });
        // console.log(store.state.menuRouter)
        isAddRoutes = true;
      }
      // console.log(ayncRouter);
     return next();
    }
     return next("/login");
  }
  return next();
})


export default router
