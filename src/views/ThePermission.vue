<template>
  <DetailPage title="Permission">
    <div class="d-flex justify-content-between">
      <span class="fs-5 fw-bold text-capitalize"
        >Role:{{ $route.query.role }}</span
      >
      <BaseButton @submit="assignPermissions" title="Save Changes" />
    </div>
    <form @submit.prevent>
      <div class="d-inline">
        <div
          class="form-check"
          v-for="permission in permissions"
          :key="permission.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            v-model="checkValues"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ permission.name }}
          </label>
        </div>
      </div>
    </form>
  </DetailPage>
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  data() {
    return {
      permissions: "",
      rolePermissions: [],
      sendData: {
        sendpermissions: [],
      },
      checkValues: [],
    };
  },

  methods: {
    async getAllPermissions() {
      try {
        this.$store.commit('setIsLoading', true)
        const res = await apiClient.get("api/permissions");

        if (res.status === 200) {
          this.permissions = res.data;
        }
      } catch (error) {
        //
      } finally {
  
        this.$store.commit('setIsLoading', false)
      }
    },

    async getRolePermissions() {
      try {
        const res = await apiClient.get("api/roles/" + this.$route.params.id);

        if (res.status === 200) {
          this.rolePermissions = res.data;
          this.checkValues = res.data;
        }
      } catch (error) {
        console.log("jj");
      } finally {
        console.log("jj");
      }
    },
    async assignPermissions() {
      // this.sendData.role=this.$route.params.id
      // this.sendData.permissions.push(this.checkValues)
      //            console.log(this.sendData)

      try {
        const res = await apiClient.post(
          "api/assign_permission/" + this.$route.params.id,
          { permissions: this.checkValues }
        );

        if (res.status === 200) {
          console.log("permission granted");
        }
      } catch (error) {
        console.log("jj");
      } finally {
        console.log("jj");
      }
    },
  },
  created() {
    this.getRolePermissions();
    this.getAllPermissions();
  },
};
</script>

<style></style>
