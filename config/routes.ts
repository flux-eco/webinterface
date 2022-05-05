export default [
  {
    name: 'ListPage',
    icon: 'book',
    path: '/listpage/:page',
    layout: false,
    component: './ListPage',
  },
  {
    name: 'ListPage',
    icon: 'book',
    path: '/listpage/:page/:parentId',
    layout: false,
    component: './ListPage',
  },
  {
    name: 'FormPage',
    icon: 'book',
    path: '/formpage/:page',
    layout: false,
    component: './FormPage',
  },
  {
    name: 'FormPage',
    icon: 'book',
    path: '/formpage/:page/:progressId',
    layout: false,
    component: './FormPage',
  },
  {
    name: 'TablePage',
    icon: 'book',
    path: '/tablepage/:page',
    layout: false,
    component: './TablePage',
  },
  {
    name: 'TablePage',
    icon: 'book',
    path: '/tablepage/:page/:parentId',
    layout: false,
    component: './TablePage',
  },
  {
    name: 'StepsFormPage',
    icon: 'book',
    path: '/stepsformpage/:page',
    layout: false,
    component: './StepsFormPage',
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
