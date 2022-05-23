export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:pageName',
    icon: 'book',
    component: './FluxPage',
    access: 'canRead'
  },
  {
    path: '/:pageName/:id',
    icon: 'book',
    component: './FluxPage',
    access: 'canRead'
  },
  {
    path: '/:parentPageName/:parentId/:page',
    icon: 'book',
    component: './FluxPage',
    access: 'canRead'
  },
  {
    path: '/:parentPageName/:parentId/:page/:id',
    icon: 'book',
    component: './FluxPage',
    access: 'canRead'
  },
  {
    component: './404',
    layout: false
  },
];
