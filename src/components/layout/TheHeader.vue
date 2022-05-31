<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold"> Expence</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"> Overview</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/expense" class="nav-link" active-class="active"> Expense</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/income" class="nav-link" active-class="active"> Income</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.bg-primary {
    background-color: #41b883!important;
}
  .navbar-light .navbar-nav .nav-link.active{
    font-weight: 600;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: #fff;
}
.navbar-dark .navbar-nav .nav-link.active{
  color: #fff !important;
  font-weight: 600;
  border-bottom: 2px solid #fff;
}
</style>
