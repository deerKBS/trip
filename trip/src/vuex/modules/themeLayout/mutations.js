export default {
  changeLayoutBegin(state) {
    state.loading = true;
  },

  changeLayoutSuccess(state, data) {
    state.loading = false;
    state.data = data;
    state.main = data ? 'blackMode' : 'lightMode';
  },

  changeLayoutErr(state, err) {
    state.loading = false;
    state.error = err;
  },
};
