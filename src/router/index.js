import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
        path: 'consultlist',
        name: '线上课程管理',
        component: () => import('@/views/consultlist/index'),
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
        path: 'findpsytest',
        name: '心理测评管理',
        component: () => import('@/views/findpsytest/index'),
        meta: { title: '心理测评管理', icon: 'table' }
      },
      {
        path: 'findconsult',
        name: '咨询服务管理',
        component: () => import('@/views/findconsult/index'),
        meta: { title: '咨询服务管理', icon: 'form' }
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

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/eap/index'),
        meta: { title: 'Form', icon: 'form' }
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
