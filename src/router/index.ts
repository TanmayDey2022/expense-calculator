import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Overview from '../views/Overview.vue'
import Expense from '../views/Expense.vue'
import Income from '../views/Income.vue'
import Budget from '../views/Budget.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/overview',
    name: "Overview",
    component: Overview

  },
  {
    path: '/expense',
    component: Expense
  },
  {
    path: '/income',
    component: Income
  },
  {
    path: '/budget',
    component: Budget
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
