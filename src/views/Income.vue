<template>
  <div class="row" :key="updateBadgeKey">
    <div class="col-md-8">
      <div
        class="h-100 d-flex flex-column align-items-center justify-content-center"
        v-if="getAllUserIncomes().length == 0"
      >
        <h3>No Record Found.</h3>
        <button
          type="button"
          class="btn btn-success mt-1 mb-1 btn-sm"
          @click="isShowModal = !isShowModal"
        >
          Add Income
        </button>
        <button
          type="button"
          class="btn btn-danger mt-1 mb-1 btn-sm"
          @click="isShowIncomeCatModal = !isShowIncomeCatModal"
        >
          Add Income Category
        </button>
      </div>
      <div class="card p-0" v-else>
        <div
          class="card-header"
        >
          <h4>Income records</h4>
          <button
            type="button"
            class="btn btn-success mt-1 mb-1 btn-sm float-end"
            @click="isShowModal = !isShowModal"
          >
            Add Income
          </button>
          <button
          type="button"
          class="btn btn-danger mt-1 mb-1 btn-sm float-end me-2"
          @click="isShowIncomeCatModal = !isShowIncomeCatModal"
        >
          Add Income Category
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
                  v-for="(expense, index) of getAllUserIncomes()"
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
                      @click="deleteIncome(index)"
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
    <base-dialog
      :show="isShowModal"
      title="Record Income"
      @close="isShowModal = !isShowModal"
    >
      <h5>Save a new income record.</h5>
      <form method="post" @submit.prevent="saveIncome()">
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
              :value="incomeType"
              v-for="(incomeType, index) of getIncomeTypes()"
              :key="index"
            >
              {{ incomeType }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Date</label>
          <input type="date" class="form-control" name="date" v-model="date" />
        </div>

        <div class="d-grid gap-2">
          <button class="btn btn-success" type="submit">Save Income</button>
        </div>
      </form>
    </base-dialog>

    <base-dialog
      :show="isShowIncomeCatModal"
      title="Record Income Category"
      :fixed="true"
      @close="isShowIncomeCatModal = !isShowIncomeCatModal"
    >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Income Category</label
        >
        <input
          type="text"
          class="form-control"
          name="title"
          v-model="incomeCategory"
        />
      </div>

      <div class="d-grid gap-2">
        <button
          class="btn btn-success"
          type="button"
          @click="saveIncomeCategory()"
        >
          Save Income Category
        </button>
      </div>
    </base-dialog>
    <base-budge></base-budge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowModal: false,
      incomeTypes: ["Salary", "Other"],
      title: "",
      amount: "",
      category: "",
      date: "",
      updateBadgeKey: 0,
      isShowIncomeCatModal: false,
      incomeCategory: "",
    };
  },
  methods: {
    getIncomeTypes() {
      return this.incomeTypes;
    },
    saveIncome() {
      if ((!this.title, !this.amount, !this.category, !this.date)) {
        alert("All feilds are required");
        return false;
      }
      let income;
      income = JSON.parse(localStorage.getItem("incomes")) || [];
      income.push({
        title: this.title,
        amount: this.amount,
        category: this.category,
        date: this.date,
      });
      localStorage.setItem("incomes", JSON.stringify(income));
      this.title = "";
      this.amount = "";
      this.category = "";
      this.date = "";
      this.isShowModal = !this.isShowModal;
      this.updateBadge();
    },

    getAllUserIncomes() {
      let allExpense;
      allExpense = JSON.parse(localStorage.getItem("incomes")) || [];
      return allExpense;
    },
    updateBadge() {
      this.updateBadgeKey++;
    },
    deleteIncome(index) {
      let text = "Are you sure to delete this income";
      if (confirm(text) === true) {
        const existingincomes = JSON.parse(localStorage.getItem("incomes"));
        existingincomes.splice(index, 1);
        localStorage.setItem("incomes", JSON.stringify(existingincomes));
        this.updateBadge();
      }
    },

    saveIncomeCategory() {
      if (this.incomeTypes.includes(this.incomeCategory)) {
        alert(`Sorry ${this.incomeCategory} Already Exists!`);
      }
      this.incomeTypes.push(this.incomeCategory);
      localStorage.setItem("expensecategory", this.incomeTypes);
      this.isShowIncomeCatModal = false;
      this.incomeCategory = "";
    },
  },
};
</script>
