<template>
  <div class="pe-3 d-flex justify-content-end">
    <div>
      <select
        v-model="selectedLanguage"
        class="form-select text-lowercase"
        aria-label="selectFilte"
        @change="fetchTranslatedProductInfo">
        <option v-for="lang in languages" :key="lang.id" :value="lang.code">
          {{ lang.code }}
        </option>
      </select>
    </div>
  </div>
  <!-- translated products info -->
  <div v-if="selectedLanguage.toLowerCase() != 'en'" class="mx-auto">
    <form @submit.prevent class="row">
      <base-card class="mt-2 col-md-5">
        <div class="mb-3">
          <label for="title" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="translatedProductInfo.name"
          />
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">Description</label>
          <textarea
            rows="5"
            type="text"
            class="form-control"
            id="title"
            v-model.trim="translatedProductInfo.description"
          />
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">Warranty</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="translatedProductInfo.warranty"
          />
        </div>
      </base-card>
      <base-card class="mt-2 col-md-6">
        <div>
          <!-- {{product.detail}} -->
          <label for="textEditor">Product Detail</label>
          <text-editor
            :initText="translatedProductInfo.detail"
            @editorValue="setEditorValueForTranslated"
            id="textEditor"
          />
        </div>
      </base-card>
      <base-button
        class="mt-3"
        title="Save changes"
        :isLoading="isLoading"
        loadingTitle="Saving"
        @submit="updateProductTransInfo"
      />
    </form>
  </div>
  <!-- Product detail in default language -->
  <div v-else class="mx-2">
    <form @submit.prevent class="row">
      <base-card class="mt-2 col-md-5">
        <div class="mb-3" :class="{ warining: v$.product.name.$error }">
          <label for="title" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="product.name"
            @blur="v$.product.name.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.name.$errors"
            :key="index"
          >
            {{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-3" :class="{ warining: v$.product.category_id.$error }">
          <label for="category_id" class="form-label">Category</label>
          <select
            class="form-select"
            aria-label="category id"
            :disabled="selectedLanguage.toLowerCase() != 'en'"
            v-model="product.category_id"
            @blur="v$.product.category_id.$touch"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.category_id.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.product.model.$error }">
          <label for="model" class="form-label">Model</label>
          <input
            type="text"
            class="form-control"
            id="model"
            :disabled="selectedLanguage.toLowerCase() != 'en'"
            v-model.trim="product.model"
            @blur="v$.product.model.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.model.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="mb-3" :class="{ warining: v$.product.brand.$error }">
          <label for="brand" class="form-label">Brand</label>
          <input
            type="text"
            class="form-control"
            id="brand"
            :disabled="selectedLanguage.toLowerCase() != 'en'"
            v-model.trim="product.brand"
            @blur="v$.product.brand.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.brand.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div class="row">
          <div
            class="mb-3 col-md-6"
            :class="{ warining: v$.product.price.$error }"
          >
            <label for="price" class="form-label">Price</label>
            <input
              type="text"
              class="form-control"
              id="price"
              :disabled="selectedLanguage.toLowerCase() != 'en'"
              v-model.trim="product.price"
              @blur="v$.product.price.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.price.$errors"
              :key="index"
              >{{ error.$message + ", " }}</span
            >
          </div>

          <div
            class="mb-3 col-md-6"
            :class="{ warining: v$.product.qty.$error }"
          >
            <label for="qty" class="form-label">Qty</label>
            <input
              type="number"
              class="form-control"
              id="qty"
              :disabled="selectedLanguage.toLowerCase() != 'en'"
              v-model.trim="product.qty"
              @blur="v$.product.qty.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.qty.$errors"
              :key="index"
              >{{ error.$message + ", " }}</span
            >
          </div>
        </div>

        <div
          class="mb-3"
          :class="{ warining: v$.product.maximum_current_power.$error }"
        >
          <label for="maximum_current_power" class="form-label"
            >Maximum current power</label
          >
          <input
            type="text"
            class="form-control"
            id="maximum_current_power"
            :disabled="selectedLanguage.toLowerCase() != 'en'"
            v-model.trim="product.maximum_current_power"
            @blur="v$.product.maximum_current_power.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.maximum_current_power.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <div
          class="mb-3"
          :class="{ warining: v$.product.maximum_supply_voltage.$error }"
        >
          <label for="maximum_supply_voltage" class="form-label"
            >Maximum supply voltage</label
          >
          <input
            type="text"
            class="form-control"
            id="maximum_supply_voltage"
            :disabled="selectedLanguage.toLowerCase() != 'en'"
            v-model.trim="product.maximum_supply_voltage"
            @blur="v$.product.maximum_supply_voltage.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.maximum_supply_voltage.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
      </base-card>
      <base-card class="mt-2 col-md-6">
        <div class="mb-3" :class="{ warining: v$.product.description.$error }">
          <label for="description" class="form-label">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            rows="5"
            v-model.trim="product.description"
            @blur="v$.product.description.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.description.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <div>
          <label for="textEditor">Product Detail</label>
          <text-editor
            :initText="product.detail"
            @editorValue="setEditorValue"
            id="textEditor"
          />
        </div>
      </base-card>

      <base-button
        class="mt-3"
        title="Save changes"
        :isLoading="isLoading"
        @submit="updateProductInfo"
      />
    </form>

    <!-- alert  -->
  </div>
  <BaseCard>
    <div class="fs-5 mb-2 fw-bold">Product State</div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="isActive"
        @change="setIsActive($event)"
        value=""
        id="flexCheckIsActive"
      />
      <label class="form-check-label" for="flexCheckDefault"> Is Active </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="isFeatured"
        @change="setIsFeatured($event)"
        value=""
        id="flexCheckIsFeatured"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Is Featured
      </label>
    </div>
  </BaseCard>
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import useValidate from "@vuelidate/core";
import { mapGetters } from "vuex";
import { required, helpers, maxLength, numeric } from "@vuelidate/validators";
import apiClient from "../resources/baseUrl";
import TextEditor from "../components/TextEditor.vue";
export default {
  props: ["productInfo"],
  components: {
    TextEditor,
  },
  data() {
    return {
      v$: useValidate(),
      product: {},
      isLoading: false,
      languages: [],
      selectedLanguage: "en",
      translatedProductInfo: {},
      //product state
      isActive:"",
      isFeatured:"",
      //   alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: "",
      timeout: "",
    };
  },
  computed: {
    ...mapGetters(["categories"]),
  },
  methods: {
   async setIsActive(){
            try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.post(
          `/api/set_product_active/${
            this.product.id
          }`,
          {
            is_active:this.isActive? 1:0,
            product_id:this.product.id
          }
        );
        if (response.status === 200) {
          this.isActive = response.data===1? true : false;
           this.setAlertData(
            true,
            "Product state has been changed successfully"
          );
        }
      } catch (e) {
           this.setAlertData(
            false,
            "Faild to change product state"
          );
      } finally {
        this.$store.commit("setIsLoading", false);
        this.dismissAlert();
      }
    },
  async setIsFeatured(){
            try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.post(
          `/api/set_featured_products/${
            this.product.id
          }`,
          {
            is_featured :this.isFeatured? 1:0,
            product_id:this.product.id

          }
        );
        if (response.status === 200) {
          this.isFeatured = response.data===1? true : false;
           this.setAlertData(
            true,
            "Product featured state has been changed successfully!"
          );
        }
      } catch (e) {
           this.setAlertData(
            false,
            "Faild to change product featured state!"
          );
      } finally {
        this.$store.commit("setIsLoading", false);
        this.dismissAlert();
      }
    },
    setEditorValue(value) {
      this.product.detail = value;
    },
    setEditorValueForTranslated(value) {
      this.translatedProductInfo.detail = value;
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
    async updateProductInfo() {
      this.isLoading = true;
      try {
        const response = await apiClient.put(
          `/api/products/${
            this.product.id
          }}?language=${this.selectedLanguage.toLowerCase()}`,
          {
            language: this.selectedLanguage.toLowerCase(),
            ...this.product,
          }
        );
        if (response.status === 200) {
          this.setAlertData(
            true,
            "Product info has been updated successfully!"
          );
        } else throw "";
      } catch (e) {
        this.setAlertData(false, "Faild to update product info!");
      } finally {
        this.isLoading = false;
        this.dismissAlert();
      }
    },
    async fetchTranslatedProductInfo() {
      if (this.selectedLanguage.toLowerCase() == "en") {
        return;
      }

      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/product_translations/${
            this.product.id
          }?language=${this.selectedLanguage.toLowerCase()}`
        );
        if (response.status === 200) {
          if (response.data && response.data.data)
            this.translatedProductInfo = response.data.data;
          else
            this.translatedProductInfo = {
              name: "",
              warranty: "",
              description: "",
              detail: "",
            };
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
        this.isLoading = false;
        this.dismissAlert();
      }
    },

    async updateProductTransInfo() {
      this.isLoading = true;
      try {
        const response = await apiClient.put(
          `/api/product_translations/${this.product.id}}`,
          {
            language: this.selectedLanguage.toLowerCase(),
            ...this.translatedProductInfo,
          }
        );
        if (response.status === 200) {
          this.setAlertData(
            true,
            "Product info has been updated successfully!"
          );
        } else throw "";
      } catch (e) {
        this.setAlertData(false, "Faild to update product info");
      } finally {
        this.isLoading = false;
        this.dismissAlert();
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
    init(){
      this.product = { ...this.productInfo };
     this.isActive=this.product?.is_active==1? true : false
    this.isFeatured=this.product?.is_featured==1? true : false
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  created() {
    this.init()
    this.fetchLanguages();
    
  },
  watch: {
    productInfo() {
     this.init()
    },
  },
  validations() {
    return {
      product: {
        name: {
          required,
          max: helpers.withMessage(
            "Name should not be greater than 100 characters",
            maxLength(100)
          ),
        },
        description: {
          required,
        },
        model: {
          required,
          max: helpers.withMessage(
            "Model should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        brand: {
          required,
          max: helpers.withMessage(
            "Brand name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        warranty: {
          max: helpers.withMessage("", maxLength(50)),
        },
        function: {
          max: maxLength(200),
        },
        maximum_supply_voltage: {
          numeric,
        },
        maximum_current_power: {
          numeric,
        },
        price: {
          required,
          numeric,
        },
        weight: {
          required,
        },
        qty: {
          numeric,
        },
        category_id: {
          required,
        },
        date_of_production: {
          required,
        },
        application: {
          required,
        },
        material: {
          required,
        },
        effciency: {
          required,
        },
      },
    };
  },
};
</script>
