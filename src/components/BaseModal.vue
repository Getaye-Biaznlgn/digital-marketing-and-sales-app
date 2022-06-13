<template>
  <transition>
    <div
      v-if="modalState"
      class="modalm w-100 h-100 position-fixed top-0 pt-3 start-0"
      open
    >
      <div class="modal-body bg-white position-relative rounded mx-auto pt-0">
        <div class="bg-white position-sticky end-0 start-0 top-0">
          <div class="d-flex justify-content-between">
               <div class="fw-bold fs-5 py-1">
                  {{title}}
               </div>
               <span class="fs-5" role="button" @click="dismissModal">
                <i class="fas fa-times"></i>
               </span>
          </div>
        </div>
       <div class="mt-3 mb-2">
        <slot></slot>
       </div>
        <base-button
          class="mt-3"
          :title="btnLabel"
          :isLoading="isLoading"
           @submit="$emit('submit')"
         />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["modalState", "title", "btnLabel", "isLoading"],
  methods: {
    dismissModal() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.modalm {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-body {
  width: 90%;
  z-index: 999;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
/* modal transition */
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
@media (min-width: 801px) {
  .modal-body {
    width: 35em;
  }
}
/* @media (min-width: 600px) {
  .modal-body {
    max-width: 5em !important;
  }
} */
</style>
