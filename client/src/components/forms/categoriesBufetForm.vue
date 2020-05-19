<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <v-card-text>
        <v-row>
          <v-text-field
            class="ma-1"
            label="Название новой категории"
            required
            v-model="inputData.kategoriya"
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
