<template lang="html">
  <div class="d-flex">
    <editCity class="mr-1" v-show="selectedData < 2" />
    <deleteCity class="ml-1" />
  </div>
</template>

<script>
import editCity from "@/components/tables/actions/modalWindow/cityAction/editCity";
import deleteCity from "@/components/tables/actions/modalWindow/cityAction/deleteCity";

export default {
  components: {
    editCity,
    deleteCity
  },
  computed: {
    selectedData() {
      return this.$store.getters["cities/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
