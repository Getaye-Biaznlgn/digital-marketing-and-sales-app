<template>
  <div class="bg-light-grey p-2 pb-5">
    <span
      @click="$router.back()"
      role="button"
      class="text-dark-blue pe-2 fw-bold fs-5"
      ><i class="fas fa-arrow-left"></i>Back</span
    >
    <form @submit.prevent class="row mx-2">
      <base-card class="mt-2 col-lg-6">
        <div class="fs-5 mb-2 fw-bold">Agent shop Info</div>
        <div class="mb-2" :class="{ warining: v$.shop.shop_name.$error }">
          <label for="shop_name" class="form-label">Shop name</label>
          <input
            type="text"
            class="form-control"
            id="shop_name"
            v-model.trim="shop.shop_name"
            @blur="v$.shop.shop_name.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.shop.shop_name.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>

        <div class="row">
          <div
            class="mb-2 col-md-6"
            :class="{ warining: v$.shop.region.$error }"
          >
            <label for="region" class="form-label">Region</label>
            <input
              type="text"
              class="form-control"
              id="region"
              v-model.trim="shop.region"
              @blur="v$.shop.region.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.region.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div class="mb-2 col-md-6" :class="{ warining: v$.shop.zone.$error }">
            <label for="zone" class="form-label">Zone</label>
            <input
              type="text"
              class="form-control"
              id="zone"
              v-model.trim="shop.zone"
              @blur="v$.shop.zone.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.zone.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
        </div>

        <div class="row">
          <div
            class="mb-2 col-md-6"
            :class="{ warining: v$.shop.woreda.$error }"
          >
            <label for="woreda" class="form-label">Woreda</label>
            <input
              type="text"
              class="form-control"
              id="woreda"
              v-model.trim="shop.woreda"
              @blur="v$.shop.woreda.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.woreda.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div class="mb-2 col-md-6" :class="{ warining: v$.shop.city.$error }">
            <label for="city" class="form-label">City</label>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model.trim="shop.city"
              @blur="v$.shop.city.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.city.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
        </div>

        <div class="mb-2" :class="{ warining: v$.shop.kebele.$error }">
          <label for="kebele" class="form-label">Kebele</label>
          <input
            type="text"
            class="form-control"
            id="kebele"
            v-model.trim="shop.kebele"
            @blur="v$.shop.kebele.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.shop.kebele.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-2" :class="{ warining: v$.shop.house_no.$error }">
          <label for="house_no" class="form-label">House no</label>
          <input
            type="text"
            class="form-control"
            id="house_no"
            v-model.trim="shop.house_no"
            @blur="v$.shop.house_no.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.shop.house_no.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div class="row mb-2">
          <div class="col-6">
            <label for="latitude">Latitude</label>
            <input
              disabled
              type="text"
              class="form-control"
              id="latitude"
              v-model.trim="shop.latitude"
            />
          </div>
          <div class="col-6">
            <label for="longitude">Longitude</label>
            <input
              disabled
              type="text"
              class="form-control"
              id="longitude"
              v-model.trim="shop.longitude"
            />
          </div>
        </div>
        <MapLoader @selectPosition="setCoordinates" />
      </base-card>
      <!-- second column -->

      <base-card class="mt-2 col-lg-5">
        <div class="fs-5 mb-2 fw-bold">Owner Info</div>
        <div class="row">
          <div
            class="mb-2 col-md-6"
            :class="{ warining: v$.shop.first_name.$error }"
          >
            <label for="first_name" class="form-label">First name</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              v-model.trim="shop.first_name"
              @blur="v$.shop.first_name.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.first_name.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div
            class="mb-2 col-md-6"
            :class="{ warining: v$.shop.last_name.$error }"
          >
            <label for="last_name" class="form-label">Last name</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              v-model.trim="shop.last_name"
              @blur="v$.shop.last_name.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.shop.last_name.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
        </div>

        <div class="mb-2" :class="{ warining: v$.shop.email.$error }">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model.trim="shop.email"
            @blur="v$.shop.email.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.shop.email.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-2" :class="{ warining: v$.shop.phone_number1.$error }">
          <label for="phone_number1" class="form-label">Phone No I</label>
          <input
            type="text"
            class="form-control"
            id="phone_number1"
            v-model.trim="shop.phone_number1"
            @blur="v$.shop.phone_number1.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.shop.phone_number1.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-2">
          <label for="phone_numbers2" class="form-label">Phone No II</label>
          <input
            type="text"
            class="form-control"
            id="phone_numbers2"
            v-model.trim="shop.phone_number2"
          />
        </div>
        <div class="mb-2">
          <label for="manager_region" class="form-label">Region</label>
          <input
            type="text"
            class="form-control"
            id="manager_region"
            v-model.trim="shop.manager_region"
          />
        </div>
        <div class="mb-2">
          <label for="manager_zone" class="form-label">Zone</label>
          <input
            type="text"
            class="form-control"
            id="manager_zone"
            v-model.trim="shop.manager_zone"
          />
        </div>
        <div class="mb-2">
          <label for="manager_woreda" class="form-label">Woreda</label>
          <input
            type="text"
            class="form-control"
            id="manager_woreda"
            v-model.trim="shop.manager_woreda"
          />
        </div>
        <div class="mb-2">
          <label for="manager_city" class="form-label">City</label>
          <input
            type="text"
            class="form-control"
            id="manager_city"
            v-model.trim="shop.manager_city"
          />
        </div>
        <div class="mb-2">
          <label for="kebele" class="form-label">Kebele</label>
          <input
            type="text"
            class="form-control"
            id="kebele"
            v-model.trim="shop.manager_kebele"
          />
        </div>
      </base-card>
      <base-button
        class="mt-3 me-3"
        title="Save"
        :isLoading="isLoading"
        @submit="addNewShop"
      />
    </form>
  </div>

  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import useValidate from "@vuelidate/core";
