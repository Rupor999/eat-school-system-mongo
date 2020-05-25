import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    enable: false,
    text: "",
    color: ""
  },
  mutations: {
    activate(state, param) {
      state.text = param.text;
      state.color = param.color;
      state.enable = true;
    },
    off(state) {
      state.enable = false;
    }
  },
  actions: {
    activate({ commit, dispatch }, param) {
      commit("activate", param);
      setTimeout(() => {
        dispatch("off");
      }, 3000);
    },
    off({ commit }) {
      commit("off");
    }
  },
  getters: {
    getSnackEnabled: state => state.enable,
    getSnackText: state => state.text,
    getColor: state => state.color
  }
};
