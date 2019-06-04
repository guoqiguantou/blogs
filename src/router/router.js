
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/Warp.vue'),
    children: [
      {
        path: '/',
        name: 'blog',
        component: () => import('../view/Blog.vue'),
        children: [
          {
            path: '',
            component: () => import('../view/BlogList.vue'),
          },
          {
            path: 'detai/:id',
            component: () => import('../view/BlogDetail.vue'),
          }
        ]
      },
      {
        path: '/index',
        component: () => import('../view/Index.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../view/About.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../view/admin/Admin.vue'),
    children: [
      {
        path: 'bolgAdmin',
        component: () => import('../view/admin/BolgAdmin.vue'),
      },
      {
        path: 'categoryAdmin',
        component: () => import('../view/admin/CategoryAdmin.vue'),
      }
    ]
  },
]
