import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    receivedUser: false,
    user: localStorage.getItem("user") || {
      fio: {
        surname: "loading",
        name: "loading",
        midname: "loading"
      },
      role: "loading"
    }
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
      // state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    setUserInfo_request(state) {
      state.status = "loading user info";
    },
    setUserInfo_error(state) {
      state.status = "error get info";
    },
    setUserInfo_success(state, user) {
      state.status = "success get info";
      state.user = user;
      state.receivedUser = !state.receivedUser;
    }
  },
  actions: {
    login({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: "/auth", method: "POST", data: user })
          .then(resp => {
            const token = "Bearer " + resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            dispatch("getUserInfo");
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      console.log(
        "LOGOUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" /////////////////////////////////////////////////////////////
      );
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getUserInfo({ commit }) {
      axios({ url: "/getaccountinfo", method: "GET" })
        .then(resp => {
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          commit("setUserInfo_success", JSON.stringify(resp.data.user));
        })
        .catch(err => {
          commit("setUserInfo_error");
        });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserInfo: state => {
      if (state.user !== "") return JSON.parse(state.user);
    },
    getUserRoleWord: state => {
      if (state.user !== "") {
        let temp = JSON.parse(state.user);
        switch (temp.role) {
          case 1:
            return "Администратор";
            break;
          case 2:
            return "Ответственный за питание";
            break;
          case 3:
            return "Классный руководитель";
            break;
          case 4:
            return "КШП";
            break;
          case 5:
            return "Родитель";
            break;
          default:
            return "Ошибка!";
        }
      }
    },
    getReceivedInfoStatus: state => state.receivedUser
  }
};
