<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "DoughnutChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
    },
    plugins: {
      type: Object,
    },
    incomes: {
      type: Object,
    },
    expenses: {
      type: Object,
    },
    barLables: {
      type: Object,
    },
    incomeLabel: {
      type: Array,
    },
   
  },

  data() {
    return {
      chartData: {
        labels: this.barLables,
        //datasets: [ { data: this.incomes }, { data: this.expenses } ]
        datasets: [
          {
            label: this.incomeLabel[0],
            backgroundColor: "#41b883",
            data: this.incomes,
          },
          {
            label: this.incomeLabel[1],
            backgroundColor: "#e46651",
            data: this.expenses,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
      },
    };
  },
};
</script>
