import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 5,
      headers: [
        { text: "id", align: "center", sortable: false, value: "_id" },
        { text: "Город", align: "left", value: "id_city" },
        { text: "Комбинат", align: "left", value: "id_kshp" },
        { text: "Название школы", align: "left", value: "school_name" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    schools: [],
    selectedRows: [],
    filter_values: {
      id_city: "",
      id_kshp: "",
      school_name: ""
    }
  },
  mutations: {
    schools_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    schools_put(state, schools) {
      state.status = "put operation";
      state.loading = true;
    },
    schools_delete(state, schools) {
      state.status = "delete operation";
      state.loading = true;
    },

    schools_get_success(state, schools) {
      state.status = "get schools success";
      state.schools = schools;
      state.loading = false;
    },
    schools_put_success(state, schools) {
      state.status = "put operation success";
      state.loading = false;
    },
    schools_delete_success(state, schools) {
      state.status = "delete operation success";
      state.loading = false;
    },

    schools_error(state) {
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
    setIdGorodFilter(state, prop) {
      state.filter_values.id_city = prop;
      state.status = "change IdGorod params";
    },
    setIdKshpFilter(state, prop) {
      state.filter_values.id_kshp = prop;
      state.status = "change IdKshp params";
    },
    setSchoolNameFilter(state, prop) {
      state.filter_values.school_name = prop;
      state.status = "change SchoolName params";
    }
  },
  actions: {
    getSchools({ commit }) {
      return new Promise((resolve, reject) => {
        commit("schools_get");
        axios({ url: "/school", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            commit("schools_get_success", resp.data.schools);
            resolve(resp.data.schools);
          })
          .catch(err => {
            commit("schools_error");
            reject(err);
          });
      });
    },
    putSchools({ commit }) {
      commit("schools_put");
      axios({ url });
    },
    deleteSchools({ commit }) {
      commit("schools_delete");
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setIdGorodFilter", values.id_city);
      commit("setIdKshpFilter", values.id_kshp);
      commit("setSchoolNameFilter", values.school_name);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getSchools: state => state.schools,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
