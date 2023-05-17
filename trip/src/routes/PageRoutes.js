export default [
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/MainPage.vue"),
  },
  {
    path: "/search/tour",
    name: "search-tour",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/ToursearchPage.vue"),
  },
  {
    path: "/search/route",
    name: "search-route",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/RoutesearchPage.vue"),
  },
  {
    path: "/plan/month",
    name: "plan-month",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/MonthPlan.vue"),
  },
  {
    path: "/plan/tour",
    name: "plan-tour",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/TourPlan.vue"),
  },
  {
    path: "/plan/todo",
    name: "plan-todo",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/ToDo.vue"),
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/HotplacePage.vue"),
  },
  {
    path: "/board/notice",
    name: "notice",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/NoticePage.vue"),
  },
  {
    path: "/board",
    name: "board",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/FreeboardPage.vue"),
  },
  {
    path: "/board/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/PlanboardPage.vue"),
  },
];
