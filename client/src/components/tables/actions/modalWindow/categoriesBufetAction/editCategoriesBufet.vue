<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="info" v-on="on">Редактировать</v-btn>
      </template>

      <v-card outlined :loading="loading">
        <v-card-title light class="headline" primary-title>
          Редактирование категории буфета
        </v-card-title>
        <v-card-text>
          <categoriesBufetForm
            formName="categoriesBufetForm"
            v-bind:inputData="inputData"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn @click="saveData" color="primary">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import categoriesBufetForm from "@/components/forms/forms";

export default {
  components: {
    categoriesBufetForm
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    saveData() {
      // console.log(this.$store.getters["users/getSelectedRows"]);
      this.$store
        .dispatch("categoriesBufet/putCategoriesBufet", this.inputData)
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
      let categoriesBufet = this.$store.getters[
        "categoriesBufet/getSelectedRows"
      ];
      return categoriesBufet[0];
    },
    loading() {
      return this.$store.getters["categoriesBufet/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
