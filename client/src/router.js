import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/restaurants/:restaurantId',
    name: 'Restaurant Details',
    component: loadPage('RestaurantDetailsPage')
  },
  {
    path: '/restaurantManagement/:restaurantId',
    name: 'Restaurant Management',
    component: loadPage('RestaurantManagementPage'),
    children: [
      {
        path: '/updateInfo',
        name: 'update info',
        component: loadPage('UpdateRestaurantInfoPage')
      }
    ]
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
