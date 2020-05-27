import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "center", sortable: false, value: "_id" },
        { text: "id ученика", align: "left", value: "id_uchenik" },
        { text: "Вид питания", align: "left", value: "vid_pitania" },
        { text: "Дата/Время", align: "left", value: "data_spisania" },
        {
          text: "Название продукции",
          align: "left",
          value: "id_bufet.naimenovanie"
        },
        { text: "Цена", align: "left", value: "id_bufet.cena.$numberDecimal" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    rashodovano: []
    // selectedRows: [],
    // filter_values: {
    //   id_city: "",
    //   id_kshp: "",
    //   school_name: ""
    // }
  },
  mutations: {
    rashodovano_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    // schools_post(state) {
    //   state.status = "post operation";
    //   state.loading = true;
    // },
    // schools_put(state, schools) {
    //   state.status = "put operation";
    //   state.loading = true;
    // },
    // schools_delete(state, schools) {
    //   state.status = "delete operation";
    //   state.loading = true;
    // },

    rashodovano_get_success(state, rashodovano) {
      state.status = "get rashodovano success";
      state.rashodovano = rashodovano;
      state.loading = false;
    },
    // schools_post_success(state) {
    //   state.status = "post operation success";
    //   state.loading = false;
    // },
    // schools_put_success(state, schools) {
    //   state.status = "put operation success";
    //   state.loading = false;
    // },
    // schools_delete_success(state, schools) {
    //   state.status = "delete operation success";
    //   state.loading = false;
    // },

    rashodovano_error(state) {
      state.status = "error";
      state.loading = false;
    },
    ////
    //selectedRows
    set_selected_rows(state, selectedRows) {
      state.selectedRows = selectedRows;
      state.status = "selected rows";
    }
    //
    //filter
    // setIdGorodFilter(state, prop) {
    //   state.filter_values.id_city = prop;
    //   state.status = "change IdGorod params";
    // },
    // setIdKshpFilter(state, prop) {
    //   state.filter_values.id_kshp = prop;
    //   state.status = "change IdKshp params";
    // },
    // setSchoolNameFilter(state, prop) {
    //   state.filter_values.school_name = prop;
    //   state.status = "change SchoolName params";
    // }
  },
  actions: {
    getRashodovano({ commit }) {
      return new Promise((resolve, reject) => {
        commit("rashodovano_get");
        axios({ url: "/rashodovano", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            for (var i = 0; i < resp.data.rashodovano.length; i++) {
              resp.data.rashodovano[i].data_spisania = fixDataTime(
                resp.data.rashodovano[i].data_spisania
              );
            }
            commit("rashodovano_get_success", resp.data.rashodovano);
            resolve(resp.data.rashodovano);
          })
          .catch(err => {
            commit("rashodovano_error");
            reject(err);
          });
      });
    },
    // postSchool({ commit }, newSchool) {
    //   return new Promise((resolve, reject) => {
    //     commit("schools_post");
    //     axios({ url: "/school", method: "POST", data: newSchool })
    //       .then(resp => {
    //         commit("schools_post_success");
    //         resolve();
    //       })
    //       .catch(err => {
    //         commit("schools_error");
    //         reject(err);
    //       });
    //   });
    // },
    // putSchool({ commit }, editSchool) {
    //   return new Promise((resolve, reject) => {
    //     commit("schools_put");
    //     axios({ url: "/school", method: "PUT", data: editSchool })
    //       .then(resp => {
    //         commit("schools_put_success");
    //         resolve();
    //       })
    //       .catch(err => {
    //         commit("schools_error");
    //         reject(err);
    //       });
    //   });
    // },
    // deleteSchool({ commit }, deleteSchool) {
    //   return new Promise((resolve, reject) => {
    //     commit("schools_delete");
    //     axios({ url: "/school", method: "DELETE", data: deleteSchool })
    //       .then(resp => {
    //         commit("schools_delete_success");
    //         resolve();
    //       })
    //       .catch(err => {
    //         commit("schools_error");
    //         reject(err);
    //       });
    //   });
    // },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    }

    //filter
    // setFilterValue({ commit }, values) {
    //   commit("setIdGorodFilter", values.id_city);
    //   commit("setIdKshpFilter", values.id_kshp);
    //   commit("setSchoolNameFilter", values.school_name);
    // }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getRashodovano: state => state.rashodovano,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status
    // getFilterValues: state => state.filter_values
  }
};

function fixDataTime(dataTime) {
  return dataTime.slice(0, 10) + "/" + dataTime.slice(11, 19);
}
