<template>
  <div>
    <button
      class="btn btn-bg-primary d-block ms-auto px-3 text-white"
      type="submit"
      @click="$emit('submit')"
    >
      <span v-if="isLoading">
        <span
          class="spinner-border spinner-border-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
      </span>
      <span>{{ title }}</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default:false
    },
    title: {
      type: String,
      default: "OK",
    },
  },
};
</script>
<style scoped>
.btn-bg-primary {
  background-color: #ff7e00;
}
</style>
