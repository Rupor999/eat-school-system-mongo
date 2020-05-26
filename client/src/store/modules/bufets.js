import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "left", sortable: false, value: "_id" },
        { text: "Школа", value: "id_uchrezhdenia" },
        { text: "Категория", value: "id_kategoriya" },
        { text: "Наименование", value: "naimenovanie" },
        { text: "Цена", value: "cena" }
      ]
    },
    //end table_settings
    status: "",
    bufets: "",
    error: "",
    loading: false,
    selectedRows: []
  },
  mutations: {
    bufets_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    bufets_post(state) {
      state.status = "post operation";
      state.loading = true;
    },
    bufets_put(state, bufets) {
      state.status = "put operation";
      state.loading = true;
    },
    bufets_delete(state, bufets) {
      state.status = "delete operation";
      state.loading = true;
    },

    bufets_get_success(state, bufets) {
      state.status = "get schools success";
      state.bufets = bufets;
      state.loading = false;
    },
    bufets_post_success(state) {
      state.status = "post operation success";
      state.loading = false;
    },
    bufets_put_success(state, bufets) {
      state.status = "put operation success";
      state.loading = false;
    },
    bufets_delete_success(state, bufets) {
      state.status = "delete operation success";
      state.loading = false;
    },

    bufets_error(state) {
      state.status = "error";
      state.loading = false;
    },

    //selectedRows
    set_selected_rows(state, selectedRows) {
      state.selectedRows = selectedRows;
      state.status = "selected rows";
    }
    //
  },
  actions: {
    getBufets({ commit }) {
      return new Promise((resolve, reject) => {
        commit("bufets_get");
        axios({ url: "/bufet", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            for (var i = 0; i < resp.data.bufets.length; i++) {
              resp.data.bufets[i].cena =
                resp.data.bufets[i].cena.$numberDecimal;
            }
            commit("bufets_get_success", resp.data.bufets);
            resolve(resp.data.bufets);
          })
          .catch(err => {
            commit("bufets_error");
            reject(err);
          });
      });
    },
    postBufet({ commit }, newBufet) {
      return new Promise((resolve, reject) => {
        commit("bufets_post");
        axios({ url: "/bufet", method: "POST", data: newBufet })
          .then(resp => {
            commit("bufets_post_success");
            resolve();
          })
          .catch(err => {
            commit("bufets_error");
            reject(err);
          });
      });
    },
    putBufet({ commit }, editBufet) {
      return new Promise((resolve, reject) => {
        commit("bufets_put");
        axios({ url: "/bufet", method: "PUT", data: editBufet })
          .then(resp => {
            commit("bufets_put_success");
            resolve();
          })
          .catch(err => {
            commit("bufets_error");
            reject(err);
          });
      });
    },
    deleteBufet({ commit }, deleteBufet) {
      return new Promise((resolve, reject) => {
        commit("bufets_delete");
        axios({ url: "/bufet", method: "DELETE", data: deleteBufet })
          .then(resp => {
            commit("bufets_delete_success");
            resolve();
          })
          .catch(err => {
            commit("bufets_error");
            reject(err);
          });
      });
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getBufets: state => state.bufets,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status
  }
};
