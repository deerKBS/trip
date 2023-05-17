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
    name: "calendar",
    path: "/plan/calendar",
    component: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    // children: [
    //   {
    //     name: "year",
    //     path: "year",
    //     components: {
    //       default: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    //       child: () => import(/* webpackChunkName: "year" */ "../view/apps/calendar/overview/Year.vue"),
    //     },
    //   },
    //   {
    //     name: "month",
    //     path: "month",
    //     components: {
    //       default: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    //       child: () => import(/* webpackChunkName: "month" */ "../view/apps/calendar/overview/Month.vue"),
    //     },
    //   },
    //   {
    //     name: "week",
    //     path: "week",
    //     components: {
    //       default: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    //       child: () => import(/* webpackChunkName: "week" */ "../view/apps/calendar/overview/Week.vue"),
    //     },
    //   },
    //   {
    //     name: "day",
    //     path: "day",
    //     components: {
    //       default: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    //       child: () => import(/* webpackChunkName: "day" */ "../view/apps/calendar/overview/Day.vue"),
    //     },
    //   },
    //   {
    //     name: "schedule",
    //     path: "schedule",
    //     components: {
    //       default: () => import(/* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"),
    //       child: () => import(/* webpackChunkName: "schedule" */ "../view/apps/calendar/overview/Schedule.vue"),
    //     },
    //   },
    // ],
  },
  {
    path: "/plan/tour",
    name: "plan-tour",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/TourPlan.vue"),
  },
  {
    path: "/plan/todo",
    name: "plan-todo",
    component: () => import(/* webpackChunkName: "Blank" */ "@/view/apps/todo/Todo.vue"),
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/HotplacePage.vue"),
  },
  {
    path: "/board/notice",
    name: "board-notice",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/NoticePage.vue"),
  },
  {
    path: "/board/all",
    name: "board-all",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/BoardPage.vue"),
  },
  {
    path: "/board/plan",
    name: "board-plan",
    component: () => import(/* webpackChunkName: "Main" */ "@/view/pages/PlanboardPage.vue"),
  },
];
