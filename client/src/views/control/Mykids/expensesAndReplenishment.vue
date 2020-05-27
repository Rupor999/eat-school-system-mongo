<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl class="d-flex justify-center flex-wrap">
    <v-select
      v-model="selectedChildren"
      :items="childrenCurrentUserData"
      label="Выберете ребенка"
      :item-text="returnFullFio"
      item-value="_id"
      class="col-lg-4"
      return-object
    ></v-select>
    <v-card class="ma-1" v-if="selectedChildren" style="width: 100%">
      <v-card-title primary-title class="d-flex justify-space-around">
        <div>
          {{ selectedChildren.familia }} {{ selectedChildren.imya }}
          {{ selectedChildren.otchestvo }}
        </div>
        <div class="font-weight-light">
          Лицевой счет:
          {{ selectedChildren.id_uchenik }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
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
      </v-card-text>
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
    return {
      selectedChildren: 0
    };
  },
  methods: {
    returnFullFio(data) {
      return data.familia + " " + data.imya + " " + data.otchestvo;
    }
  },
  computed: {
    childrenCurrentUserData() {
      return this.$store.getters["auth/getUserAdditional"].children;
    },

    itemsPerPage_r: function() {
      return this.$store.getters["rashodovano/getTableSettings"].itemsPerPage;
    },
    headers_r: function() {
      return this.$store.getters["rashodovano/getTableSettings"].headers;
    },
    data_r: function() {
      // console.log(this.$store.getters["rashodovano/getRashodovano"]);
      return this.$store.getters["rashodovano/getRashodovano"].filter(item => {
        return this.selectedChildren._id == item.id_uchenik;
      });
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
      // console.log(this.$store.getters["zachisleno/getZachisleno"]);
      return this.$store.getters["zachisleno/getZachisleno"].filter(item => {
        return this.selectedChildren._id == item.id_uchenik;
      });
    },
    loading_p: function() {
      return this.$store.getters["zachisleno/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
