import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import users from "./modules/users";
import snackbar from "./modules/snackbar";
import bufets from "./modules/bufets";
import pupils from "./modules/pupils";
import cities from "./modules/cities";
import kshps from "./modules/kshps";
import categoriesBufet from "./modules/categoriesBufet";
import schools from "./modules/schools";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    snackbar,
    bufets,
    pupils,
    cities,
    kshps,
    categoriesBufet,
    schools
  }
});
