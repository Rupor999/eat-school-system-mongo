<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex flex-wrap">
          <v-row>
            <v-col>
              <v-select
                v-model="id_school"
                :items="schoolsData"
                label="Школа"
                item-text="school_name"
                item-value="_id"
                class="col-lg-4"
                clearable
                dense
              ></v-select>
              <v-select
                v-model="cifra_kl"
                :items="cifraKlData"
                label="Цифра класса"
                class="col-lg-4"
                clearable
                dense
              ></v-select>
              <v-select
                v-model="bukva_kl"
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
              <v-text-field
                v-model="familia"
                class="col-lg-4"
                label="Фамилия"
                placeholder="Фамилия"
                dense
                clearable
              ></v-text-field>
              <v-text-field
                v-model="imya"
                class="col-lg-4"
                label="Имя"
                placeholder="Имя"
                dense
                clearable
              ></v-text-field>
              <v-text-field
                v-model="otchestvo"
                class="col-lg-4"
                label="Отчество"
                placeholder="Отчество"
                dense
                clearable
              ></v-text-field>
              <v-switch
                v-model="udalenniy"
                color="red"
                label="Удален?"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="pol"
                :items="polData"
                label="Пол"
                item-text="text"
                item-value="value"
                class="col-lg-4"
                clearable
                dense
              ></v-select>
              <v-select
                v-model="mehanizm"
                :items="mehanizmData"
                label="Механизм"
                item-text="text"
                item-value="value"
                class="col-lg-4"
                clearable
                dense
              ></v-select>
              <v-select
                v-model="goryachee_pitanie"
                :items="goryacheePitanieData"
                label="Разрешение ГП"
                item-text="text"
                item-value="value"
                class="col-lg-4"
                clearable
                dense
              ></v-select>
              <v-select
                v-model="bufet"
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      id_school: "",
      cifra_kl: "",
      bukva_kl: "",
      familia: "",
      imya: "",
      otchestvo: "",
      pol: "",
      mehanizm: "",
      goryachee_pitanie: "",
      bufet: "",
      udalenniy: "",
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
    filterValue: function() {
      this.$store.dispatch("pupils/setFilterValue", {
        id_school: this.id_school || "",
        cifra_kl: this.cifra_kl || "",
        bukva_kl: this.bukva_kl || "",
        familia: this.familia || "",
        imya: this.imya || "",
        otchestvo: this.otchestvo || "",
        pol: this.pol || "",
        mehanizm: this.mehanizm || "",
        goryachee_pitanie: this.goryachee_pitanie || "",
        bufet: this.bufet || "",
        udalenniy: this.udalenniy === true ? "1" : "0" || ""
      });
    },
    schoolsData: function() {
      return this.$store.getters["schools/getSchools"];
    }
  }
};
</script>

<style lang="css" scoped></style>
