export default {
  methods: {
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
    totalCalculate(obj) {
      const total = obj.reduce((total, income) => {
        return total + parseFloat(income.amount);
      }, 0);
      return total;
    },

    percentageCalculator() {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      this.totalExpense = this.totalCalculate(expenses);

      let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
      this.totalIncomes = this.totalCalculate(incomes);

      if ((this.totalExpense, this.totalIncomes)) {
        let percentage = (this.totalExpense / this.totalIncomes) * 100;
        return Math.round(percentage);
      } else {
        return 0;
      }
    },

    percentageCalculatorForBudget() {
      let percentage = (this.totalExpense / this.totalIncomes) * 100;
      if (percentage > 0) {
        this.setStrokeDasharray(percentage.toFixed(2));
        return Math.round(percentage);
      } else {
        return 0;
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
