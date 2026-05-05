import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },

  {
    path: '/products',
    component: () => import('../views/ProductsLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/ProductsList.vue')
      },
      {
        path: ':id',
        name: 'ProductDetail',
        component: () => import('../views/ProductDetail.vue'),
        props: true
      }
    ]
  },

  {
    path: '/cart',
    component: () => import('../views/Cart.vue')
  },

  {
    path: '/wishlist',
    component: () => import('../views/Wishlist.vue')
  },

  {
    path: '/checkout',
    component: () => import('../views/Checkout.vue')
  },

  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/register',
    component: () => import('../views/Register.vue')
  },

  {
    path: '/profile',
    component: () => import('../views/Profile.vue')
  },

  {
    path: '/success',
    component: () => import('../views/success.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})