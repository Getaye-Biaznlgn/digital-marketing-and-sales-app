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
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product-detail" */ '../views/ProductDetail.vue')
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
    path: '/agents',
    name: 'TheAgent',
    component: () => import(/* webpackChunkName: "shop-detail" */ '../views/TheAgent.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

export default router
