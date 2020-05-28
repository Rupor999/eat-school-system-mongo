<template lang="html">
  <v-card raised>
    <v-card-title :class="returnClass" primary-title>
      {{ returnName }}
    </v-card-title>
    <v-card-text :class="returnClass">
      {{ message.text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["message"],
  computed: {
    returnName() {
      if (this.userInfo.role !== 1) {
        return this.message.from !== "" ? "Вы" : "Служба поддержки";
      } else {
        return this.message.from !== ""
          ? "Пользователь id:5eb7f5909af280571c6d09c7"
          : "Вы";
      }
    },
    returnClass() {
      if (this.userInfo.role !== 1) {
        return this.message.from !== "" ? "d-flex justify-end" : "";
      } else {
        return this.message.from !== "" ? "" : "d-flex justify-end";
      }
    },
    userInfo() {
      return this.$store.getters["auth/getUserInfo"];
    }
  }
};
</script>

<style lang="css" scoped></style>
