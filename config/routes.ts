export default [
  {
    name: 'EditData',
    icon: 'book',
    path: '/editdata/:subject',
    layout: false,
    component: './EditData',
  },
  {
    name: 'EditItem',
    icon: 'book',
    path: '/edititem/:subject/:id/',
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
