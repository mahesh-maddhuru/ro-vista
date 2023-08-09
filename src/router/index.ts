import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from "@/views/ContactView.vue"
import ApiView from "@/views/ApiView.vue"
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/api-docs',
      name: 'api',
      component: ApiView
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    }
  ]
})

export default router
