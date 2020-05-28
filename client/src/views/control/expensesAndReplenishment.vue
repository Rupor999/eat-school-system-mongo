<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card :loading="loading_p || loading_r">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Расходы и пополнения
        </h1>
      </v-card-title>
      <v-card style="width: 100%">
        <v-card-title primary-title>
          Расходы
        </v-card-title>
        <v-data-table
          :headers="headers_r"
          :items="data_r"
          :items-per-page="itemsPerPage_r"
          :loading="loading_r"
          single-select
          item-key="_id"
          class="elevation-0"
          no-data-text="Нет данных"
        >
        </v-data-table>
      </v-card>

      <v-card style="width: 100%">
        <v-card-title primary-title>
          Пополнения
        </v-card-title>
        <v-data-table
          :headers="headers_p"
          :items="data_p"
          :items-per-page="itemsPerPage_p"
          :loading="loading_p"
          single-select
          item-key="_id"
          class="elevation-0"
          no-data-text="Нет данных"
        >
        </v-data-table>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("rashodovano/getRashodovano")
      .then(() => {})
      .catch(err => console.log(err));
    this.$store
      .dispatch("zachisleno/getZachisleno")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    itemsPerPage_r: function() {
      return this.$store.getters["rashodovano/getTableSettings"].itemsPerPage;
    },
    headers_r: function() {
      return this.$store.getters["rashodovano/getTableSettings"].headers;
    },
    data_r: function() {
      return this.$store.getters["rashodovano/getRashodovano"];
    },
    loading_r: function() {
      return this.$store.getters["rashodovano/getLoading"];
    },

    itemsPerPage_p: function() {
      return this.$store.getters["zachisleno/getTableSettings"].itemsPerPage;
    },
    headers_p: function() {
      return this.$store.getters["zachisleno/getTableSettings"].headers;
    },
    data_p: function() {
      return this.$store.getters["zachisleno/getZachisleno"];
    },
    loading_p: function() {
      return this.$store.getters["zachisleno/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
