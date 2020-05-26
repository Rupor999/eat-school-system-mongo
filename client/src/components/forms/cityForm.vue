<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <div class="d-flex justify-end">
        <slot></slot>
      </div>
      <v-card-text>
        <v-row>
          <v-text-field
            class="ma-1"
            label="Регион"
            required
            v-model="inputData.region"
          ></v-text-field>
          <v-text-field
            class="ma-1"
            label="Название города"
            required
            v-model="inputData.city_name"
          ></v-text-field>
        </v-row>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object
  }
};
</script>

<style lang="css" scoped></style>
