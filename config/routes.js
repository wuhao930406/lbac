export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/basic',
                name: '系统基础管理',
                icon: 'setting',
                routes: [
                  {
                    path: '/basic/user',
                    name: '用户管理',
                    component: './Basic/User',
                  },
                  {
                    path: '/basic/role',
                    name: '角色管理',
                    component: './Basic/Role',
                  },
                ],
              },
              {
                path: '/weapp',
                name: '公众号信息管理',
                icon: 'wechat',
                routes: [
                  {
                    path: '/weapp/store',
                    name: '门店管理',
                    component: './Weapp/Store',
                  },
                  {
                    path: '/weapp/factory',
                    name: '工厂管理',
                    component: './Weapp/Factory',
                  },
                ],
              },


              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './TableList',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
