<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Категории буфета
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
                        Фильтр категорий
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="categoriesBufetFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <categoriesBufetTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getCategoriesBufet" color="primary"
                    >Получить данные</v-btn
                  >
                  <categoriesBufetAction
                    actionName="categoriesBufetAction"
                    v-show="categoriesBufetActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <categoriesBufetForm
              formName="categoriesBufetForm"
              v-if="newData.length > 0"
              v-for="(item, index) in newData"
              v-bind:key="index"
              v-bind:inputData="item"
            />
            <v-row class="d-flex justify-space-around">
              <v-btn class="ma-4" @click="addNewItem">Добавить</v-btn>
              <v-btn
                v-show="newData.length"
                class="ma-4 error"
                @click="newData = []"
                >Удалить все формы</v-btn
              >

              <v-btn v-if="newData.length > 0" class="ma-4" color="primary"
                >Сохранить</v-btn
              >
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import categoriesBufetTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import categoriesBufetForm from "@/components/forms/forms";
import categoriesBufetAction from "@/components/tables/actions/actions";

export default {
  components: {
    categoriesBufetTable,
    filterTable,
    categoriesBufetForm,
    categoriesBufetAction
  },
  data() {
    return {
      tab: null,
      tab_items: ["Список категорий", "Добавить новую категорию"],
      newData: []
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["categoriesBufet/getTableSettings"]
        .itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["categoriesBufet/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["categoriesBufet/getCategoriesBufet"];
    },
    loading: function() {
      return this.$store.getters["categoriesBufet/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["categoriesBufet/getStatus"] === "error") {
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
      let value = this.$store.getters["categoriesBufet/getCategoriesBufet"];
      let filter_values = this.$store.getters[
        "categoriesBufet/getFilterValues"
      ];

      return value.filter(item => {
        let kategoriya = item.kategoriya + "";

        if (
          kategoriya
            .toLowerCase()
            .indexOf(filter_values.kategoriya.toLowerCase()) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    categoriesBufetActionsShow() {
      return this.$store.getters["categoriesBufet/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getCategoriesBufet: function() {
      this.$store
        .dispatch("categoriesBufet/getCategoriesBufet")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("categoriesBufet/setSelectedRows", data);
    },
    addNewItem() {
      this.newData.push({ kategoriya: "" });
    }
  }
};
</script>

<style lang="css" scoped></style>
