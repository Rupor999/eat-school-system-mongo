<template lang="html">
  <div class="d-flex">
    <editCategoriesBufet class="mr-1" v-show="selectedData < 2" />
    <deleteCategoriesBufet class="ml-1" />
  </div>
</template>

<script>
import editCategoriesBufet from "@/components/tables/actions/modalWindow/categoriesBufetAction/editCategoriesBufet";
import deleteCategoriesBufet from "@/components/tables/actions/modalWindow/categoriesBufetAction/deleteCategoriesBufet";

export default {
  components: {
    editCategoriesBufet,
    deleteCategoriesBufet
  },
  computed: {
    selectedData() {
      return this.$store.getters["categoriesBufet/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
