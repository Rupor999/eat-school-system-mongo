<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn @click="sendNewBufetData" class="ma-4" color="primary" v-on="on"
          >Сохранить данные</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Отправка данных
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
  props: {
    inputData: Array
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    async sendNewBufetData() {
      while (this.inputData.length) {
        await this.$store
          .dispatch("schools/postSchool", this.inputData[0])
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
          text: "Данные успешно внесены",
          color: "green"
        });
        this.$store.dispatch("schools/getSchools");
      }
    }
  },
  computed: {
    amount() {
      return this.inputData.length;
    },
    statusPercent() {
      return 100 / this.amount;
    },
    error() {
      return this.$store.getters["schools/getStatus"] === "error"
        ? "error"
        : "primary";
    }
  }
};
</script>

<style lang="css" scoped></style>
