import Vue from "vue";
import Router from "vue-router";
import store from "./store";

//begin navbar
import NavbarIndex from "@/components/menu/IndexMenu";
import NavbarControl from "@/components/menu/ControlMenu";
import NavbarControl2 from "@/components/menu/ControlMenu2";
//end navbar

//begin index
import Index from "./views/Index.vue";
//
import Begin from "./views/index/Begin.vue";
import Parents from "./views/index/Parents.vue";
import School from "./views/index/School.vue";
import Kshp from "./views/index/Kshp.vue";
import Aboutus from "./views/index/Aboutus.vue";
import Question from "./views/index/Question.vue";
import Login from "./views/index/Login.vue";
//end index

//begin control
import Control from "./views/Control.vue";
import ControlIndex from "./views/control/ControlIndex.vue";
//
import Users from "./views/control/Users.vue";
import Bufet from "./views/control/Bufet.vue";
import Pupils from "./views/control/Pupils.vue";
import Cities from "./views/control/Cities.vue";
import Kshps from "./views/control/Kshps.vue";
import CategoriesBufet from "./views/control/CategoriesBufet.vue";
import Schools from "./views/control/Schools.vue";
import Mykids from "./views/control/Mykids.vue";
import ExpensesAndReplenishment from "./views/control/expensesAndReplenishment.vue";
import Statistic from "./views/control/Statistic.vue";
import Chat from "./views/control/Chat.vue";
//end control

//begin errors
import Page404 from "./views/errors/Page404.vue";
//end errors

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // name: "index",
      components: {
        default: Index,
        navbar: NavbarIndex
      },

      children: [
        {
          path: "/",
          name: "index",
          component: Begin
        },
        {
          path: "parents",
          component: Parents
        },
        {
          path: "school",
          component: School
        },
        {
          path: "kshp",
          component: Kshp
        },
        {
          path: "aboutus",
          component: Aboutus
        },
        {
          path: "question",
          component: Question
        },
        {
          path: "login",
          name: "login",
          component: Login
        }
      ]
    },
    {
      path: "/control",
      // name: "control",
      components: {
        default: Control,
        navbar: NavbarControl2
      },
      meta: {
        // requiresAuth: true
      },
      children: [
        {
          path: "/",
          name: "control",
          component: ControlIndex
        },
        {
          path: "users",
          name: "users",
          component: Users
        },
        {
          path: "bufet",
          name: "bufet",
          component: Bufet
        },
        {
          path: "pupils",
          name: "pupils",
          component: Pupils
        },
        {
          path: "cities",
          name: "cities",
          component: Cities
        },
        {
          path: "kshps",
          name: "kshps",
          component: Kshps
        },
        {
          path: "categoriesbufet",
          name: "categoriesbufet",
          component: CategoriesBufet
        },
        {
          path: "schools",
          name: "schools",
          component: Schools
        },
        {
          path: "mykids",
          name: "mykids",
          component: Mykids
        },
        {
          path: "expensesandreplenishment",
          name: "expensesandreplenishment",
          component: ExpensesAndReplenishment
        },
        {
          path: "statistic",
          name: "statistic",
          component: Statistic
        },
        {
          path: "chat",
          name: "chat",
          component: Chat
        }
      ]
    },
    {
      path: "*",
      name: "page404",
      component: Page404
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
