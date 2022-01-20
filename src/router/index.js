import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      index: 1 //添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 2 //添加 meta 属性，约定 2 为第二级
    }
  },
  {
    path:'/category',
    name: 'Category',
    component: () => import('../views/Category.vue'),
    meta: {
      index: 1 //添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      index: 1 //添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path:'/user',
    name:'User',
    component: () => import('../views/User.vue'),
    meta: {
      index: 1 //添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path:'/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      index: 2 //添加 meta 属性，约定 1 为第一级
    }
  },
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product-list',
    name: 'product-list',
    meta: {
      index: 2
    },
    component: () => import('../views/ProductList.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    meta: {
      index: 3
    },
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path:'/create-order',
    name: 'create-order',
    meta: {
      index: 2
    },
    component:()=> import('../views/CreateOrder.vue')
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      index:3
    },
    component:() => import('../views/Address.vue')
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    meta: {
      index: 3
    },
    component: () => import('../views/AddressEdit.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      index:2
    },
    component: () => import('../views/Order.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      index: 2
    },
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      index: 2
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component:()=> import('../views/OrderDetail.vue'),
    meta: {
      index:3
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
