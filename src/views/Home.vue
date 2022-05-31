<template>
  <div class="row overview-widgets">
    <div class="col-md-4">
      <div
        class="card text-white p-0"
        :class="getBackgroundcolor(percentageCalculator())"
      >
        <div class="card-header">
          <h4 class="text-white">Budget Status</h4>
        </div>
        <div class="card-body p-5">
          <div class="insight-card text-center">
            <h3>{{ getPerformanceText(percentageCalculator()) }}, Tanmay!</h3>

            <p>
              You have spent {{ percentageCalculator() }}% of your monthly
              income. You still have {{ 100 - percentageCalculator() }}% to go.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-0">
        <div class="card-header text-center">
          <h4>Transactions</h4>
        </div>
        <div class="card-body p-2">
          <div class="transaction-amount">
            <!-- item -->
            <div class="transaction-amount-item">
              <div class="transaction-icon">
                <i class="mdi mdi-checkbox-blank-circle text-success"></i>
              </div>
              <div class="transaction-info">
                <strong>₹{{ totalIncomes }}</strong>
                <span>Income</span>
              </div>
            </div>
            <!-- item -->
            <div class="transaction-amount-item">
              <div class="transaction-icon">
                <i class="mdi mdi-checkbox-blank-circle text-danger"></i>
              </div>
              <div class="transaction-info">
                <strong>₹{{ totalExpense }}</strong>
                <span>Expenses</span>
              </div>
            </div>
            <!-- item -->
            <div class="transaction-amount-item">
              <div class="transaction-icon">
                <i class="mdi mdi-checkbox-blank-circle text-info"></i>
              </div>
              <div class="transaction-info">
                <strong>₹{{ totalIncomes - totalExpense }}</strong>
                <span>Savings</span>
              </div>
            </div>
          </div>

          <div class="transaction-visual">
            <DoughnutChart
              :incomes="totalIncomes"
              :expenses="totalExpense"
              :savings="totalIncomes - totalExpense"
              :labels="getDoughnutLabels()"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-0">
        <div class="card-header">
          <h4 class="text-center">Budget Status</h4>
        </div>
        <div class="card-body p-2">
          <div class="transaction-progress">
            <div class="item">
              <div class="d-flex justify-content-between">
                <p class="text-success">
                  <i
                    class="mdi mdi-checkbox-blank-circle-outline text-primary"
                  ></i>
                  Income
                </p>
                <strong class="">{{ countTotalIncomes() }} Transactions</strong>
              </div>

              <div class="progress">
                <div
                  class="progress-bar bg-success progress-bar-striped"
                  role="progressbar"
                  aria-valuenow="78"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="width: 100%"
                >
                  ₹{{ totalIncomes }}
                </div>
              </div>
            </div>
            <div class="item mt-5">
              <div class="d-flex justify-content-between">
                <p class="text-danger">
                  <i
                    class="mdi mdi-checkbox-blank-circle-outline text-danger"
                  ></i>
                  Expenses
                </p>
                <strong class=""
                  >{{ countTotalExpenses() }} Transactions</strong
                >
              </div>

              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped bg-danger expenses-progress"
                  role="progressbar"
                  aria-valuenow="56"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {{ percentageCalculator() }} % Spent
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="row transaction-links">
              <div class="col-md-12">
                <p class="text-center mt-2">View all transaction records</p>
              </div>
              <div class="d-flex justify-content-around">
                <router-link
                  to="/expense"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  Expense</router-link
                >

                <router-link
                  to="/income"
                  class="btn btn-success btn-sm"
                  type="button"
                >
                  Income</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="card p-0">
        <div class="card-header">
          <h4>
            <span class="reports-title p-0">Last 30 day's activities</span>
          </h4>
        </div>
        <div class="card-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3 bg-light">
                <div class="figure-section">
                  <p>Total Income</p>
                  <div class="d-flex justify-content-between">
                    <h2 class="text-success reports-income">
                      ₹{{ totalIncomes }}
                    </h2>
                    <span
                      class="badge badge-primary income-count"
                      data-toggle="tooltip"
                      data-original-title="Transactions"
                      >{{ countTotalIncomes() }} Trns.</span
                    >
                  </div>
                </div>

                <div class="figure-section">
                  <p>Total Expenses</p>
                  <div class="d-flex justify-content-between">
                    <h2 class="text-danger reports-expenses">
                      ₹{{ totalExpense }}
                    </h2>
                    <span
                      class="badge badge-danger expenses-count"
                      data-toggle="tooltip"
                      data-original-title="Transactions"
                      >{{ countTotalExpenses() }} Trns.</span
                    >
                  </div>
                </div>
                <div class="figure-section">
                  <div class="d-flex justify-content-between">
                    <p>Total Expenses</p>
                    <span class="text-danger text-end fw-bold">Amount</span>
                  </div>

                  <table>
                    <tbody class="top-expenses">
                      <tr
                        v-for="(expense, index) of getAllUserExpenses()"
                        :key="index"
                      >
                        <td>{{ expense.title }}</td>
                        <td class="text-end text-danger">
                          {{ expense.amount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-9">
                <div>
                  <BarChart
                    :incomes="getIncomesData()"
                    :expenses="getExpensesData()"
                    :bar-lables="dayList"
                    :income-label="[
                      ['income (₹' + totalIncomes + ')'],
                      ['Expense (₹' + totalExpense + ')'],
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calculation from "../mixins/calculation.js";
import { defineComponent } from "vue";
import DoughnutChart from "../components/charts/doughnutChart.vue";
import BarChart from "../components/charts/barChart.vue";

export default defineComponent({
  name: "Home",
  components: {
    DoughnutChart,
    BarChart,
  },
  mixins: [Calculation],
  data() {
    return {
      totalExpense: 0,
      totalIncomes: 0,
      dayList: [],
    };
  },
  mounted() {
    this.setProgressWidth();
  },

  methods: {
    countTotalIncomes() {
      return localStorage.getItem("incomes")
        ? JSON.parse(localStorage.getItem("incomes")).length
        : 0;
    },

    countTotalExpenses() {
      return localStorage.getItem("expenses")
        ? JSON.parse(localStorage.getItem("expenses")).length
        : 0;
    },
    getTotalSpend() {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      this.totalExpense = this.totalCalculate(expenses);
      return this.totalExpense;
    },

    getTotalIncome() {
      let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
      this.totalIncomes = this.totalCalculate(incomes);
      return this.totalIncomes;
    },

    chartData() {
      let data = [10, 20, 80];
      return data;
    },
    getIncomesData() {
      let data = this.getLastDaysIncome();
      return data;
    },
    getExpensesData() {
      let data = this.getLastDaysExpense();
      return data;
    },

    last30DaysList(list) {
      const currentDate = new Date();
      const currentDateTime = currentDate.getTime();
      const last30DaysDate = new Date(
        currentDate.setDate(currentDate.getDate() - 30)
      );
      const last30DaysDateTime = last30DaysDate.getTime();

      return list
        .filter((x) => {
          const elementDateTime = new Date(x.date).getTime();
          if (
            elementDateTime <= currentDateTime &&
            elementDateTime > last30DaysDateTime
          ) {
            return true;
          }
          return false;
        })
        .sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
    },
    getDatesInRange(startDate, endDate) {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date(startDate.getTime());
      const dates = [];
      const dateMonth = [];
      while (date <= endDate) {
        dates.push(
          (
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2)
          ).toString()
        );
        dateMonth.push(
          ("0" + date.getDate()).slice(-2) + " " + monthNames[date.getMonth()]
        );
        date.setDate(date.getDate() + 1);
      }
      this.dayList = dateMonth;
      return dates;
    },

    getLastDaysIncome() {
      let list = JSON.parse(localStorage.getItem("incomes")) || [];
      let dateList = this.getDatesInRange(
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date()
      );
      const allMatchedData = dateList.reduce((newArr, date) => {
        const match = list.find((d) => {
          return d.date == date;
        });
        if (match) {
          newArr.push(parseFloat(match.amount));
        } else {
          newArr.push(0);
        }
        if (list.includes(date)) newArr.push(date);

        return newArr;
      }, []);
      return allMatchedData;
    },

    getLastDaysExpense() {
      let list = JSON.parse(localStorage.getItem("expenses")) || [];
      let dateList = this.getDatesInRange(
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date()
      );
      const allMatchedData = dateList.reduce((newArr, date) => {
        const match = list.find((d) => {
          return d.date == date;
        });
        if (match) {
          newArr.push(parseFloat(Math.abs(match.amount) * -1));
        } else {
          newArr.push(0);
        }
        if (list.includes(date)) newArr.push(date);

        return newArr;
      }, []);
      return allMatchedData;
    },

    getAllUserExpenses() {
      let allExpense;
      allExpense = JSON.parse(localStorage.getItem("expenses")) || [];
      return allExpense;
    },

    getDoughnutLabels() {
      return ["incomes", "expenses", "savings"];
    },
    setProgressWidth() {
      const percentage = this.percentageCalculator();
      document.querySelector(".expenses-progress").style.width =
        parseInt(percentage) + "%";
    },
  },
});
</script>

<style scoped lang="scss"></style>
