<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Города
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
                        Фильтр городов
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="cityFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <citiesTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getCities" color="primary"
                    >Получить данные</v-btn
                  >
                  <citiesAction
                    actionName="cityAction"
                    v-if="citiesActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <cityForm
              formName="cityForm"
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
            </cityForm>
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
import citiesTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import cityForm from "@/components/forms/forms";
import citiesAction from "@/components/tables/actions/actions";
import saveLoading from "@/components/forms/modalWindow/cityForm/saveLoading";

export default {
  components: {
    citiesTable,
    filterTable,
    cityForm,
    citiesAction,
    saveLoading
  },
  mounted() {
    this.$store
      .dispatch("cities/getCities")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      tab: null,
      tab_items: ["Список городов", "Добавить новый город"],
      newData: []
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["cities/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["cities/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["cities/getCities"];
    },
    loading: function() {
      return this.$store.getters["cities/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["cities/getStatus"] === "error") {
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
      let value = this.$store.getters["cities/getCities"];
      let filter_values = this.$store.getters["cities/getFilterValues"];

      return value.filter(item => {
        let region = item.region + "";
        let city_name = item.city_name + "";

        if (
          region.toLowerCase().indexOf(filter_values.region.toLowerCase()) !=
            -1 &&
          city_name
            .toLowerCase()
            .indexOf(filter_values.city_name.toLowerCase()) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    citiesActionsShow() {
      return this.$store.getters["cities/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getCities: function() {
      this.$store
        .dispatch("cities/getCities")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("cities/setSelectedRows", data);
    },
    addNewItem() {
      this.newData.push({ region: "", city_name: "" });
    }
  }
};
</script>

<style lang="css" scoped></style>
