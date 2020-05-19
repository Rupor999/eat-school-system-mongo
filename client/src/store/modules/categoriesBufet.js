import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 5,
      headers: [
        { text: "id", align: "center", sortable: false, value: "_id" },
        { text: "Название категории", align: "left", value: "kategoriya" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    categoriesBufet: [],
    selectedRows: [],
    filter_values: {
      kategoriya: ""
    }
  },
  mutations: {
    categoriesBufet_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    categoriesBufet_put(state, categoriesBufet) {
      state.status = "put operation";
      state.loading = true;
    },
    categoriesBufet_delete(state, categoriesBufet) {
      state.status = "delete operation";
      state.loading = true;
    },

    categoriesBufet_get_success(state, categoriesBufet) {
      state.status = "get categoriesBufet success";
      state.categoriesBufet = categoriesBufet;
      state.loading = false;
    },
    categoriesBufet_put_success(state, categoriesBufet) {
      state.status = "put operation success";
      state.loading = false;
    },
    categoriesBufet_delete_success(state, categoriesBufet) {
      state.status = "delete operation success";
      state.loading = false;
    },

    categoriesBufet_error(state) {
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
    setKategoriyaFilter(state, prop) {
      state.filter_values.kategoriya = prop;
      state.status = "change Kategoriya params";
    }
  },
  actions: {
    getCategoriesBufet({ commit }) {
      return new Promise((resolve, reject) => {
        commit("categoriesBufet_get");
        axios({ url: "/categoriesBufet", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            commit("categoriesBufet_get_success", resp.data.categoriesBufet);
            resolve(resp.data.categoriesBufet);
          })
          .catch(err => {
            commit("categoriesBufet_error");
            reject(err);
          });
      });
    },
    putCategoriesBufet({ commit }) {
      commit("categoriesBufet_put");
      axios({ url });
    },
    deleteCategoriesBufet({ commit }) {
      commit("categoriesBufet_delete");
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setKategoriyaFilter", values.kategoriya);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getCategoriesBufet: state => state.categoriesBufet,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
