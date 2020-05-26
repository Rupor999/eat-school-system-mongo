<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="info" v-on="on">Редактировать</v-btn>
      </template>

      <v-card outlined :loading="loading">
        <v-card-title light class="headline" primary-title>
          Редактирование ученика
        </v-card-title>
        <v-card-text>
          <pupilsForm formName="pupilForm" v-bind:inputData="inputData" />
        </v-card-text>
        <v-card-text>
          <slot></slot>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn @click="saveData" color="primary">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pupilsForm from "@/components/forms/forms";

export default {
  components: {
    pupilsForm
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
        .dispatch("pupils/putPupil", this.inputData)
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
      let pupil = this.$store.getters["pupils/getSelectedRows"];
      pupil[0].cifra_kl = pupil[0].cifra_kl + "";
      pupil[0].bukva_kl = pupil[0].bukva_kl.toLowerCase();
      pupil[0].pol = pupil[0].pol + "";
      pupil[0].mehanizm = pupil[0].mehanizm + "";
      pupil[0].goryachee_pitanie =
        pupil[0].goryachee_pitanie == true ? "1" : "0";
      pupil[0].bufet = pupil[0].bufet == true ? "1" : "0";
      return pupil[0];
    },
    loading() {
      return this.$store.getters["pupils/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
