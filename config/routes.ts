export default [
  {
    name: 'ListData',
    icon: 'book',
    path: '/listdata/:projectionName',
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
