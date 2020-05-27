import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    //start table_settings
    tableSettings: {
      itemsPerPage: 10,
      headers: [
        { text: "id", align: "left", sortable: false, value: "_id" },
        { text: "id ученика", value: "id_uchenik" },
        { text: "id учереждения", value: "id_school" },
        { text: "Цифра класса", value: "cifra_kl" },
        { text: "Буква класса", value: "bukva_kl" },
        { text: "Фамилия", value: "familia" },
        { text: "Имя", value: "imya" },
        { text: "Отчество", value: "otchestvo" },
        { text: "Пол", value: "pol" },
        { text: "Механизм", value: "mehanizm" },
        { text: "Разрешение ГП", value: "goryachee_pitanie" },
        { text: "Разрешение буфет", value: "bufet" },
        { text: "Баланс ГП", value: "balans_gp" },
        { text: "Баланс буфета", value: "balans_bufet" },
        { text: "Удален?", value: "udalenniy" },
        { text: "Чип-карта", value: "chip_karty" },
        { text: "Примечание", value: "primechanie" }
      ]
    },
    //end table_settings
    status: "",
    loading: false,
    pupils: [],
    selectedRows: [],
    filter_values: {
      id_school: "",
      cifra_kl: "",
      bukva_kl: "",
      familia: "",
      imya: "",
      otchestvo: "",
      pol: "",
      mehanizm: "",
      goryachee_pitanie: "",
      bufet: "",
      udalenniy: ""
    }
  },
  mutations: {
    pupils_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    pupils_post(state) {
      state.status = "post operation";
      state.loading = true;
    },
    pupils_put(state, pupils) {
      state.status = "put operation";
      state.loading = true;
    },
    pupils_delete(state, pupils) {
      state.status = "delete operation";
      state.loading = true;
    },
    pupils_post_pay(state, pupils) {
      state.status = "pay operation";
      state.loading = true;
    },

    pupils_get_success(state, pupils) {
      state.status = "get pupils success";
      state.pupils = pupils;
      state.loading = false;
    },
    pupils_post_success(state) {
      state.status = "post operation success";
      state.loading = false;
    },
    pupils_put_success(state) {
      state.status = "put operation success";
      state.loading = false;
    },
    pupils_delete_success(state) {
      state.status = "delete operation success";
      state.loading = false;
    },
    pupils_post_pay_success(state) {
      state.status = "post pay operation success";
      state.loading = false;
    },

    pupils_error(state) {
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

    ////
    //filter
    setIdSchoolFilter(state, prop) {
      state.filter_values.id_school = prop;
      state.status = "change IdSchoolFilter params";
    },
    setCifraKlFilter(state, prop) {
      state.filter_values.cifra_kl = prop;
      state.status = "change CifraKlFilter params";
    },
    setBukvaKlFilter(state, prop) {
      state.filter_values.bukva_kl = prop;
      state.status = "change BukvaKlFilter params";
    },
    setFamiliaFilter(state, prop) {
      state.filter_values.familia = prop;
      state.status = "change FamiliaFilter params";
    },
    setImyaFilter(state, prop) {
      state.filter_values.imya = prop;
      state.status = "change ImyaFilter params";
    },
    setOtchestvoFilter(state, prop) {
      state.filter_values.otchestvo = prop;
      state.status = "change OtchestvoFilter params";
    },
    setPolFilter(state, prop) {
      state.filter_values.pol = prop;
      state.status = "change PolFilter params";
    },
    setMehanizmFilter(state, prop) {
      state.filter_values.mehanizm = prop;
      state.status = "change MehanizmFilter params";
    },
    setGoryacheePitanieFilter(state, prop) {
      state.filter_values.goryachee_pitanie = prop;
      state.status = "change GoryacheePitanieFilter params";
    },
    setBufetFilter(state, prop) {
      state.filter_values.bufet = prop;
      state.status = "change BufetFilter params";
    },
    setUdalenniyFilter(state, prop) {
      state.filter_values.udalenniy = prop;
      state.status = "change UdalenniyFilter params";
    }
    //
  },
  actions: {
    getPupils({ commit }) {
      return new Promise((resolve, reject) => {
        commit("pupils_get");
        axios({ url: "/pupil", method: "GET" })
          .then(resp => {
            console.log(resp.data);
            for (var i = 0; i < resp.data.pupils.length; i++) {
              resp.data.pupils[i].balans_gp =
                resp.data.pupils[i].balans_gp.$numberDecimal;
              resp.data.pupils[i].balans_bufet =
                resp.data.pupils[i].balans_bufet.$numberDecimal;
            }
            commit("pupils_get_success", resp.data.pupils);
            resolve(resp.data.pupils);
          })
          .catch(err => {
            commit("pupils_error");
            reject(err);
          });
      });
    },
    postPupil({ commit }, newPupil) {
      return new Promise((resolve, reject) => {
        commit("pupils_post");
        axios({ url: "/pupil", method: "POST", data: newPupil })
          .then(resp => {
            commit("pupils_post_success");
            resolve();
          })
          .catch(err => {
            commit("pupils_error");
            reject(err);
          });
      });
    },
    putPupil({ commit }, editPupil) {
      return new Promise((resolve, reject) => {
        commit("pupils_put");
        axios({ url: "/pupil", method: "PUT", data: editPupil })
          .then(resp => {
            commit("pupils_put_success");
            resolve();
          })
          .catch(err => {
            commit("pupils_error");
            reject(err);
          });
      });
    },
    deletePupil({ commit }, deletePupil) {
      return new Promise((resolve, reject) => {
        commit("pupils_delete");
        axios({ url: "/pupil", method: "DELETE", data: deletePupil })
          .then(resp => {
            commit("pupils_delete_success");
            resolve();
          })
          .catch(err => {
            commit("pupils_error");
            reject(err);
          });
      });
    },
    postPayPupil({ commit }, pupilInfo) {
      return new Promise((resolve, reject) => {
        commit("pupils_post_pay");
        axios({ url: "/pay", method: "POST", data: pupilInfo })
          .then(resp => {
            commit("pupils_post_pay_success");
            resolve();
          })
          .catch(err => {
            commit("pupils_error");
            reject(err);
          });
      });
    },

    setSelectedRows({ commit }, selectedRows) {
      commit("set_selected_rows", selectedRows);
    },

    //filter
    setFilterValue({ commit }, values) {
      commit("setIdSchoolFilter", values.id_school);
      commit("setCifraKlFilter", values.cifra_kl);
      commit("setBukvaKlFilter", values.bukva_kl);
      commit("setFamiliaFilter", values.familia);
      commit("setImyaFilter", values.imya);
      commit("setOtchestvoFilter", values.otchestvo);
      commit("setPolFilter", values.pol);
      commit("setMehanizmFilter", values.mehanizm);
      commit("setGoryacheePitanieFilter", values.goryachee_pitanie);
      commit("setBufetFilter", values.bufet);
      commit("setUdalenniyFilter", values.udalenniy);
    }
  },
  getters: {
    getTableSettings: state => state.tableSettings,
    getPupils: state => state.pupils,
    getSelectedRows: state => state.selectedRows,
    getLoading: state => state.loading,
    getStatus: state => state.status,
    getFilterValues: state => state.filter_values
  }
};
