<template lang="html">
  <div class="d-flex">
    <editKshp class="mr-1" v-show="selectedData < 2" />
    <deleteKshp class="ml-1" />
  </div>
</template>

<script>
import editKshp from "@/components/tables/actions/modalWindow/kshpAction/editKshp";
import deleteKshp from "@/components/tables/actions/modalWindow/kshpAction/deleteKshp";

export default {
  components: {
    editKshp,
    deleteKshp
  },
  computed: {
    selectedData() {
      return this.$store.getters["kshps/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
