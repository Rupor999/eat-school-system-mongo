import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "center", sortable: false, value: "_id" },
        { text: "Регион", align: "left", value: "region" },
        { text: "Название города", align: "left", value: "city_name" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    cities: [],
    selectedRows: [],
    filter_values: {
      region: "",
      city_name: ""
    }
  },
  mutations: {
    cities_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    cities_post(state) {
      state.status = "post operation";
      state.loading = true;
    },
    cities_put(state, cities) {
      state.status = "put operation";
      state.loading = true;
    },
    cities_delete(state, cities) {
      state.status = "delete operation";
      state.loading = true;
    },

    cities_get_success(state, cities) {
      state.status = "get cities success";
      state.cities = cities;
      state.loading = false;
    },
    cities_post_success(state) {
      state.status = "post operation success";
      state.loading = false;
    },
    cities_put_success(state, cities) {
      state.status = "put operation success";
      state.loading = false;
    },
    cities_delete_success(state, cities) {
      state.status = "delete operation success";
      state.loading = false;
    },

    cities_error(state) {
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
    setRegionFilter(state, prop) {
      state.filter_values.region = prop;
      state.status = "change RegionFilter params";
    },
    setCityNameFilter(state, prop) {
      state.filter_values.city_name = prop;
      state.status = "change CityName params";
    }
  },
  actions: {
    getCities({ commit }) {
      return new Promise((resolve, reject) => {
        commit("cities_get");
        axios({ url: "/city", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            commit("cities_get_success", resp.data.cities);
            resolve(resp.data.cities);
          })
          .catch(err => {
            commit("cities_error");
            reject(err);
          });
      });
    },
    postCity({ commit }, newCity) {
      return new Promise((resolve, reject) => {
        commit("cities_post");
        axios({ url: "/city", method: "POST", data: newCity })
          .then(resp => {
            commit("cities_post_success");
            resolve();
          })
          .catch(err => {
            commit("cities_error");
            reject(err);
          });
      });
    },
    putCity({ commit }, editCity) {
      return new Promise((resolve, reject) => {
        commit("cities_put");
        axios({ url: "/city", method: "PUT", data: editCity })
          .then(resp => {
            commit("cities_put_success");
            resolve();
          })
          .catch(err => {
            commit("cities_error");
            reject(err);
          });
      });
    },
    deleteCity({ commit }, deleteCity) {
      return new Promise((resolve, reject) => {
        commit("cities_delete");
        axios({ url: "/city", method: "DELETE", data: deleteCity })
          .then(resp => {
            commit("cities_delete_success");
            resolve();
          })
          .catch(err => {
            commit("cities_error");
            reject(err);
          });
      });
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setRegionFilter", values.region);
      commit("setCityNameFilter", values.city_name);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getCities: state => state.cities,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
