<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Буфет
        </h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="item in tab_items" :key="item">
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1"
                  >Выбор города</v-stepper-step
                >
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2"
                  >Выбор КШП</v-stepper-step
                >
                <v-divider></v-divider>
                <v-stepper-step step="3">Выбор школы</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card>
                    <v-card-title primary-title>
                      Выбор города
                    </v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="selected_city"
                        :items="citiesData"
                        label="Выберите город"
                        item-text="city_name"
                        item-value="_id"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        :disabled="selected_city == 0"
                        color="primary"
                        @click="e1 = 2"
                      >
                        Продолжить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card>
                    <v-card-title primary-title>
                      Выбор КШП
                    </v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="selected_kshp"
                        :items="filterKshp"
                        label="Выберите КШП"
                        item-text="kombinat"
                        item-value="_id"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        :disabled="selected_kshp == 0"
                        color="primary"
                        @click="e1 = 3"
                      >
                        Продолжить
                      </v-btn>

                      <v-btn @click="e1 = e1 - 1" text>Назад</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card>
                    <v-card-title primary-title>
                      Выбор школы
                    </v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="selected_school"
                        :items="schoolsData"
                        label="Выберите школу"
                        item-text="school_name"
                        item-value="_id"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="e1 = e1 - 1" text>Назад</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            <v-divider></v-divider>
            <v-card flat v-show="selected_school != 0">
              <v-card-title primary-title>
                Редактирование буфета
              </v-card-title>
              <v-card-text>
                <bufetsTable
                  :headers="headers"
                  :data="filterBufet || []"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn
                    :disabled="filterBufet.length === 0"
                    @click.prevent="exportExcel"
                    dark
                    color="green"
                    >Экспортировать в EXCEL</v-btn
                  >
                  <bufetsAction
                    actionName="bufetAction"
                    v-show="bufetsActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import bufetsTable from "@/components/tables/dataTable/table";
import bufetForm from "@/components/forms/forms";
import bufetsAction from "@/components/tables/actions/actions";
import XLSX from "xlsx";

export default {
  components: {
    bufetsTable,
    bufetForm,
    bufetsAction
  },
  mounted() {
    this.$store
      .dispatch("cities/getCities")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("kshps/getKshps")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("schools/getSchools")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("bufets/getBufets")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      e1: 1,
      tab: null,
      tab_items: ["Буфет"],
      newData: [],
      selected_city: 0,
      selected_kshp: 0,
      selected_school: 0
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["bufets/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["bufets/getTableSettings"].headers;
    },
    loading: function() {
      return this.$store.getters["bufets/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["bufets/getStatus"] === "error") {
        this.$store.dispatch("snackbar/activate", {
          text: "Ошибка",
          color: "error"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
      }
    },
    filterKshp() {
      return this.kshpsData.filter(item => {
        return item.city_id == this.selected_city ? true : false;
      });
    },
    filterSchool() {
      return this.schoolsData.filter(item => {
        return item.id_kshp == this.selected_kshp ? true : false;
      });
    },
    filterBufet: function() {
      return this.bufetsData.filter(item => {
        return item.id_uchrezhdenia == this.selected_school ? true : false;
      });
    },
    bufetsActionsShow() {
      return this.$store.getters["bufets/getSelectedRows"].length > 0
        ? true
        : false;
    },
    citiesData() {
      return this.$store.getters["cities/getCities"] || [];
    },
    kshpsData() {
      return this.$store.getters["kshps/getKshps"] || [];
    },
    schoolsData() {
      return this.$store.getters["schools/getSchools"] || [];
    },
    bufetsData() {
      return this.$store.getters["bufets/getBufets"] || [];
    }
  },
  methods: {
    getBufets: function() {
      this.$store
        .dispatch("bufets/getBufets")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("bufets/setSelectedRows", data);
    },
    exportExcel() {
      let header = [
        "id Буфета",
        "id Школы",
        "id Категории",
        "Наименование",
        "Цена"
      ];
      let data = [];
      data.push(header);
      for (var i = 0; i < this.bufetsData.length; i++) {
        data.push([
          this.bufetsData[i]._id,
          this.bufetsData[i].id_uchrezhdenia,
          this.bufetsData[i].id_kategoriya,
          this.bufetsData[i].naimenovanie,
          this.bufetsData[i].cena.$numberDecimal
        ]);
      }
      var ws_name = "Буфет";
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.aoa_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(
        wb,
        `Буфет школы №${
          this.selected_school
        } от ${new Date().toLocaleDateString()}.xlsx`
      );
    }
  }
};
</script>

<style lang="css" scoped></style>
