<template lang="html">
  <div class="d-flex">
    <editUser class="mr-1" v-show="selectedData < 2" />
    <deleteUser class="ml-1" />
  </div>
</template>

<script>
import editUser from "@/components/tables/actions/modalWindow/userAction/editUser";
import deleteUser from "@/components/tables/actions/modalWindow/userAction/deleteUser";

export default {
  components: {
    editUser,
    deleteUser
  },
  computed: {
    selectedData() {
      return this.$store.getters["users/getSelectedRows"].length;
    }
  }
};
</script>

<style lang="css" scoped></style>
