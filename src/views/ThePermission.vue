<template>
  <DetailPage title="Permission">
    <div class="d-flex justify-content-between">
      <span class="fs-5 fw-bold text-capitalize"
        >Role:{{ $route.query.role }}</span
      >
      <BaseButton :isLoading="isLoading" @submit="assignPermissions" title="Save Changes" />
    </div>
    <form @submit.prevent class="mx-2">
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
   <!--  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
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
      isLoading:false,
      //
      isAlertVisible: false,
      isRequestSucceed:false,
      alertMessage:'',
      timeout: "",
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
        //
      } finally {
        //
      }
    },
    async assignPermissions() {
      // this.sendData.role=this.$route.params.id
      // this.sendData.permissions.push(this.checkValues)
      //            console.log(this.sendData)

      try {
        this.isLoading= true
        const res = await apiClient.post(
          "api/assign_permission/" + this.$route.params.id,
          { permissions: this.checkValues }
        );

        if (res.status === 200) {
           this.setAlertData(true, "Permission is changed successfuly");
        }
      } catch (error) {
        this.setAlertData(false, "Faild to change permissions");
      } finally {
        this.isLoading=false
        this.dismissAlert()
      }
    },
      dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
     setAlertData(isRequestSucceed, message) {
      this.isAlertVisible = true;
      this.alertMessage = message;
      this.isRequestSucceed = isRequestSucceed;
    },
  },
  beforeUnmount(){
    clearTimeout(this.timeout)
  },
  created() {
    this.getRolePermissions();
    this.getAllPermissions();
  },
};
</script>

<style></style>
