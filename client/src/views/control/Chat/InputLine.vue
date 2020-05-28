<template lang="html">
  <v-card style="width:100%">
    <v-card-actions class="d-flex align-center">
      <v-textarea
        no-resize
        clearable
        rows="1"
        outlined
        full-width
        v-model="textareaText"
        class="ma-1"
        type="text"
        style="height:55px"
      ></v-textarea>

      <!-- <input
        type="text"
        style="width: 100%"
        placeholder="Введите сообщение"
        v-model="textareaText"
      /> -->

      <!-- <v-text-field
        label="Введите сообщение"
        v-model="textareaText"
      ></v-text-field> -->

      <v-btn color="primary" dense class="ma-1" style="height:55px" @click="TX"
        >Отправить</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["sendMessage"],
  data() {
    return {
      textareaText: "",
      errorEmptyString: false
    };
  },
  methods: {
    TX() {
      this.sendMessage(this.textareaText);
      this.textareaText = null;
    }
  },
  computed: {}
};
</script>

<style lang="css" scoped></style>
