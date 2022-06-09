<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" :class="size">
        <header class="bg-green d-flex justify-content-between">
          <slot name="header">
            <h4>{{ title }}</h4>
            <slot name="actions">
            <button type="button" class="btn-close" @click="tryClose"></button>
          </slot>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu>
          <slot name="actions">
            <button class="btn btn-danger" @click="tryClose">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
    },
  },
  emits: ["close"],
  created() {
    console.log(this.size);
  },
  methods: {
    tryClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 9999;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  color: white;
  width: 100%;
  padding: 1rem;
}

header h4 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

section {
  padding: 1rem;
}

menu {
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
  border-top: 1px solid #ddd;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 10rem);
    width: 20rem;
  }
  dialog.lg {
    width: 60%;
    margin: auto;
    left: 0;
    top: 0vh;
  }
}
</style>
