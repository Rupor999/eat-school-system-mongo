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
    activate({ commit }, text, color) {
      commit("activate", text);
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
