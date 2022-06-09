<template>
  <div class="row" :key="updateBadgeKey">
    <div class="col-md-8">
      <div
        class="h-100 d-flex flex-column align-items-center justify-content-center"
        v-if="getAllUserExpenses().length === 0"
      >
        <h3>No Record Found.</h3>
        <button
          type="button"
          class="btn btn-success mt-1 mb-1 btn-sm"
          @click="isShowModal = !isShowModal"
        >
          Add Expense
        </button>
        <button
          type="button"
          class="btn btn-danger mt-1 mb-1 btn-sm"
          @click="isShowExpenseCatModal = !isShowExpenseCatModal"
        >
          Add Expense Category
        </button>
      </div>
      <div class="card p-0" v-else>
        <div
          class="card-header"
        >
          <h4>Expense records</h4>
          <button
            type="button"
            class="btn btn-success mt-1 mb-1 btn-sm float-end"
            @click="isShowModal = !isShowModal"
          >
            Add Expense
          </button>

           <button
          type="button"
          class="btn btn-danger mt-1 mb-1 btn-sm float-end me-2"
          @click="isShowExpenseCatModal = !isShowExpenseCatModal"
        >
          Add Expense Category
        </button>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(expense, index) of getAllUserExpenses()"
                  :key="index"
                >
                  <th>{{ index + 1 }}</th>
                  <td>{{ expense.title }}</td>
                  <td>{{ expense.category }}</td>
                  <td>{{ expense.amount }}</td>
                  <td>{{ expense.date }}</td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deleteExpense(index)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <base-budge></base-budge>
  </div>

  <base-dialog
    :show="isShowExpenseCatModal"
    title="Record Expense Category"
    :fixed="true"
    @close="isShowExpenseCatModal = !isShowExpenseCatModal"
  >
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >Expense Category</label
      >
      <input
        type="text"
        class="form-control"
        name="title"
        v-model="expenseCategory"
      />
    </div>

    <div class="d-grid gap-2">
      <button
        class="btn btn-success"
        type="button"
        @click="saveExpenseCategory()"
      >
        Save Expense Category
      </button>
    </div>
  </base-dialog>

  <base-dialog
    :show="isShowModal"
    title="Record Expense"
    :data="getExpenceTypes()"
    :fixed="true"
    @close="isShowModal = !isShowModal"
  >
    <h5>Save a new expense record.</h5>
    <form method="post" @submit.prevent="saveExpense()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input type="text" class="form-control" name="title" v-model="title" />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Amount</label>
        <input
          type="text"
          class="form-control"
          name="amount"
          v-model="amount"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category</label>
        <select class="form-select" name="category" v-model="category">
          <option selected disabled>select one option</option>
          <option
            :value="expenceType"
            v-for="(expenceType, index) of expenceTypes"
            :key="index"
          >
            {{ expenceType }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Date</label>
        <input type="date" class="form-control" name="date" v-model="date" />
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-success" type="submit">Save Expense</button>
      </div>
    </form>
  </base-dialog>
</template>
<script>
import Calculation from "../mixins/calculation.js";
export default {
  data() {
    return {
      isShowModal: false,
      expenceTypes: ["Food", "Rent", "Living", "Transportation"],
      title: "",
      amount: "",
      category: "",
      date: "",
      updateBadgeKey: 0,
      isShowExpenseCatModal: false,
    };
  },
  mixins: [Calculation],
  methods: {
    getExpenceTypes() {
      return this.expenceTypes ;
    },
    saveExpense() {
      if ((!this.title, !this.amount, !this.category, !this.date)) {
        alert("All feilds are required");
        return false;
      }
      let expense;
      expense = JSON.parse(localStorage.getItem("expenses")) || [];
      expense.push({
        title: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
      });
      localStorage.setItem("expenses", JSON.stringify(expense));
      this.title = "";
      this.amount = "";
      this.category = "";
      this.date = "";
      this.isShowModal = !this.isShowModal;
      this.updateBadge();
    },

    updateBadge() {
      this.updateBadgeKey++;
    },
    deleteExpense(index) {
      let text = "Are you sure to delete this expense";
      if (confirm(text) === true) {
        const existingExpenses = JSON.parse(localStorage.getItem("expenses"));
        existingExpenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(existingExpenses));
        this.updateBadge();
      }
    },

    saveExpenseCategory() {
      console.log(this.expenseCategory);
      if (this.expenceTypes.includes(this.expenseCategory)) {
        alert(`Sorry ${this.expenseCategory} Already Exists!`);
      }
      this.expenceTypes.push(this.expenseCategory);
      localStorage.setItem("expensecategory", this.expenceTypes);
      this.isShowExpenseCatModal = false;
      this.expenseCategory = "";
    },
  },
};
</script>
