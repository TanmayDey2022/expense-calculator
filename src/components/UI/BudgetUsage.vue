<template>
  <div class="col-md-4">
    <div class="card p-0">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h4>Budget Usage</h4>
      </div>
      <div class="card-body pt-5 pb-5 ps-2 pe-2">
        <section class="text-center">
          <svg
            class="circle-chart"
            viewBox="0 0 33.83098862 33.83098862"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="circle-chart__background"
              stroke="#efefef"
              stroke-width="2"
              fill="none"
              cx="16.91549431"
              cy="16.91549431"
              r="15.91549431"
            ></circle>
            <circle
              id="circle-chart-percentage"
              class="circle-chart__circle"
              stroke="#F4BE4A"
              stroke-width="2"
              stroke-linecap="round"
              fill="none"
              cx="16.91549431"
              cy="16.91549431"
              r="15.91549431"
            ></circle>
            <g class="circle-chart__info">
              <text
                class="circle-chart__percent"
                x="16.91549431"
                y="15.5"
                alignment-baseline="central"
                text-anchor="middle"
                font-size="8"
              >
                {{ percentageCalculator() }}%
              </text>
              <text
                class="circle-chart__subline"
                x="16.91549431"
                y="20.5"
                alignment-baseline="central"
                text-anchor="middle"
                font-size="2"
              >
                ₹{{ getTotalSpend() }} Spent!
              </text>
            </g>
          </svg>
          <div class="chart-insights">
            <p>You have spent</p>
            <h4>
              <strong>₹{{ getTotalSpend() }}</strong> out of
              <strong>₹{{ getTotalIncome() }}</strong>
            </h4>
          </div>
        </section>
        <div></div>
      </div>
    </div>

    <div
      class="card text-white p-0"
      :class="getBackgroundcolor(percentageCalculator())"
    >
      <div class="card-header">
        <h4 class="text-white">Budget Status</h4>
      </div>
      <div class="card-body pt-5 pb-5 ps-2 pe-2">
        <div class="insight-card text-center">
          <h3>{{ getPerformanceText(percentageCalculator()) }}, Tanmay!</h3>

          <p>
            You have spent {{ percentageCalculator() }}% of your expected
            monthly budget. You still have {{ 100 - percentageCalculator() }}%
            to go.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalExpense: 0,
      totalIncomes: 0,
    };
  },

  methods: {
    getTotalSpend() {
      let expenses = JSON.parse(localStorage.getItem("expenses"));
      this.totalExpense = this.totalCalculate(expenses);
      return this.totalExpense;
    },

    getTotalIncome() {
      let incomes = JSON.parse(localStorage.getItem("incomes"));
      this.totalIncomes = this.totalCalculate(incomes);
      return this.totalIncomes;
    },

    totalCalculate(obj) {
      if(!obj){
        return 0
      }
      const total = obj.reduce((total, income) => {
        return total + parseFloat(income.amount);
      }, 0);
      return total;
    },

    percentageCalculator() {
      let percentage = (this.totalExpense / this.totalIncomes) * 100;
      if (percentage > 0) {
        this.setStrokeDasharray((percentage).toFixed(2));
        return Math.round(percentage);
      } else {
        return 0;
      }
    },

    getBackgroundcolor(percentage) {
      if (percentage < 30) {
        return "bg-green";
      } else if (percentage > 30 && percentage < 60) {
        return "bg-warning";
      } else {
        return "bg-danger";
      }
    },

    getPerformanceText(percentage) {
      if (percentage < 30) {
        return "Looking good";
      } else if (percentage > 30 && percentage < 60) {
        return "Be cautious";
      } else {
        return "Oh no!";
      }
    },

    setStrokeDasharray(percentage) {
      var chart = document.querySelector("#circle-chart-percentage");
      if (chart) {
        chart.style.strokeDasharray = percentage + "," + 100;
      }
      return;
    },
  },
};
</script>
