<template>
  <DetailPage title="Edit Shop">
    <div class="pe-3 d-flex justify-content-end">
      <div>
        <select
          v-model="selectedLang"
          class="form-select text-lowercase"
          aria-label="selectFilte"
          @change="fetchShopDetail"
        >
          <option v-for="lang in languages" :key="lang.id" :value="lang.code">
            {{ lang.code }}
          </option>
        </select>
      </div>
    </div>

    <div class="mx-auto">
      <div class="container mx-auto">
        <div class="col-md-6">
          <BaseCard>
            <div class="mb-3" :class="{ warining: v$.shop.shop_name.$error }">
              <label for="shop_name" class="form-label">Shop</label>
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
            <div class="mb-3" :class="{ warining: v$.shop.region.$error }">
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
            <div class="mb-3" :class="{ warining: v$.shop.zone.$error }">
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
            <div class="mb-3" :class="{ warining: v$.shop.city.$error }">
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
            <div class="mb-3" :class="{ warining: v$.shop.woreda.$error }">
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
            <div v-if="selectedLang=='en'" class="mb-3" :class="{ warining: v$.shop.kebele.$error }">
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
             <div v-if="selectedLang=='en'" class="mb-3" :class="{ warining: v$.shop.latitude.$error }">
              <label for="latitude" class="form-label">Latitude</label>
              <input
                type="text"
                class="form-control"
                id="latitude"
                v-model.trim="shop.latitude"
                @blur="v$.shop.latitude.$touch"
              />
              <span
                class="error-msg mt-1"
                v-for="(error, index) of v$.shop.latitude.$errors"
                :key="index"
              >
                {{ error.$message + ", " }}</span
              >
            </div>
             <div v-if="selectedLang=='en'" class="mb-3" :class="{ warining: v$.shop.longitude.$error }">
              <label for="longitude" class="form-label">Longitude</label>
              <input
                type="text"
                class="form-control"
                id="longitude"
                v-model.trim="shop.longitude"
                @blur="v$.shop.longitude.$touch"
              />
              <span
                class="error-msg mt-1"
                v-for="(error, index) of v$.shop.longitude.$errors"
                :key="index"
              >
                {{ error.$message + ", " }}</span
              >
            </div>

              <div v-if="selectedLang=='en'" class="mt-3 form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  ref="shopStatus"
                  :checked="shop.is_active"
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Active
                </label>
              </div>
            <BaseButton
              @submit="updateShop"
              :isLoading="isLoading"
              title="Save"
            />
          </BaseCard>
        </div>
      </div>
    </div>
  </DetailPage>
    <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength, numeric } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      shop: {},
      isLoading: false,
      languages: [],
      selectedLang: "en",
       //   alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: "",
      timeout: "",
    };
  },
  methods: {

  async updateShop() {
    let path;
    if(this.selectedLang=='en'){
      // shop is_active don't set on locale
      this.shop.is_active=this.$refs.shopStatus.checked
      path = '/api/shops';
    }else
     path= '/api/shop_translations'
     
      this.v$.$validate();
      if (!this.v$.$error) {
       this.isLoading = true;
      try {
        const response = await apiClient.put(
          `${path}/ ${this.$route.params.id}?language=${this.selectedLang.toLowerCase()}`,
          {
            language: this.selectedLang.toLowerCase(),
            ...this.shop,
          }
        );
        if (response.status === 200) {
          this.setAlertData(
            true,
            "Shop info has been updated successfully!"
          );
        } else throw "";
      } catch (e) {
        this.setAlertData(false, "Faild to update shop info!");
      } finally {
        this.isLoading = false;
        this.dismissAlert();
      }
     }
    },
    
    async fetchLanguages() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/languages`);
        if (response.status === 200) {
          this.languages = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchShopDetail() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/shop_translations/${this.$route.params.id}?language=${this.selectedLang}`
        );
        if (response.status === 200) {
    
            this.shop = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
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
  created() {
    this.fetchLanguages();
    this.fetchShopDetail();
  },
  beforeUnmount(){
    clearTimeout(this.timeout)
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
          required: helpers.withMessage("Region is required", required),
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
        kebele: {
          numeric
        },
        latitude: {
          required: helpers.withMessage("Latitude is required", required),
          // numeric
        },
        longitude: {
          required: helpers.withMessage("Longitude is required", required),
          // numeric
        },
      },
    };
  },
};
</script>

<style></style>
