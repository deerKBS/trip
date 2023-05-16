import PageRoutes from './PageRoutes';

const routes = [
  {
    path: '',
    name: 'main-page',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/pages/MainPage.vue'),
  },
  ...PageRoutes,
];

export default routes;
