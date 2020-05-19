import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    receivedUser: false,
    user: JSON.parse(localStorage.getItem("user"))
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      // state.user = "";
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
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: "/auth", method: "POST", data: user })
          .then(resp => {
            const token = "Bearer " + resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve();
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
      return new Promise((resolve, reject) => {
        axios({ url: "/getaccountinfo", method: "GET" })
          .then(resp => {
            localStorage.setItem("user", JSON.stringify(resp.data.user));
            commit("setUserInfo_success", resp.data.user);
            resolve(resp.data.user);
          })
          .catch(err => {
            commit("setUserInfo_error");
            reject(resp.data.user);
          });
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserInfo: state => state.user,
    getUserRoleWord: state => {
      switch (state.user.role) {
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
    },
    getUserAdditional: state => {
      switch (state.user.role) {
        case 1:
          return { children: state.user.additional.children };
          break;
        case 2:
          return {
            children: state.user.additional.children,
            school: state.user.additional.school
          };
          break;
        case 3:
          return {
            children: state.user.additional.children,
            school: state.user.additional.school,
            class: state.user.additional.class
          };
          break;
        case 4:
          return {
            children: state.user.additional.children,
            school: state.user.additional.school
          };
          break;
        case 5:
          return { children: state.user.additional.children };
          break;
        default:
          return {};
      }
    },
    getReceivedInfoStatus: state => state.receivedUser
  }
};
