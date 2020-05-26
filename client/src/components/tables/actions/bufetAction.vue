<template lang="html">
  <div class="d-flex">
    <editBufet class="mr-1" v-show="selectedData < 2" />
    <deleteBufet class="ml-1" />
  </div>
</template>

<script>
import editBufet from "@/components/tables/actions/modalWindow/bufetAction/editBufet";
import deleteBufet from "@/components/tables/actions/modalWindow/bufetAction/deleteBufet";

export default {
  components: {
    editBufet,
    deleteBufet
  },
  computed: {
    selectedData() {
      return this.$store.getters["bufets/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
