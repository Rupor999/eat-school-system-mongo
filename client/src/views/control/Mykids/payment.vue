<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Выбор ребенка</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2"
          >Выбор счета оплаты</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step step="3">Оплата</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-title primary-title>
              Выбор ребенка
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedChildren"
                :items="childrenCurrentUserData"
                label="Выберите ребенка"
                :item-text="returnFullFio"
                item-value="_id"
                return-object
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="selectedChildren == 0"
                color="primary"
                @click="e1 = 2"
              >
                Продолжить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title primary-title>
              Выбор счета
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedFoodType"
                :items="foodType"
                label="Выберите счет питания"
                item-text="text"
                item-value="value"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="selectedFoodType == 0"
                color="primary"
                @click="e1 = 3"
              >
                Продолжить
              </v-btn>

              <v-btn @click="e1 = e1 - 1" text>Назад</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-title primary-title>
              Информация к оплате
            </v-card-title>
            <v-card-text class="d-flex flex-row justify-space-around">
              <div>
                <div class="title">
                  ФИО: {{ selectedChildren.familia }}
                  {{ selectedChildren.imya }}
                  {{ selectedChildren.otchestvo }}
                </div>
                <div class="title">
                  Счет оплаты: {{ selectedChildren.id_uchenik }}
                </div>
                <div class="title">Тип счета: {{ selectedFoodType }}</div>
              </div>
              <div class="title">
                <v-text-field
                  suffix="Руб."
                  class="mt-5"
                  v-model="summa"
                  label="Введите сумму пополнения"
                  placeholder="Сумма"
                  dense
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="e1 = e1 - 1" text>Назад</v-btn>
              <Payment
                v-show="summa > 0"
                v-bind:reset="reset"
                v-bind:selectedChildren="selectedChildren"
                v-bind:selectedFoodType="selectedFoodType"
                v-bind:summa="summa"
              />
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import Payment from "@/views/control/Mykids/modalWindow/payment";

export default {
  components: {
    Payment
  },
  data() {
    return {
      e1: 1,
      selectedChildren: 0,
      selectedFoodType: 0,
      summa: 0,
      foodType: [
        { text: "Буфет", value: "Буфет" },
        { text: "Горячее питание", value: "ГП" }
      ]
    };
  },
  methods: {
    returnFullFio(data) {
      return (
        data.id_uchenik +
        " - " +
        data.familia +
        " " +
        data.imya +
        " " +
        data.otchestvo
      );
    },
    reset() {
      this.e1 = 1;
      this.selectedChildren = 0;
      this.selectedFoodType = 0;
      this.summa = 0;
    }
  },
  computed: {
    childrenCurrentUserData() {
      return this.$store.getters["auth/getUserAdditional"].children;
    }
  }
};
</script>

<style lang="css" scoped></style>
