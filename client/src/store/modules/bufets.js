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
        { text: "Цена", value: "cena.$numberDecimal" }
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
            commit("bufets_get_success", resp.data.bufets);
            resolve(resp.data.bufets);
          })
          .catch(err => {
            commit("bufets_error");
            reject(err);
          });
      });
    },
    putBufets({ commit }) {
      commit("bufets_put");
      axios({ url });
    },
    deleteBufets({ commit }) {
      commit("bufets_delete");
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
