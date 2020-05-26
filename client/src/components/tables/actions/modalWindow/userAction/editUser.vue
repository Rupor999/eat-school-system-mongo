<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on }">
        <v-btn color="info" v-on="on">Редактировать</v-btn>
      </template>

      <v-card outlined :loading="loading">
        <v-card-title light class="headline" primary-title>
          Редактирование пользователя
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-text-field
              class="ma-1"
              label="Номер телефона"
              required
              v-model="inputData.number"
            ></v-text-field>
            <v-text-field
              class="ma-1"
              label="Пароль"
              required
              v-model="inputData.password"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              class="ma-1"
              label="Фамилия"
              required
              v-model="inputData.fio.surname"
            ></v-text-field>
            <v-text-field
              class="ma-1"
              label="Имя"
              required
              v-model="inputData.fio.name"
            ></v-text-field>
            <v-text-field
              class="ma-1"
              label="Отчество"
              required
              v-model="inputData.fio.midname"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-select
              class="ma-1"
              :items="roleItems"
              item-text="roleName"
              item-value="id"
              label="Роль"
              v-model="inputData.role"
            ></v-select>
          </v-row>
        </v-card-text>

        <v-card-actions v-if="show" class="d-flex flex-row">
          <!-- Дети -->
          <v-card v-if="permissionChildren" style="width:100%">
            <v-card-text>
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <h2 class="title mb-2">Дети</h2>
                  <addChildren v-bind:inputData="inputData" />
                </v-col>
              </v-row>
              <v-chip-group column multiple>
                <v-chip
                  v-for="(item, index) in inputData.additional.children"
                  :key="index"
                  outlined
                  close
                  @click:close="inputData.additional.children.splice(index, 1)"
                >
                  {{ item.familia }} {{ item.imya }} {{ item.otchestvo }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
          <!--  -->
          <v-divider class="my-2"></v-divider>
          <!-- Школы -->
          <v-card v-if="permissionSchool" style="width:100%">
            <v-card-text>
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <h2 class="title mb-2">Школы</h2>
                  <addSchool
                    v-bind:inputData="inputData"
                    v-bind:showAdd="schoolCounterStopAction"
                  />
                </v-col>
              </v-row>
              <v-chip-group column multiple>
                <v-chip
                  v-for="(item, index) in inputData.additional.school"
                  :key="index"
                  outlined
                  close
                  @click:close="inputData.additional.school.splice(index, 1)"
                >
                  {{ item.school_name }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
          <!--  -->
          <v-divider class="my-2"></v-divider>
          <!-- Классы -->
          <v-card v-if="permissionClass" style="width:100%">
            <v-card-text>
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <h2 class="title mb-2">Класс</h2>
                  <addClass v-bind:inputData="inputData" />
                </v-col>
              </v-row>
              <v-chip-group column multiple>
                <v-chip
                  v-for="(item, index) in inputData.additional.class"
                  :key="index"
                  outlined
                  close
                  @click:close="inputData.additional.class.splice(index, 1)"
                >
                  {{ item.number }} {{ item.letter }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
          <!--  -->
        </v-card-actions>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="saveData" color="primary">Сохранить</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import userForm from "@/components/forms/forms";
import addClass from "@/components/tables/actions/modalWindow/userAction/addClass";
import addChildren from "@/components/tables/actions/modalWindow/userAction/addChildren";
import addSchool from "@/components/tables/actions/modalWindow/userAction/addSchool";

export default {
  components: {
    userForm,
    addClass,
    addChildren,
    addSchool
  },
  data() {
    return {
      dialog: false,
      additional_permission: {
        children: false,
        school: false,
        class: false
      },
      roleItems: [
        { id: 1, roleName: "Администратор" },
        { id: 2, roleName: "Ответственный за питание" },
        { id: 3, roleName: "Классный руководитель" },
        { id: 4, roleName: "КШП" },
        { id: 5, roleName: "Родитель" }
      ]
    };
  },
  methods: {
    saveData() {
      // console.log(this.$store.getters["users/getSelectedRows"]);
      this.$store
        .dispatch("users/putUser", this.inputData)
        .then(() => {
          this.$store.dispatch("snackbar/activate", {
            text: "Данные успешно сохранены!",
            color: "green"
          });
          this.dialog = false;
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text:
              err.response == undefined
                ? "Сервер не отвечает.."
                : err.response.data.message,
            color: "red"
          });
        });
    }
  },
  computed: {
    inputData() {
      let user = this.$store.getters["users/getSelectedRows"];
      user[0].password = "";
      return user[0];
    },
    show() {
      if (this.inputData.role) {
        if (this.inputData.role === 1 || this.inputData.role === 5) {
          this.additional_permission.children = true;
          this.additional_permission.school = false;
          this.additional_permission.class = false;
        } else if (this.inputData.role === 2 || this.inputData.role === 4) {
          this.additional_permission.children = true;
          this.additional_permission.school = true;
          this.additional_permission.class = false;
        } else if (this.inputData.role === 3) {
          this.additional_permission.children = true;
          this.additional_permission.school = true;
          this.additional_permission.class = true;
        }
        return true;
      } else {
        return false;
      }
    },
    permissionChildren() {
      return this.additional_permission.children;
    },
    permissionSchool() {
      return this.additional_permission.school;
    },
    permissionClass() {
      return this.additional_permission.class;
    },
    schoolCounterStopAction() {
      if (this.inputData.role === 2 || this.inputData.role === 3) {
        if (this.inputData.additional.school.length === 1) {
          return false;
        } else return true;
      } else return true;
    },
    loading() {
      return this.$store.getters["users/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
