export default [
  {
    name: 'list.table-list-demo',
    icon: 'table',
    path: '/table',
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
