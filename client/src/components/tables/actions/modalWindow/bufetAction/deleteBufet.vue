<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn @click="deleteData" v-on="on" color="error">Удалить</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Удаление данных
        </v-card-title>

        <v-card-text>
          <v-container grid-list-xs,sm,md,lg,xl class="d-flex mt-1">
            <v-progress-linear
              :color="error"
              height="25"
              stream
              :value="statusPercent"
            >
              <strong>осталось {{ amount }}</strong>
            </v-progress-linear>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    async deleteData() {
      while (this.inputData.length) {
        await this.$store
          .dispatch("bufets/deleteBufet", this.inputData[0])
          .then(() => {
            this.inputData.splice(0, 1);
          })
          .catch(err => {
            this.dialog = false;
            this.$store.dispatch("snackbar/activate", {
              text:
                err.response == undefined
                  ? "Сервер не отвечает.."
                  : err.response.data.message,
              color: "red"
            });
          });
        if (this.error === "error") break;
      }

      if (this.inputData.length === 0) {
        this.dialog = false;
        this.$store.dispatch("snackbar/activate", {
          text: "Данные успешно удалены!",
          color: "green"
        });
        this.$store
          .dispatch("bufets/getBufets")
          .then(() => {})
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    inputData() {
      return this.$store.getters["bufets/getSelectedRows"];
    },
    amount() {
      return this.inputData.length;
    },
    statusPercent() {
      return 100 / this.amount;
    },
    error() {
      return this.$store.getters["bufets/getStatus"] === "error"
        ? "error"
        : "primary";
    }
  }
};
</script>

<style lang="css" scoped></style>
