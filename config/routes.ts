export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/develop',
    name: 'Developer',
    icon: 'user',
    component: './Developer',
  },

  {
    path: '/',
    redirect: '/develop',
  },
  {
    component: './404',
  },
];
