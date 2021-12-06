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
    name: 'Training Session',
    icon: 'book',
    path: '/session/:id',
    layout: false,
    component: './TrainingSession',
  },
  {
    path: '/',
    redirect: '/topicalareas',
  },
  {
    component: './404',
    layout: false
  },
];
