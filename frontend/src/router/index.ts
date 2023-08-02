import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import Main from '@/layouts/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'Interviews',
          // @ts-ignore
          component: () => import('@/pages/Interviews.vue'),
          props: { title: 'Interviews' }
        },
        {
          path: 'documents',
          name: 'Documents',
          // @ts-ignore
          component: () => import('@/pages/Documents.vue'),
          props: { title: 'Documents' }
        },
        {
          path: 'me',
          name: 'Me',
          // @ts-ignore
          component: () => import('@/pages/Me.vue'),
          props: { title: 'Me' }
        }
      ]
    },
  ]
})

export default router
