<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-text-field
          v-model="surname"
          class="col-lg-4"
          label="Фамилия"
          placeholder="Фамилия"
          dense
        ></v-text-field>

        <v-text-field
          v-model="name"
          class="col-lg-4"
          label="Имя"
          placeholder="Имя"
          dense
        ></v-text-field>

        <v-text-field
          v-model="midname"
          class="col-lg-4"
          label="Отчество"
          placeholder="Отчество"
          dense
        ></v-text-field>
      </v-row>
      <v-select
        v-model="role"
        :items="roleItems"
        label="Роль"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      surname: "",
      name: "",
      midname: "",
      role: "",
      roleItems: [
        "Администратор",
        "Ответственный за питание",
        "Классный руководитель",
        "КШП",
        "Родитель"
      ]
    };
  },
  methods: {
    // checkEmpty() {
    //   // console.log('asdassdadasd');
    //   if (this.surname == "" && this.name == "" && this.midname == ""){
    //     console.log('EMMMMMMMM');
    //     this.surname = "";
    //     this.name = "";
    //     this.midname = "";
    //     this.$store.dispatch("users/setFilterValue", {
    //       surname: "",
    //       name: "",
    //       midname: "",
    //       role: 1 +
    //       this.roleItems.findIndex((current, index) => {
    //         return this.role == current ? true : false;
    //       })
    //     });
    //   }
    // },
    // aaa: function() {
    //   // console.log(
    //   //   this.surname + " " + this.name + " " + this.midname + " " + this.role
    //   // );
    //   console.log(this.surname);
    //   console.log(this.$store.getters["users/getFilterValues"]);
    // }
  },
  computed: {
    filterValue: function() {
      // console.log("2222" + this.role);
      // let role = this.role;
      // role =
// console.log(this.surname.length);
      this.$store.dispatch("users/setFilterValue", {
        surname: this.surname,
        name: this.name,
        midname: this.midname,
        role: 1 +
        this.roleItems.findIndex((current, index) => {
          return this.role == current ? true : false;
        })
      });
      // console.log("1111" + this.role);
    }
  }
};
</script>

<style lang="css" scoped></style>
