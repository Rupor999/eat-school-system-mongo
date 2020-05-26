import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "center", sortable: false, value: "_id" },
        { text: "Город", align: "left", value: "city_id" },
        { text: "Название КШП", align: "left", value: "kombinat" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    kshps: [],
    selectedRows: [],
    filter_values: {
      city_id: "",
      kombinat: ""
    }
  },
  mutations: {
    kshps_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    kshps_post(state) {
      state.status = "post operation";
      state.loading = true;
    },
    kshps_put(state, kshps) {
      state.status = "put operation";
      state.loading = true;
    },
    kshps_delete(state, kshps) {
      state.status = "delete operation";
      state.loading = true;
    },

    kshps_get_success(state, kshps) {
      state.status = "get kshps success";
      state.kshps = kshps;
      state.loading = false;
    },
    kshps_post_success(state) {
      state.status = "post operation success";
      state.loading = false;
    },
    kshps_put_success(state, kshps) {
      state.status = "put operation success";
      state.loading = false;
    },
    kshps_delete_success(state, kshps) {
      state.status = "delete operation success";
      state.loading = false;
    },

    kshps_error(state) {
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
    setCityIdFilter(state, prop) {
      state.filter_values.city_id = prop;
      state.status = "change CityId params";
    },
    setKombinatFilter(state, prop) {
      state.filter_values.kombinat = prop;
      state.status = "change Kombinat params";
    }
  },
  actions: {
    getKshps({ commit }) {
      return new Promise((resolve, reject) => {
        commit("kshps_get");
        axios({ url: "/kshp", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            commit("kshps_get_success", resp.data.kshps);
            resolve(resp.data.kshps);
          })
          .catch(err => {
            commit("kshps_error");
            reject(err);
          });
      });
    },
    postKshp({ commit }, newKshp) {
      return new Promise((resolve, reject) => {
        commit("kshps_post");
        axios({ url: "/kshp", method: "POST", data: newKshp })
          .then(resp => {
            commit("kshps_post_success");
            resolve();
          })
          .catch(err => {
            commit("kshps_error");
            reject(err);
          });
      });
    },
    putKshp({ commit }, editKshp) {
      return new Promise((resolve, reject) => {
        commit("kshps_put");
        axios({ url: "/kshp", method: "PUT", data: editKshp })
          .then(resp => {
            commit("kshps_put_success");
            resolve();
          })
          .catch(err => {
            commit("kshps_error");
            reject(err);
          });
      });
    },
    deleteKshp({ commit }, deleteKshp) {
      return new Promise((resolve, reject) => {
        commit("kshps_delete");
        axios({ url: "/kshp", method: "DELETE", data: deleteKshp })
          .then(resp => {
            commit("kshps_delete_success");
            resolve();
          })
          .catch(err => {
            commit("kshps_error");
            reject(err);
          });
      });
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setCityIdFilter", values.city_id);
      commit("setKombinatFilter", values.kombinat);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getKshps: state => state.kshps,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
