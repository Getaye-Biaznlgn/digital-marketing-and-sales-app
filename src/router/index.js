import { createRouter, createWebHistory } from 'vue-router'
import TheDashboard from "../views/TheDashboard"
const routes = [
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
    path: '/product-detail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product-detail" */ '../views/ProductDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

export default router
