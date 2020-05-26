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
                        :disabled="disabledSchoolSelect"
                        v-model="selected_school"
                        :items="schoolsData"
                        label="Выберите школу"
                        item-text="school_name"
                        item-value="_id"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        :disabled="disabledBackButton"
                        @click="e1 = e1 - 1"
                        text
                        >Назад</v-btn
                      >
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
                    v-if="bufetsActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <bufetForm
              v-if="newData.length > 0"
              v-for="(item, index) in newData"
              v-bind:key="index"
              formName="bufetForm"
              v-bind:inputData="item"
            >
              <template>
                <v-btn @click="newData.splice(index, 1)" icon color="error"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </template>
            </bufetForm>
            <v-row class="d-flex justify-space-around">
              <v-btn class="ma-4" @click="addNewItem">Добавить</v-btn>

              <v-btn
                color="green"
                v-show="!showExcelPanel"
                class="ma-4"
                @click="showExcelPanel = true"
                >Добавить из файла Excel</v-btn
              >
              <v-btn
                v-show="showExcelPanel"
                class="ma-4"
                @click="showExcelPanel = false"
                >Скрыть панель Excel</v-btn
              >
              <v-btn
                v-show="newData.length"
                class="ma-4 error"
                @click="newData = []"
                >Удалить все формы</v-btn
              >
              <saveLoading v-show="newData.length" v-bind:inputData="newData" />
            </v-row>
            <v-divider></v-divider>
            <v-row class="d-flex justify-space-around" v-if="showExcelPanel">
              <div class="d-flex flex-row align-center">
                <span>Скачать форму файла - </span>
                <a target="_blank" href="/excel/addBufetTemplate.xlsx"
                  ><v-img width="50" height="50" src="/excelIcon.png"></v-img
                ></a>
              </div>
              <div class="d-flex flex-row align-center">
                <v-file-input
                  accept=".xlsx"
                  ref="myfile"
                  label="Загрузка файла Excel"
                  v-model="file"
                  @change="fileExtract"
                  @click:clear="newData = []"
                ></v-file-input>
              </div>
            </v-row>
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
import saveLoading from "@/components/forms/modalWindow/bufetForm/saveLoading";

export default {
  components: {
    bufetsTable,
    bufetForm,
    bufetsAction,
    saveLoading
  },
  async mounted() {
    await this.$store.dispatch("cities/getCities");
    await this.$store.dispatch("kshps/getKshps");
    await this.$store.dispatch("schools/getSchools");
    await this.$store.dispatch("bufets/getBufets");
    await this.$store.dispatch("categoriesBufet/getCategoriesBufet");

    let user = this.currentUser;
    switch (user.role) {
      case 1:
        this.e1 = 1;
        break;
      case 2:
        this.e1 = 3;
        this.selected_school = user.additional.school[0]._id;
        this.disabledSchoolSelect = true;
        this.disabledBackButton = true;
        break;
      case 3:
        this.e1 = 3;
        this.selected_school = user.additional.school[0]._id;
        this.disabledSchoolSelect = true;
        this.disabledBackButton = true;
        break;
      case 4:
        this.e1 = 3;
        this.selected_kshp = user._id; //косяк////////////////////////////////////////
        this.disabledBackButton = true;
        break;
      case 5:
        this.e1 = 3;
        this.selected_school = user.additional.children[0].id_school;
        this.disabledSchoolSelect = true;
        this.disabledBackButton = true;
        break;
    }
  },
  data() {
    return {
      e1: 0,
      tab: null,
      tab_items: ["Буфет", "Добавить новую позицию"],
      newData: [],
      selected_city: 0,
      selected_kshp: 0,
      selected_school: 0,
      disabledSchoolSelect: false,
      disabledBackButton: false,
      showExcelPanel: false,
      file: null
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
    },
    currentUser() {
      return this.$store.getters["auth/getUserInfo"];
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
    },
    fileExtract: function(evt) {
      this._file(evt);
    },
    _file(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        data.shift();
        for (var i = 0; i < data.length; i++)
          this.newData.push({
            id_uchrezhdenia: "",
            id_kategoriya: "",
            naimenovanie: data[i][0],
            cena: data[i][1]
          });
      };
      reader.readAsBinaryString(file);
    },
    addNewItem() {
      this.newData.push({
        id_uchrezhdenia: "",
        id_kategoriya: "",
        naimenovanie: "",
        cena: 0
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
