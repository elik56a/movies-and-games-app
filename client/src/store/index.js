import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCategory: '',
    isAppLoading: false
  },
  mutations: {
    UPDATE_SELECTED_CATEGORY: (state, category) => state.selectedCategory = category,
    UPDATE_APP_LOADER: (state, val) => state.isAppLoading = val
  },
  actions: {
  },
})
