<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">Статистика</h1>
      </v-card-title>
      <v-card>
        <v-card-title class="d-flex justify-center" primary-title>
          Продажи по категориям
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <sellCategoryChart
            v-if="dataSellCategory"
            class="chartSizeHeight chartSizeWidth"
            :chartdata="dataSellCategory"
          />
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class="d-flex justify-center" primary-title>
          Продажи по месяцам
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <BarChart
            class="chartSizeHeight chartSizeWidth"
            v-if="dataSellMonth"
            :chartdata="dataSellMonth"
          />
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import sellCategoryChart from "@/views/control/Statistic/PieChart";
import BarChart from "@/views/control/Statistic/BarChart";

export default {
  components: {
    sellCategoryChart,
    BarChart
  },
  async mounted() {
    await this.$store.dispatch("rashodovano/getRashodovano");
    await this.$store.dispatch("categoriesBufet/getCategoriesBufet");
    this.dataSellCategory = await this.sellCategoryChartData();
    this.dataSellMonth = await this.sellMonthChartData();
  },
  data() {
    return {
      loadingSellCategory: true,
      dataSellCategory: 0,
      dataSellMonth: 0
    };
  },
  methods: {
    generateColor() {
      var min = 0;
      var max = 255;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    sellCategoryChartData() {
      return new Promise(resolve => {
        let data = {
          labels: [],
          datasets: []
        };
        let dataset = {
          label: "Продажи по категориям",
          backgroundColor: [],
          borderColor: "rgb(255, 255, 255)",
          data: [],
          borderWidth: 1
        };

        data.labels = this.categoriesBufetData.map(item => item.kategoriya);

        for (var i = 0; i < data.labels.length; i++) {
          dataset.backgroundColor.push(
            `rgb(${this.generateColor()}, ${this.generateColor()}, ${this.generateColor()})`
          );
        }
        for (var i = 0; i < data.labels.length; i++) {
          dataset.data.push(
            this.rashodovanoData.reduce((sum, item) => {
              return item.id_bufet.id_kategoriya ==
                this.categoriesBufetData[i]._id
                ? sum + 1
                : sum;
            }, 0)
          );
        }
        data.datasets.push(dataset);
        resolve(data);
      });
    },
    sellMonthChartData() {
      return new Promise(resolve => {
        let data = {
          labels: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
          ],
          datasets: []
        };
        let dataset = {
          label: "Продажи по месяцам",
          backgroundColor: [],
          borderColor: "rgb(255, 255, 255)",
          data: [],
          borderWidth: 1
        };

        for (var i = 0; i < data.labels.length; i++) {
          dataset.backgroundColor.push(
            `rgb(${this.generateColor()}, ${this.generateColor()}, ${this.generateColor()})`
          );
        }

        for (var i = 0; i < data.labels.length; i++) {
          dataset.data.push(
            this.rashodovanoData.reduce((sum, item) => {
              return item.data_spisania.slice(5, 7) == i + 1 ? sum + 1 : sum;
            }, 0)
          );
        }

        data.datasets.push(dataset);
        resolve(data);
      });
    }
  },
  computed: {
    rashodovanoData: function() {
      return this.$store.getters["rashodovano/getRashodovano"];
    },
    categoriesBufetData: function() {
      return this.$store.getters["categoriesBufet/getCategoriesBufet"];
    }
  }
};
</script>

<style lang="css" scoped>
.chartSizeHeight {
  height: 600px;
}
.chartSizeWidth {
  width: 600px;
}
</style>
