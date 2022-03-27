export default [
  {
    name: 'ListData',
    icon: 'book',
    path: '/listdata/:page',
    layout: false,
    component: './ListData',
  },
  {
    name: 'ListData',
    icon: 'book',
    path: '/listdata/:page/:parentId',
    layout: false,
    component: './ListData',
  },
  {
    name: 'Home',
    icon: 'book',
    path: '/home',
    layout: false,
    component: './Home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
    layout: false
  },
];
