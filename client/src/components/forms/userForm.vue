<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <v-card-text>
        <v-row>
          <v-text-field
            class="ma-1"
            label="Номер телефона"
            required
            v-model="inputData.number"
          ></v-text-field>
          <v-text-field
            class="ma-1"
            label="Пароль"
            required
            v-model="inputData.password"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="ma-1"
            label="Фамилия"
            required
            v-model="inputData.surname"
          ></v-text-field>
          <v-text-field
            class="ma-1"
            label="Имя"
            required
            v-model="inputData.name"
          ></v-text-field>
          <v-text-field
            class="ma-1"
            label="Отчество"
            required
            v-model="inputData.midname"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-select
            class="ma-1"
            :items="roleItems"
            label="Роль"
            v-model="inputData.role"
          ></v-select>
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
  },
  data() {
    return {
      roleItems: [
        "Администратор",
        "Ответственный за питание",
        "Классный руководитель",
        "КШП",
        "Родитель"
      ]
    };
  }
};
</script>

<style lang="css" scoped></style>
