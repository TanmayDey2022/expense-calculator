<template>
  <Header />
  <div class="container">
    <div class="page-heading d-flex justify-content-between">
      <div class="heading-content">
        <div class="user-image">
          <img src="./assets/avatar.png" class="img-circle img-fluid" />
        </div>
        <div class="heading-title">
          <h2>Welcome back, Tanmay</h2>
          <p>This is your dashboard. It gives you an overview of everything.</p>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from "./components/layout/TheHeader.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss" scoped>
.container {
  padding-top: 125px;
}</style>
