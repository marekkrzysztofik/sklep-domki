import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import AddProduct from '@/components/AddProduct.vue'
import AddCategory from '@/components/AddCategory.vue'
import Basket from '@/components/Basket.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/add-category',
      name: 'AddCategory',
      component: AddCategory
    },
    {
      path: '/basket',
      name: 'Basket',
      component: Basket
    },
  ]
})

export default router
