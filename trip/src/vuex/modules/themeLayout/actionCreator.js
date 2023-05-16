import staticData from '@/config/config';
import mutations from './mutations';

const state = () => ({
  data: staticData.darkMode,
  main: staticData.mainTemplate,
  sidebar: staticData.sidebarTemplate,
  topBar: staticData.topBarTemplate,
  footer: staticData.footerTemplate,
  loading: false,
  menuLoading: false,
  error: null,
});

const actions = {
  async changeLayoutMode({ commit }, value) {
    try {
      commit('changeLayoutBegin');
      setTimeout(() => commit('changeLayoutSuccess', value), 10);
    } catch (err) {
      commit('changeLayoutErr', err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
