import { createRouter, createWebHistory } from 'vue-router'
import TheDashboard from "../views/TheDashboard"
import AdminPort from "../views/AdminPort"
const routes = [
  {
    path: '/admin',
    name: 'AdminPort',
    component: AdminPort,
    meta: {
      authRequired: true,
    },
    children: [

      {
    path: '/',
    name: 'TheDashboard',
    component: TheDashboard
  },
  {
    path: '/products',
    name: 'TheProduct',
    component: () => import(/* webpackChunkName: "product" */ '../views/TheProduct.vue')
  },
  {
    path: '/orders',
    name: 'TheOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/TheOrder.vue')
  },
  {
    path: '/customers',
    name: 'TheCustomer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/TheCustomer.vue')
  },
  {
    path: '/revenue',
    name: 'TheRevenue',
    component: () => import(/* webpackChunkName: "revenue" */ '../views/TheRevenue.vue')
  },
  {
    path: '/shops',
    name: 'TheShop',
    component: () => import(/* webpackChunkName: "shops" */ '../views/TheShop.vue')
  },
  {
    path: '/sales',
    name: 'TheSales',
    component: () => import(/* webpackChunkName: "sales" */ '../views/TheSales.vue')
  },
  {
    path: '/setting',
    name: 'TheSetting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/TheSetting.vue')
  },
  {
    path: '/edit-product/:id',
    name: 'UpdateProduct',
    component: () => import(/* webpackChunkName: "update product" */ '../views/UpdateProduct.vue')
  },
  {
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product detail" */ '../views/ProductDetail.vue')
  },
  {
    path: '/supported-languages',
    name: 'SupportedLanguage',
    component: () => import(/* webpackChunkName: "supported language" */ '../views/SupportedLanguage.vue')
  },
  {
    path: '/product-category',
    name: 'ProductCategory',
    component: () => import(/* webpackChunkName: "product category" */ '../views/ProductCategory.vue')
  },
  {
    path: '/product-category/:id',
    name: 'CategoryDetail',
    component: () => import(/* webpackChunkName: " category detail" */ '../views/CategoryDetail.vue')
  },
  {
    path: '/add-shop',
    name: 'AddShop',
    component: () => import(/* webpackChunkName: "add-shop" */ '../views/AddShop.vue')
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "add-product" */ '../views/AddProduct.vue')
  },
  {
    path: '/shop-detail/:id',
    name: 'ShopDetail',
    component: () => import(/* webpackChunkName: "shop-detail" */ '../views/ShopDetail.vue')
  },
  {
    path: '/edit-shop/:id',
    name: 'UpdateShop',
    component: () => import(/* webpackChunkName: "edit-shop" */ '../views/UpdateShop.vue')
  },
  {
    path: '/order-detail/:id',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName: "order-detail" */ '../views/OrderDetail.vue')
  },
  {
    path: '/agents',
    name: 'TheAgent',
    component: () => import(/* webpackChunkName: "the-agent" */ '../views/TheAgent.vue')
  },
  {
    path: '/add-new-order',
    name: 'AddNewOrder',
    component: () => import(/* webpackChunkName: "add-new-order" */ '../views/AddNewOrder.vue')
  },
  {
    path: '/role',
    name: 'TheRole',
    component: () => import(/* webpackChunkName: "the-role" */ '../views/TheRole.vue')
  },
  {
    path: '/user-employee',
    name: 'TheEmployee',
    component: () => import(/* webpackChunkName: "the-employee" */ '../views/TheEmployee.vue')
  },
  {
    path: '/permission',
    name: 'ThePermission',
    component: () => import(/* webpackChunkName: "the-permission" */ '../views/ThePermission.vue')
  },
    ]
  },
  {
    path: '/reset-password/:token',
      props: true,
        name: 'ResetPassword',
          component: () => import(/* webpackChunkName: "login" */ '../views/ResetPassword.vue'), 
    },
  {
    path: "/:notFound(.*)*", redirect: "/"
  },
  {
    path: '/login',
      name: 'TheLogin',
        component: () => import(/* webpackChunkName: "login" */ '../views/TheLogin.vue'),
          // beforeEnter: (to, from, next) => {
          //   if (localStorage.getItem('tokenA'))
          //     return next('/')
          //   else {
          //     next()
          //   }
          // },
  
    },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired) && !localStorage.getItem('tokenA')) {
    return next({ name: 'TheLogin' })
  }
  else
    next()
})
export default router