import {
  required,
  helpers,
  maxLength,
  numeric,
  email,
} from "@vuelidate/validators";
import apiClient from "../resources/baseUrl";
import MapLoader from "../components/MapLoader.vue";
export default {
  components: {
    MapLoader,
  },
  data() {
    return {
      v$: useValidate(),
      shop: {
        shop_name: "",
        region: "",
        zone: "",
        city: "",
        house_no: "",
        latitude: " ",
        longitude: " ",
        woreda: "",
        kebele: "",
        is_active: "1",
        //owner
        first_name: "",
        last_name: "",
        email: "",
        role: "a",
        phone_number1: "",
        phone_number2: "",
        phone_numbers: [],
        manager_region: "",
        manager_zone: "",
        manager_woreda: "",
        manager_city: "",
        manager_kebele: "",
      },
      //for button
      isLoading: false,
      //for alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: false,
      timeout: "",
    };
  },
  methods: {
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
    setCoordinates(position){
       this.shop.latitude= position.lat;
       this.shop.longitude= position.lng
    },
    async addNewShop() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          this.shop.phone_numbers[0] = this.shop.phone_number1;
          this.shop.phone_numbers[1] = this.shop.phone_number2;
          const response = await apiClient.post("/api/shops", this.shop);
          if (response.status === 200) {
            this.setAlertData(true, "Shop has been added successfully!");
          } else throw "";
        } catch (e) {
          this.setAlertData(false, "Faild to add a new shop");
        } finally {
          this.isLoading = false;
          this.dismissAlert();
        }
      }
    },
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      shop: {
        shop_name: {
          required: helpers.withMessage("Shop name is required", required),

          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        region: {
          required: helpers.withMessage("Shop region is required", required),
        },
        zone: {
          required: helpers.withMessage("Zone is required", required),
        },
        city: {
          required: helpers.withMessage("City is required", required),
        },
        woreda: {
          required: helpers.withMessage("Woreda is required", required),
        },
        house_no: {
          numeric,
        },
        kebele: {
          required: helpers.withMessage("Kebele is required", required),
        },
        first_name: {
          required: helpers.withMessage("First name is required", required),
        },
        last_name: {
          required: helpers.withMessage("Last name is required", required),
        },
        email: {
          email,
          required: helpers.withMessage("Email is required", required),
        },
        phone_number1: {
          max: helpers.withMessage(
            "Phone number should be less than 13",
            maxLength
          ),
          required: helpers.withMessage("Phone numbers is required", required),
        },
      },
    };
  },
};
</script>

<style>
.bg-light-grey {
  background-color: #f1f1f1;
  min-height: 100vh;
}
</style>
