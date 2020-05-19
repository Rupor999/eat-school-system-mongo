<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex flex-row">
          <v-text-field
            v-model="kategoriya"
            class="col-lg-4"
            label="Название категории"
            placeholder="Название категории"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      kategoriya: ""
    };
  },
  computed: {
    filterValue: function() {
      this.$store.dispatch("categoriesBufet/setFilterValue", {
        kategoriya: this.kategoriya
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
