<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <v-card-text>
        <v-row class="d-flex flex-column">
          <v-col>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="inputData.familia"
                  class="col-lg-4"
                  label="Фамилия"
                  placeholder="Фамилия"
                  dense
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="inputData.imya"
                  class="col-lg-4"
                  label="Имя"
                  placeholder="Имя"
                  dense
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="inputData.otchestvo"
                  class="col-lg-4"
                  label="Отчество"
                  placeholder="Отчество"
                  dense
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-flex flex-wrap">
            <v-row>
              <v-col>
                <v-select
                  v-model="inputData.id_school"
                  :items="schoolsData"
                  label="Школа"
                  item-text="school_name"
                  item-value="_id"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
                <v-select
                  v-model="inputData.cifra_kl"
                  :items="cifraKlData"
                  label="Цифра класса"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
                <v-select
                  v-model="inputData.bukva_kl"
                  :items="bukvaKlData"
                  label="Буква класса"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="inputData.pol"
                  :items="polData"
                  label="Пол"
                  item-text="text"
                  item-value="value"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
                <v-select
                  v-model="inputData.mehanizm"
                  :items="mehanizmData"
                  label="Механизм"
                  item-text="text"
                  item-value="value"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
                <v-select
                  v-model="inputData.goryachee_pitanie"
                  :items="goryacheePitanieData"
                  label="Разрешение ГП"
                  item-text="text"
                  item-value="value"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
                <v-select
                  v-model="inputData.bufet"
                  :items="bufetData"
                  label="Разрешение буфет"
                  item-text="text"
                  item-value="value"
                  class="col-lg-4"
                  clearable
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
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
      ],
      polData: [
        { value: "0", text: "Женский" },
        { value: "1", text: "Мужской" }
      ],
      mehanizmData: [
        { value: "1", text: "Первый" },
        { value: "2", text: "Второй" },
        { value: "3", text: "Третий" },
        { value: "4", text: "Четвертый" }
      ],
      goryacheePitanieData: [
        { value: "1", text: "Да" },
        { value: "0", text: "Нет" }
      ],
      bufetData: [{ value: "1", text: "Да" }, { value: "0", text: "Нет" }]
    };
  },
  computed: {
    schoolsData: function() {
      return this.$store.getters["schools/getSchools"];
    }
  }
};
</script>

<style lang="css" scoped></style>
