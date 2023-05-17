import initialState from "@/demoData/data-table.json"; // 차후에 여기서 데이터를 가져오는 것이 아닌 백엔드와 통신을 통해 가져와야함.
import mutations from "./mutations";

const state = () => ({
  tableData: [],
  loading: false,
  error: null,
});

const actions = {
  async tableReadData({ commit }) {
    try {
      commit("dataTableReadBegin");
      commit("dataTableReadSuccess", initialState);
    } catch (err) {
      commit("dataTableReadErr", err);
    }
  },

  async filterWithSubmit({ commit }, { id, status }) {
    try {
      commit("filterWithSubmitBegin");
      setTimeout(() => {
        const data = initialState.filter((item) => {
          return item.id.indexOf(id) >= 0 && item.status.toLowerCase().indexOf(status.toLowerCase()) >= 0;
        });

        commit("filterWithSubmitSuccess", data);
      }, 100);
    } catch (err) {
      commit("filterWithSubmitErr", err);
    }
  },
  async dataLiveFilter({ commit }, { value, key }) {
    try {
      commit("dataLiveFilterBegin");
      const data = initialState.filter((item) => item[key].toLowerCase().startsWith(value.toLowerCase()));
      commit("dataLiveFilterSuccess", data);
    } catch (err) {
      commit("dataLiveFilterErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
