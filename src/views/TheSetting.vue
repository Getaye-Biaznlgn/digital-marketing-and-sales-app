<template>
  <base-card class="col-lg-6">
    <strong class="fw-bold fs-5 d-block mb-2">Account Setting</strong>
    <div class="border-bottom mb-3">
      <strong>Name</strong>
      <span class="ms-5 text-capitalize">{{ user.first_name + " " + user.last_name }}</span>
    </div>
    <div class="border-bottom mb-3">
      <strong>Email</strong> <span class="ms-5">{{ user.email }}</span>
    </div>
    <div class="border-bottom mb-3">
      <strong>Phone Number</strong>
      <span class="ms-5">{{ user.phone_numbers[0].phone_number }}</span>
    </div>
    <BaseButton @submit="showChangePasswordModal" title="Change Password"/>
  </base-card>

     <!-- change password -->
<base-modal :modalState="isModalVisible" title="Reset Password" @close="closeChangePasswordModal" btnLabel="Save" 
  :isLoading="isLoading" @submit="save">
     <form @submit.prevent>
      <div class="mb-2" :class="{ warining: v$.password.oldPassword.$error }">
        <label for="#oldPassword" class="form-label">Old Password</label>
        <input
          class="form-control"
          v-model.trim="password.oldPassword"
          @blur="v$.password.oldPassword.$touch"
          id="oldPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.oldPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-2" :class="{ warining: v$.password.newPassword.$error }">
        <label for="#newPassword" class="form-label">New Password</label>
        <input
          class="form-control"
          v-model.trim="password.newPassword"
          @blur="v$.password.newPassword.$touch"
          id="newPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.newPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div
        class="mb-2"
        :class="{ warining: v$.password.confirmPassword.$error }"
      >
        <label for="#confirmPassword" class="form-label"
          >Confirm Password</label
        >
        <input
          class="form-control"
          v-model.trim="password.confirmPassword"
          @blur="v$.password.confirmPassword.$touch"
          id="confirmPassword"
          type="password"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.password.confirmPassword.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>
    </form>
  </base-modal>
    <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers, sameAs, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import apiClient from "../resources/baseUrl";
export default {
  data() {
    return {
      v$: useValidate(),
      password: {
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      },
      isModalVisible: false,
      isLoading: false,
      // alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: "",
      timeout: "",
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    changeVisiblity(newValue) {
      this.isModalVisible = newValue;
    },
    showChangePasswordModal() {
      this.isModalVisible = true;
    },
    closeChangePasswordModal() {
      this.isModalVisible = false;
      this.password.newPassword = "";
      this.password.oldPassword = "";
      this.password.confirmPassword = "";
      this.v$.$reset();
    },
    async save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          let response = await apiClient.post("api/change_password", {
            new_password: this.password.newPassword,
            old_password: this.password.oldPassword,
          });
          if (response.status === 200) {
            this.setAlertData(true,"Password is changed successfully")
          } else {
            throw "";
          }
        } catch (e) {
         this.setAlertData(false,"Faild to change password")
        } finally {
          this.isLoading = false;
          this.closeChangePasswordModal()
          this.dismissAlert()
        }
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
  validations() {
    return {
      password: {
        newPassword: {
          required: helpers.withMessage(
            "New password can not be empty",
            required
          ),
          minLength:helpers.withMessage(
            "Password should be at least 8 characters long",
            minLength(8)
          )
          
        },
        oldPassword: {
          required: helpers.withMessage(
            "Old password can not be empty",
            required
          ),
        },
        confirmPassword: {
          required: helpers.withMessage("Confirm password", required),
          sameAs: helpers.withMessage(
            "Faild to confirm",
            sameAs(this.password.newPassword)
          ),
        },
      },
    };
  },
};
</script>
<style></style>