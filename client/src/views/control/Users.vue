<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Пользователи
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
                        Фильтр пользователя
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <filterTable filterName="userFilter" />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <usersTable
                  :headers="headers"
                  :data="filterData"
                  :itemsPerPage="itemsPerPage"
                  :selectedRows="selectedRows"
                />
              </v-card-text>
              <v-card-actions>
                <v-row class="d-flex justify-space-around">
                  <v-btn @click.prevent="getUsers" color="primary"
                    >Получить данные</v-btn
                  >
                  <actionTable
                    actionName="userAction"
                    v-show="userActionsShow"
                  />
                </v-row>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <userForm
              v-if="newData.length > 0"
              v-for="(item, index) in newData"
              v-bind:key="index"
              formName="userForm"
              v-bind:inputData="item"
            />
            <v-row class="d-flex justify-space-around">
              <v-btn class="ma-4" @click="addNewItem">Добавить</v-btn>

              <v-btn
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
              <v-btn class="ma-4" color="primary">Сохранить</v-btn>
            </v-row>
            <v-divider></v-divider>
            <v-row class="d-flex justify-space-around" v-if="showExcelPanel">
              <div class="d-flex flex-row align-center">
                <span>Скачать форму файла - </span>
                <a target="_blank" href="/excel/addUserTemplate.xlsx"
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
import usersTable from "@/components/tables/dataTable/table";
import filterTable from "@/components/tables/filters/filters";
import userForm from "@/components/forms/forms";
import actionTable from "@/components/tables/actions/actions";
import XLSX from "xlsx";

export default {
  components: {
    usersTable,
    filterTable,
    userForm,
    actionTable
  },
  data() {
    return {
      file: null,
      tab: null,
      tab_items: ["Список пользователей", "Добавить нового пользователя"],
      showExcelPanel: false,
      newData: []
    };
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["users/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["users/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["users/getUsers"];
    },
    loading: function() {
      return this.$store.getters["users/getLoading"];
    },
    errorText: function() {
      if (this.$store.getters["users/getStatus"] === "error") {
        // this.snackbar = !this.snackbar;
        // return "Ошибка!";
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
      let value = this.$store.getters["users/getUsers"];
      let filter_values = this.$store.getters["users/getFilterValues"];
      return value.filter(item => {
        let surname = item.fio.surname + "";
        let name = item.fio.name + "";
        let midname = item.fio.midname + "";
        let role = item.role + "";

        if (
          surname.toLowerCase().indexOf(filter_values.surname.toLowerCase()) !=
            -1 &&
          name.toLowerCase().indexOf(filter_values.name.toLowerCase()) != -1 &&
          midname.toLowerCase().indexOf(filter_values.midname.toLowerCase()) !=
            -1 &&
          (filter_values.role == "0" || filter_values.role == ""
            ? true
            : role == filter_values.role
            ? true
            : false)
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    userActionsShow() {
      return this.$store.getters["users/getSelectedRows"].length > 0
        ? true
        : false;
    }
  },
  methods: {
    getUsers: function() {
      this.$store
        .dispatch("users/getUsers")
        .then(() => {})
        .catch(err => console.log(err));
    },
    selectedRows: function(data) {
      this.$store.dispatch("users/setSelectedRows", data);
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
            number: data[i][0],
            password: data[i][1],
            surname: data[i][2],
            name: data[i][3],
            midname: data[i][4],
            role: data[i][5]
          });
      };
      reader.readAsBinaryString(file);
    },
    addNewItem() {
      this.newData.push({
        number: "",
        password: "",
        surname: "",
        name: "",
        midname: "",
        role: ""
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
