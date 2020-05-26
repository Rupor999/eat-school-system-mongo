<template lang="html">
  <div class="d-flex">
    <editSchool class="mr-1" v-show="selectedData < 2" />
    <deleteSchool class="ml-1" />
  </div>
</template>

<script>
import editSchool from "@/components/tables/actions/modalWindow/schoolAction/editSchool";
import deleteSchool from "@/components/tables/actions/modalWindow/schoolAction/deleteSchool";

export default {
  components: {
    editSchool,
    deleteSchool
  },
  computed: {
    selectedData() {
      return this.$store.getters["schools/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
