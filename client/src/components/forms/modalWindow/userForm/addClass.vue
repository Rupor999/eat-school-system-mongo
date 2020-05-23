<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn icon color="primary" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Добавить класс
        </v-card-title>

        <v-card-text>
          <v-container grid-list-xs,sm,md,lg,xl class="d-flex mt-1">
            <v-select
              v-model="number"
              :items="cifraKlData"
              label="Цифра класса"
              class="col-lg-4"
              clearable
              dense
            ></v-select>
            <v-select
              v-model="letter"
              :items="bukvaKlData"
              label="Буква класса"
              class="col-lg-4"
              clearable
              dense
            ></v-select>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-container grid-list-xs,sm,md,lg,xl class="d-flex justify-end">
            <v-btn @click="addClass" color="primary">Добавить</v-btn>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object
  },
  data() {
    return {
      dialog: false,
      number: "",
      letter: "",
      cifraKlData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      bukvaKlData: [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я"
      ]
    };
  },
  methods: {
    addClass() {
      this.inputData.additional.class.push({
        number: this.number,
        letter: this.letter
      });
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style lang="css" scoped></style>
