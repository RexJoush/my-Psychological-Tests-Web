import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/home',
    component: Layout,
    redirect: '/home/table',
    name: '首页',
    meta: { title: '首页', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'swiper',
        name: '轮播图管理',
        component: () => import('@/views/swiper/index'),
        meta: { title: '轮播图管理', icon: 'table' }
      },
      {
        path: 'psytest',
        name: '心理测试管理',
        component: () => import('@/views/psytest/index'),
        meta: { title: '心理测试管理', icon: 'form' }
      },
      {
        path: 'psyperson',
        name: '心理咨询师管理',
        component: () => import('@/views/psyperson/index'),
        meta: { title: '心理咨询师管理', icon: 'tree' }
      },
      {
        path: 'courselist',
        name: '线上课程管理',
        component: () => import('@/views/courselist/index'),
        meta: { title: '线上课程管理', icon: 'tree' }
      },
      {
        path: 'eap',
        name: 'EAP管理',
        component: () => import('@/views/eap/index'),
        meta: { title: 'EAP管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/discover',
    component: Layout,
    redirect: '/discover/table',
    name: '发现',
    meta: { title: '发现', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'psyCategory',
        name: '心理测试类别管理',
        component: () => import('@/views/psyCategory/index'),
        meta: { title: '心理测试类别管理', icon: 'table' }
      },
      {
        path: 'findconsult',
        name: '心理咨询师管理',
        component: () => import('@/views/findconsult/index'),
        meta: { title: '心理咨询师管理', icon: 'form' }
      },
      {
        path: 'findonline',
        name: '线上课程管理',
        component: () => import('@/views/findonline/index'),
        meta: { title: '线上课程管理', icon: 'tree' }
      },
      {
        path: 'findgrow',
        name: '心理成长活动管理',
        component: () => import('@/views/findgrow/index'),
        meta: { title: '心理成长活动管理', icon: 'tree' }
      },
      {
        path: 'finduniversal',
        name: '心理测评通用平台管理',
        component: () => import('@/views/finduniversal/index'),
        meta: { title: '心理测评通用平台管理', icon: 'tree' }
      },
      {
        path: 'findeap',
        name: 'EAP管理1',
        component: () => import('@/views/findeap/index'),
        meta: { title: 'EAP管理1', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
