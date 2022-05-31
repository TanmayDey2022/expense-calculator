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
                {{ percentageCalculatorForBudget() }}%
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
      :class="getBackgroundcolor(percentageCalculatorForBudget())"
    >
      <div class="card-header">
        <h4 class="text-white">Budget Status</h4>
      </div>
      <div class="card-body pt-5 pb-5 ps-2 pe-2">
        <div class="insight-card text-center">
          <h3>
            {{ getPerformanceText(percentageCalculatorForBudget()) }}, Tanmay!
          </h3>

          <p>
            You have spent {{ percentageCalculatorForBudget() }}% of your
            monthly income. You still have
            {{ 100 - percentageCalculatorForBudget() }}% to go.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calculation from "../../mixins/calculation.js";
export default {
  data() {
    return {
      totalExpense: 0,
      totalIncomes: 0,
    };
  },
  mixins: [Calculation],

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
  },
};
</script>
