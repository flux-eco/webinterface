export default [
  {
    name: 'Topical Areas',
    icon: 'book',
    path: '/topicalareas',
    layout: false,
    component: './TopicalAreas',
  },
  {
    path: '/topicalareas/:id',
    redirect: '/topicalareas/:id/list',
  },
  {
    name: 'Topical Area',
    icon: 'book',
    path: '/topicalareas/:id/:page',
    layout: false,
    component: './TopicalArea',
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
    layout: false
  },
];
