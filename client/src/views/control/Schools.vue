<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Школы
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
                        Фильтр школ
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="schoolFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <schoolsTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getSchools" color="primary"
                    >Обновить данные</v-btn
                  >
                  <schoolsAction
                    actionName="schoolAction"
                    v-if="schoolsActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <schoolForm
              formName="schoolForm"
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
            </schoolForm>
            <v-row class="d-flex justify-space-around">
              <v-btn class="ma-4" @click="addNewItem">Добавить</v-btn>
              <v-btn
                v-show="newData.length"
                class="ma-4 error"
                @click="newData = []"
                >Удалить все формы</v-btn
              >

              <saveLoading v-show="newData.length" v-bind:inputData="newData" />
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import schoolsTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import schoolForm from "@/components/forms/forms";
import schoolsAction from "@/components/tables/actions/actions";
import saveLoading from "@/components/forms/modalWindow/schoolForm/saveLoading";

export default {
  components: {
    schoolsTable,
    filterTable,
    schoolForm,
    schoolsAction,
    saveLoading
  },
  mounted() {
    //получаем города и КШП для фильтра и формы
    this.$store
      .dispatch("schools/getSchools")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("cities/getCities")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("kshps/getKshps")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      tab: null,
      tab_items: ["Список школ", "Добавить новую школу"],
      newData: []
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["schools/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["schools/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["schools/getSchools"];
    },
    loading: function() {
      return this.$store.getters["schools/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["schools/getStatus"] === "error") {
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
      let value = this.$store.getters["schools/getSchools"];
      let filter_values = this.$store.getters["schools/getFilterValues"];

      return value.filter(item => {
        let id_city = item.id_city + "";
        let id_kshp = item.id_kshp + "";
        let school_name = item.school_name + "";

        if (
          id_city.toLowerCase().indexOf(filter_values.id_city.toLowerCase()) !=
            -1 &&
          id_kshp.toLowerCase().indexOf(filter_values.id_kshp.toLowerCase()) !=
            -1 &&
          school_name
            .toLowerCase()
            .indexOf(filter_values.school_name.toLowerCase()) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    schoolsActionsShow() {
      return this.$store.getters["schools/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getSchools: function() {
      this.$store
        .dispatch("schools/getSchools")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("schools/setSelectedRows", data);
    },
    addNewItem() {
      this.newData.push({ id_city: "", id_kshp: "", school_name: "" });
    }
  }
};
</script>

<style lang="css" scoped></style>
