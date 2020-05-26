<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Комбинаты школьного питания
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
                        Фильтр КШП
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="kshpFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <kshpsTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getKshps" color="primary"
                    >Обновить данные</v-btn
                  >
                  <kshpsAction
                    actionName="kshpAction"
                    v-if="kshpsActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <kshpForm
              formName="kshpForm"
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
            </kshpForm>
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
import kshpsTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import kshpForm from "@/components/forms/forms";
import kshpsAction from "@/components/tables/actions/actions";
import saveLoading from "@/components/forms/modalWindow/kshpForm/saveLoading";

export default {
  components: {
    kshpsTable,
    filterTable,
    kshpForm,
    kshpsAction,
    saveLoading
  },
  data() {
    return {
      tab: null,
      tab_items: ["Список КШП", "Добавить новый КШП"],
      newData: []
    };
  },
  mounted() {
    //получаем города для фильтра и формы
    this.$store
      .dispatch("kshps/getKshps")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("cities/getCities")
      .then(() => {})
      .catch(err => console.log(err));
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["kshps/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["kshps/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["kshps/getKshps"];
    },
    loading: function() {
      return this.$store.getters["kshps/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["kshps/getStatus"] === "error") {
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
      let value = this.$store.getters["kshps/getKshps"];
      let filter_values = this.$store.getters["kshps/getFilterValues"];

      return value.filter(item => {
        let city_id = item.city_id + "";
        let kombinat = item.kombinat + "";

        if (
          city_id.toLowerCase().indexOf(filter_values.city_id.toLowerCase()) !=
            -1 &&
          kombinat
            .toLowerCase()
            .indexOf(filter_values.kombinat.toLowerCase()) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    kshpsActionsShow() {
      return this.$store.getters["kshps/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getKshps: function() {
      this.$store
        .dispatch("kshps/getKshps")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("kshps/setSelectedRows", data);
    },
    addNewItem() {
      this.newData.push({ city_id: "", kombinat: "" });
    }
  }
};
</script>

<style lang="css" scoped></style>
