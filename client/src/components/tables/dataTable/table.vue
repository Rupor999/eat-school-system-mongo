<template lang="html">
  <v-data-table
    show-select
    :headers="headers"
    :items="data"
    :items-per-page="itemsPerPage"
    item-key="_id"
    class="elevation-0"
    no-data-text="Нет данных"
    v-model="selected"
  >
    <!-- <template v-slot:item.naimenovanie="props">
          <v-edit-dialog
            :return-value.sync="props.item.naimenovanie"
            large
            persistent
          >
            <div>{{ props.item.naimenovanie }}</div>

            <template v-slot:input>
              <v-text-field
                v-model="props.item.naimenovanie"
                label="Редактирование"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template> -->
  </v-data-table>
</template>

<script>
export default {
  props: ["headers", "itemsPerPage", "data", "selectedRows"],
  computed: {
    selected: {
      get: function() {},
      set: function(value) {
        this.selectedRows(value);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
