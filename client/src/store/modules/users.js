import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "left", sortable: false, value: "_id" },
        { text: "Фамилия", value: "fio.surname" },
        { text: "Имя", value: "fio.name" },
        { text: "Отчество", value: "fio.midname" },
        { text: "Роль", value: "role" }
        // { text: "Пароль", value: "password" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    users: [],
    selectedRows: [],
    filter_values: {
      surname: "",
      name: "",
      midname: "",
      role: ""
    }
  },
  mutations: {
    users_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    users_post(state) {
      state.status = "post operation";
      state.loading = true;
    },
    users_put(state, users) {
      state.status = "put operation";
      state.loading = true;
    },
    users_delete(state, users) {
      state.status = "delete operation";
      state.loading = true;
    },

    users_get_success(state, users) {
      state.status = "get users success";
      state.users = users;
      state.loading = false;
    },
    users_post_success(state) {
      state.status = "post operation success";
      state.loading = false;
    },
    users_put_success(state, users) {
      state.status = "put operation success";
      state.loading = false;
    },
    users_delete_success(state, users) {
      state.status = "delete operation success";
      state.loading = false;
    },

    users_error(state) {
      state.status = "error";
      state.loading = false;
    },
    ////
    //selectedRows
    set_selected_rows(state, selectedRows) {
      state.selectedRows = selectedRows;
      state.status = "selected rows";
    },
    //
    //filter
    setSurnameFilter(state, prop) {
      state.filter_values.surname = prop;
      state.status = "change SurnameFilter params";
    },
    setNameFilter(state, prop) {
      state.filter_values.name = prop;
      state.status = "change NameFilter params";
    },
    setMidnameFilter(state, prop) {
      state.filter_values.midname = prop;
      state.status = "change MidnameFilter params";
    },
    setRoleFilter(state, prop) {
      state.filter_values.role = prop;
      state.status = "change RoleFilter params";
    }
  },
  actions: {
    getUsers({ commit }) {
      return new Promise((resolve, reject) => {
        commit("users_get");
        axios({ url: "/users", method: "GET" })
          .then(resp => {
            commit("users_get_success", resp.data.users);
            resolve(resp.data.users);
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    },
    postUser({ commit }, newUser) {
      return new Promise((resolve, reject) => {
        commit("users_post");
        axios({ url: "/users", method: "POST", data: newUser })
          .then(resp => {
            commit("users_post_success", resp.data.users);
            resolve(resp.data.users);
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    },
    putUser({ commit }, editUser) {
      return new Promise((resolve, reject) => {
        commit("users_put");
        axios({ url: "/users", method: "PUT", data: editUser })
          .then(resp => {
            commit("users_put_success");
            resolve();
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    },
    deleteUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        commit("users_delete");
        axios({ url: "/users", method: "DELETE", data: userId })
          .then(resp => {
            commit("users_delete_success");
            resolve();
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setSurnameFilter", values.surname);
      commit("setNameFilter", values.name);
      commit("setMidnameFilter", values.midname);
      commit("setRoleFilter", values.role);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getUsers: state => state.users,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
