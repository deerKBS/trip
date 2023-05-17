import { createStore } from "vuex";
import themeLayout from "./modules/themeLayout/actionCreator";
import auth from "./modules/authentication/axios/actionCreator";
import calendar from "./modules/calendar/actionCreator";
import todo from "./modules/todo/actionCreator";
import dataTable from "./modules/data-filter/actionCreator";

export default createStore({
  modules: {
    themeLayout,
    auth,
    calendar,
    todo,
    dataTable,
  },
});
