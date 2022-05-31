<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Overview",
});
</script>

<style scoped lang="scss">
.page-heading {
  overflow: hidden;
  margin-bottom: 40px;

  .heading-content {
    float: left;
    .user-image {
      width: 80px;
      height: 80px;
      float: left;
    }
  }
  .heading-title {
    padding-left: 103px;
    h2 {
      margin-top: 7px;
      color: #484848;
      font-weight: 600;
      margin-bottom: 6px;
    }
    p {
      color: #a5b2b9;
    }
  }
}
</style>
