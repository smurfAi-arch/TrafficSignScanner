import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/upload'
  },
  //create a route for the upload page
  {
    path: '/upload',
    name: 'Upload',
    component: () => import ('../views/UploadPage.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import ('../views/HistoryPage.vue')
  },
  {
    path: '/trash',
    name: 'Trash',
    component: () => import ('../views/TrashPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import ('../views/AboutPage.vue')
  },
  {
    path: '/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
