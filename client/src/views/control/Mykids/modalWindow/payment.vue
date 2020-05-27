<template lang="html">
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on }">
        <v-btn type="submit" color="primary" v-on="on">Перейти к оплате</v-btn>
      </template>
      <!-- grey lighten-5 -->
      <div v-if="loading" class="text-center">
        <v-progress-circular
          indeterminate
          color="green darken-3"
        ></v-progress-circular>
      </div>
      <v-card v-else color="grey lighten-5" :loading="loading2">
        <v-card-title class="headline"
          ><v-spacer></v-spacer>
          <v-img max-width="200" src="/payment_logo.png" />
        </v-card-title>
        <v-card-text>
          <v-card class="elevation-7" :loading="loading2">
            <v-card-title class="elevation-1 bg-grey-darken-5">
              <span class="title font-weight-medium ml-4 text-color-red "
                >Оплата банковской картой</span
              >
            </v-card-title>
            <v-card-text class="mt-4">
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>Лицевой счет</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    solo
                    dense
                    disabled
                    :value="selectedChildren.id_uchenik"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>Сумма</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    solo
                    dense
                    suffix="RUB"
                    disabled
                    :value="summa + '.00'"
                  ></v-text-field> </v-col
              ></v-row>
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>Номер карты</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    maxlength="19"
                    hint="от 12 до 19 цифр"
                    persistent-hint
                    outlined
                    single-line
                    dense
                    v-model="cardNumber"
                    @input="formatCardNumber"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>Срок действия</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <v-col>
                      <v-select
                        :items="itemMonth"
                        label="Month"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select :items="itemYear" label="Year" solo></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>Владелец карты</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    hint="Только латинские буквы — как на карте"
                    persistent-hint
                    outlined
                    single-line
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mr-1"
                ><v-col cols="4">
                  <v-subheader>КОД CVV2</v-subheader>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    maxlength="3"
                    :type="'password'"
                    outlined
                    single-line
                    dense
                    hint="3 цифры — указаны на обратной стороне карты"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-progress-circular
                v-if="loadingPay"
                indeterminate
                color="green darken-3"
                class="mx-auto"
              ></v-progress-circular>
              <v-row v-else class="mx-4 mt-4 d-flex justify-center"
                ><v-btn class="button-pay" @click="payButton">Оплатить</v-btn>
              </v-row>

              <v-row class="mx-4 mt-4 caption"
                >Данный сайт поддерживает 128-битное шифрование. Информация,
                введённая на этой странице, защищена специальными средствами.
              </v-row>
            </v-card-text>
            <!-- <div class="mx-4 mt-4 d-flex flex-wrap align-content-space-between"> -->

            <v-container grid-list-xs,sm,md,lg,xl>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment1.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment2.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment3.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-2" src="/payment4.png" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment5.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment6.png" />
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-img class="ma-5" src="/payment7.png" />
                </v-col>
              </v-row>
            </v-container>
            <!-- </div> -->
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-4" text @click="closeButton"
            >Закрыть</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["selectedChildren", "selectedFoodType", "summa", "reset"],
  data() {
    return {
      dialog: false,
      loading: true,
      loading2: false,
      loadingPay: false,
      itemMonth: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      itemYear: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030"
      ],
      cardNumber: ""
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  },
  methods: {
    payButton() {
      this.loadingPay = true;
      setTimeout(() => {
        this.loadingPay = false;
        this.loading = true;

        this.$store
          .dispatch("pupils/postPayPupil", {
            _id: this.selectedChildren._id,
            foodType: this.selectedFoodType,
            summa: this.summa
          })
          .then(() => {
            this.$store
              .dispatch("zachisleno/postZachisleno", {
                id_uchenik: this.selectedChildren.id_uchenik,
                nomer_cheka: this.generateChekNumber(),
                summa: this.summa
              })
              .then(() => {
                this.$store.dispatch("snackbar/activate", {
                  text: "Платеж прошел успешно!",
                  color: "green"
                });
              });
            this.$store
              .dispatch("auth/getUserInfo")
              .then(() => {})
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("snackbar/activate", {
              text: "Ошибка оплаты",
              color: "error"
            });
          });

        setTimeout(() => {
          this.loading = false;
          this.dialog = false;
          this.reset();
        }, 2000);
      }, 4000);
    },
    generateChekNumber() {
      var min = 100000000000;
      var max = 999999999999;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    closeButton() {
      // this.loading = true;
      this.dialog = false;
    },
    formatCardNumber() {
      let temp = this.cardNumber;
      let last = 0;
      let newMass = [];
      let newString = "";

      temp = temp.replace(/\s/g, "");

      for (var i = 0; i < temp.length; i += 4) {
        newMass.push(temp.slice(i, i + 4));
      }

      for (var i = 0; i < newMass.length; i++) {
        if (newMass.length - 1 === i) {
          newString += newMass[i];
        } else {
          newString += newMass[i] + " ";
        }
      }

      this.cardNumber = newString;
    }
  }
};
</script>

<style lang="css" scoped>
.text-color-red{
  color: #C62828 !important;
}
.bg-grey-darken-5{
background: linear-gradient(to top, #fbfaf6, #fff);
}
.button-pay{
  font-family: 'DINPro-Medium';
color:
#4c3f12;
font-size: 14px;
text-transform: uppercase;
line-height: 18px;
padding: 5px 24px;
cursor: pointer;
background: #fee069;
background: linear-gradient(to bottom,
#ffe26a 0%,
#ffd210 100%);
border: none;
border-top-color: currentcolor;
border-top-style: none;
border-top-width: medium;
border-bottom-color: currentcolor;
border-bottom-style: none;
border-bottom-width: medium;
border-bottom: 1px solid
#ffc204;
border-top: 1px solid
#ffee86;
outline: 2px solid
#f0eee9;
text-shadow: 0 1px
rgba(255,255,255,0.5);
}
</style>
