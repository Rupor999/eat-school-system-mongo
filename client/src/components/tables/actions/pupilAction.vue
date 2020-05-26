<template lang="html">
  <div class="d-flex">
    <editPupil class="mr-1" v-show="selectedData < 2">
      <v-text-field
        v-model="inputData.chip_karty"
        class="col-lg-4"
        label="Чип карта"
        placeholder="Чип карта"
        dense
        clearable
      ></v-text-field>
      <v-text-field
        v-model="inputData.primechanie"
        class="col-lg-4"
        label="Примечание"
        placeholder="Примечание"
        dense
        clearable
      ></v-text-field>
    </editPupil>
    <deletePupil class="ml-1" />
  </div>
</template>

<script>
import editPupil from "@/components/tables/actions/modalWindow/pupilAction/editPupil";
import deletePupil from "@/components/tables/actions/modalWindow/pupilAction/deletePupil";

export default {
  components: {
    editPupil,
    deletePupil
  },
  computed: {
    selectedData() {
      return this.$store.getters["pupils/getSelectedRows"].length;
    },
    inputData() {
      let pupil = this.$store.getters["pupils/getSelectedRows"];
      return pupil[0];
    }
  }
};
</script>

<style lang="css" scoped></style>
