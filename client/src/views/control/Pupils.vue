<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Ученики
        </h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="item in tab_items" :key="item">
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-expansion-panels inset>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <v-row justify="space-around">
                        Фильтр учеников
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="pupilFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <pupilsTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getPupils" color="primary"
                    >Обновить данные</v-btn
                  >
                  <pupilsAction
                    actionName="pupilAction"
                    v-if="pupilsActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <pupilForm
              formName="pupilForm"
              v-if="newData.length > 0"
              v-for="(item, index) in newData"
              v-bind:key="index"
              v-bind:inputData="item"
            >
              <template>
                <v-btn @click="newData.splice(index, 1)" icon color="error"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </template>
            </pupilForm>
            <v-row class="d-flex justify-space-around">
              <v-btn class="ma-4" @click="addNewItem">Добавить</v-btn>
              <v-btn
                v-show="newData.length"
                class="ma-4 error"
                @click="newData = []"
                >Удалить все формы</v-btn
              >
              <saveLoading
                v-if="newData.length > 0"
                v-bind:inputData="newData"
              />
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import pupilsTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import pupilForm from "@/components/forms/forms";
import pupilsAction from "@/components/tables/actions/actions";
import saveLoading from "@/components/forms/modalWindow/pupilForm/saveLoading";

export default {
  components: {
    pupilsTable,
    filterTable,
    pupilForm,
    pupilsAction,
    saveLoading
  },
  mounted() {
    this.$store
      .dispatch("pupils/getPupils")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("schools/getSchools")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      tab: null,
      tab_items: ["Список учеников", "Добавить нового ученика"],
      newData: []
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["pupils/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["pupils/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["pupils/getPupils"];
    },
    loading: function() {
      return this.$store.getters["pupils/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["pupils/getStatus"] === "error") {
        this.$store.dispatch("snackbar/activate", {
          text: "Ошибка",
          color: "error"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
      }
    },
    filterData: function() {
      let value = this.$store.getters["pupils/getPupils"];
      let filter_values = this.$store.getters["pupils/getFilterValues"];

      return value.filter(item => {
        let id_school = item.id_school + "";
        let cifra_kl = item.cifra_kl + "";
        let bukva_kl = item.bukva_kl + "";
        let familia = item.familia + "";
        let imya = item.imya + "";
        let otchestvo = item.otchestvo + "";
        let pol = item.pol + "";
        let mehanizm = item.mehanizm + "";
        let goryachee_pitanie = item.goryachee_pitanie + "";
        let bufet = item.bufet + "";
        let udalenniy = item.udalenniy + "";

        if (
          id_school
            .toLowerCase()
            .indexOf(filter_values.id_school.toLowerCase()) != -1 &&
          cifra_kl
            .toLowerCase()
            .indexOf(filter_values.cifra_kl.toLowerCase()) != -1 &&
          bukva_kl
            .toLowerCase()
            .indexOf(filter_values.bukva_kl.toLowerCase()) != -1 &&
          familia.toLowerCase().indexOf(filter_values.familia.toLowerCase()) !=
            -1 &&
          imya.toLowerCase().indexOf(filter_values.imya.toLowerCase()) != -1 &&
          otchestvo
            .toLowerCase()
            .indexOf(filter_values.otchestvo.toLowerCase()) != -1 &&
          pol.toLowerCase().indexOf(filter_values.pol.toLowerCase()) != -1 &&
          mehanizm
            .toLowerCase()
            .indexOf(filter_values.mehanizm.toLowerCase()) != -1 &&
          goryachee_pitanie
            .toLowerCase()
            .indexOf(filter_values.goryachee_pitanie.toLowerCase()) != -1 &&
          bufet.toLowerCase().indexOf(filter_values.bufet.toLowerCase()) !=
            -1 &&
          udalenniy
            .toLowerCase()
            .indexOf(filter_values.udalenniy.toLowerCase()) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    pupilsActionsShow() {
      return this.$store.getters["pupils/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getPupils: function() {
      this.$store
        .dispatch("pupils/getPupils")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("pupils/setSelectedRows", data);
    },
    addNewItem() {
      this.newData.push({
        id_school: "",
        cifra_kl: "",
        bukva_kl: "",
        familia: "",
        imya: "",
        otchestvo: "",
        pol: "",
        mehanizm: "",
        goryachee_pitanie: "",
        bufet: ""
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
