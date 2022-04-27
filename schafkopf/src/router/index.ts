import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/Spiele'
  },
  {
    path: '/Spiele',
    component: () => import ('../views/SpieleOrdner.vue')
  },
  {
    path: '/Einstellungen',
    component: () => import ('../views/Einstellungen.vue')
  },
  {
    path: '/new',
    component: () => import ('../views/New.vue')
  },
  {
    path: '/table/:id',
    component: () => import ('../views/Table.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
