<template>
  <div class="row" :key="updateBadgeKey">
    <div class="col-md-8">
      <div class="card p-0">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h4>Expense records</h4>
          <button
            type="button"
            class="btn btn-success mt-1 mb-1 btn-sm"
            @click="isShowModal = !isShowModal"
          >
            Add Expense
          </button>
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
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  v-model="title"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Amount</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="amount"
                  v-model="amount"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Category</label
                >
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
                <input
                  type="date"
                  class="form-control"
                  name="date"
                  v-model="date"
                />
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-success" type="submit">
                  Save Expense
                </button>
              </div>
            </form>
          </base-dialog>
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
</template>
<script>
export default {
  data() {
    return {
      isShowModal: false,
      expenceTypes: Object,
      title: "",
      amount: "",
      category: "",
      date: "",
      updateBadgeKey: 0,
    };
  },
  methods: {
    getExpenceTypes() {
      return (this.expenceTypes = ["Food", "Rent", "Living", "Transportation"]);
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

    getAllUserExpenses() {
      let allExpense;
      allExpense = JSON.parse(localStorage.getItem("expenses")) || [];
      return allExpense;
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
  },
};
</script>
