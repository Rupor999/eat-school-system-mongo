<template lang="html">
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-show="showAdd" icon color="primary" v-on="on"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>

      <v-card>
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Добавить школу</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              @click="addSchool"
              v-show="selected.length"
              color="green lighten-1"
              class="mx-1"
              >Добавить</v-btn
            >
            <v-btn @click="dialog = false" class="mx-1" color="error"
              >Закрыть</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-data-table
            show-select
            :headers="headers"
            :items="data"
            :items-per-page="itemsPerPage"
            :loading="loading"
            single-select
            item-key="_id"
            class="elevation-0"
            no-data-text="Нет данных"
            v-model="selected"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object,
    showAdd: Boolean
  },
  mounted() {
    this.$store
      .dispatch("schools/getSchools")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      dialog: false,
      selected: []
    };
  },
  methods: {
    addSchool() {
      this.inputData.additional.school.push(this.selected[0]);
      this.dialog = !this.dialog;
      this.selected = [];
    }
  },
  computed: {
    itemsPerPage: function() {
      return this.$store.getters["schools/getTableSettings"].itemsPerPage;
    },
    headers: function() {
      return this.$store.getters["schools/getTableSettings"].headers;
    },
    data: function() {
      return this.$store.getters["schools/getSchools"];
    },
    loading: function() {
      return this.$store.getters["schools/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
