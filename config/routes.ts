export default [
  {
    name: 'modules',
    icon: 'book',
    path: '/modules',
    layout: false,
    component: './Modules',
  },
  {
    name: 'list.table-list-demo',
    icon: 'table',
    path: '/table/:id',
    layout: false,
    component: './TableListDemo',
  },
  {
    path: '/',
    redirect: '/table',
  },
  {
    component: './404',
  },
];
