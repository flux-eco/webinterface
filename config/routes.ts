export default [
  {
    name: 'ListData',
    icon: 'book',
    path: '/listdata/:projectionName',
    layout: false,
    component: './ListData',
  },
  {
    name: 'EditData',
    icon: 'book',
    path: '/editdata/:projectionName',
    layout: false,
    component: './EditData',
  },
  {
    name: 'EditItem',
    icon: 'book',
    path: '/edititem/:projectionName/:sequence/',
    layout: false,
    component: './EditItem',
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
