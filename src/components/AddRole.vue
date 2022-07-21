<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> -->

  <!-- Modal -->
  <div
    class="modal fade"
    :id="roleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Add New Role</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input class="form-control" type="text" v-model="role" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" @click="saveRole">
            saveRole
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import apiClient from "../resources/baseUrl";
export default {
  props: ["roleModal"],
  data() {
    return {
      role: "",
      successMessage: "",
    };
  },
  methods: {
    
  },
};
</script>
