<template>
 <DetailPage title="Add Product">
   <form @submit.prevent>
      <div class="row">
        <base-card class="mt-2 col-lg-5">
          <div class="mb-3" :class="{ warining: v$.product.name.$error }">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
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

          <div class="mb-3" :class="{ warining: v$.product.model.$error }">
            <label for="model" class="form-label">Model</label>
            <input
              type="text"
              class="form-control"
              id="model"
              v-model.trim="product.model"
              @blur="v$.product.model.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.model.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>

          <div
            class="mb-3"
            :class="{ warining: v$.product.category_id.$error }"
          >
            <label for="category_id" class="form-label">Category</label>
            <select
              class="form-select"
              aria-label="Default select example"
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
          <div class="mb-3" :class="{ warining: v$.product.price.$error }">
            <label for="price" class="form-label">Price</label>
            <div class="input-group">
              <input
              type="text"
              class="form-control"
              id="price"
              v-model.trim="product.price"
              @blur="v$.product.price.$touch"
            />
            <span class="input-group-text" id="weight-text">ETB</span>

            </div>
            
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.price.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>

          <div class="mb-3" :class="{ warining: v$.product.warranty.$error }">
            <label for="name" class="form-label">Warranty</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model.trim="product.warranty"
              @blur="v$.product.warranty.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.warranty.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div class="mb-3" :class="{ warining: v$.product.qty.$error }">
            <label for="brand" class="form-label">Quantity</label>
            <input
              type="number"
              class="form-control"
              id="qty"
              v-model.trim="product.qty"
              @blur="v$.product.qty.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.qty.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div
            class="mb-3"
            :class="{ warining: v$.product.date_of_production.$error }"
          >
            <label for="date_of_production" class="form-label"
              >Date of production</label
            >
            <input
              type="date"
              class="form-control"
              id="date_of_production"
              v-model.trim="product.date_of_production"
              @blur="v$.product.date_of_production.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.date_of_production.$errors"
              :key="index"
              >{{ error.$message + ", " }}</span
            >
          </div>
        </base-card>
        <base-card class="mt-2 col-lg-6">
          <div
            class="mb-3"
            :class="{ warining: v$.product.description.$error }"
          >
            <label for="description" class="form-label"
              >Short Description</label
            >
            <textarea
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
            >
              {{ error.$message + ", " }}</span
            >
          </div>
          <div>
            <label for="textEditor">Product Detail</label>
            <text-editor @editorValue="setEditorValue" id="textEditor" />
          </div>
        </base-card>
      </div>

      <div class="row">
        <base-card class="col-lg-6">
          <multiple-image-upload @saveImage="setImages" />
          <div v-if="product_images.length" class="progress mt-3">
            <div
              class="progress-bar btn-add"
              role="progressbar"
              :style="{ width: uploadPercentage + '%' }"
              id="progress"
              :aria-valuenow="p"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </base-card>
        <base-card class="col-lg-5 mx-6">
      
          <div class="mb-3" :class="{ warining: v$.product.brand.$error }">
            <label for="brand" class="form-label">Brand</label>
            <input
              type="text"
              class="form-control"
              id="brand"
              v-model.trim="product.brand"
              @blur="v$.product.brand.$touch"
            />
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.brand.$errors"
              :key="index"
            >
              {{ error.$message + ", " }}</span
            >
          </div>

         <!-- <div class=" mb-3">
           <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
           <span class="input-group-text" id="basic-addon2">Kg</span>
         </div> -->
         <div class="mb-3" :class="{ warining: v$.product.weight.$error }">
         <label for="weight" class="form-label">Weight</label> <br/>
         <div class="input-group" >
            <input
              type="number"
              class="form-control"
              id="weight"
              v-model.trim="product.weight"
              @blur="v$.product.weight.$touch"
            />
            <span class="input-group-text" id="weight-text">Kg</span>
          </div>
          <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.weight.$errors"
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
            <div class="input-group">
              <input
              type="text"
              class="form-control"
              id="maximum_supply_voltage"
              v-model.trim="product.maximum_supply_voltage"
              @blur="v$.product.maximum_supply_voltage.$touch"
            />
            <span class="input-group-text" id="max-volt-text">V</span>
            </div>
            
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.maximum_supply_voltage
                .$errors"
              :key="index"
              >{{ error.$message + ", " }}</span
            >
          </div>
          <div
            class="mb-3"
            :class="{ warining: v$.product.maximum_current_power.$error }"
          >
            <label for="maximum_current_power" class="form-label"
              >Maximum current power</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="maximum_current_power"
                v-model.trim="product.maximum_current_power"
                @blur="v$.product.maximum_current_power.$touch"
              />
              <span class="input-group-text" id="max-volt-text">W</span>
            </div>
           
            <span
              class="error-msg mt-1"
              v-for="(error, index) of v$.product.maximum_current_power.$errors"
              :key="index"
              >{{ error.$message + ", " }}</span
            >
          </div>
        </base-card>
      </div>
      <base-button
        class="mt-3 me-5 mb-3"
        title="Save"
        :isLoading="isLoading"
        @submit="addNewProduct"
      />
      <the-alert
        :isVisible="isAlertVisible"
        :message="alertMessage"
        :isSucceed="isRequestSucceed"
      />
    </form>

  </DetailPage>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength, numeric } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import MultipleImageUpload from "../components/MultipleImageUpload.vue";
import TextEditor from "../components/TextEditor.vue";
import apiClient from "../resources/baseUrl";
export default {
  components: {
    MultipleImageUpload,
    TextEditor,
  },
  data() {
    return {
      v$: useValidate(),
      isLoading: false,

      product_images: [],
      product: {
        name: "",
        model: "",
        description: "",
        brand: "",
        maximum_supply_voltage: "",
        maximum_current_power: "",
        price: "",
        qty: "",
        weight: '',
        date_of_production: "",
        category_id: "",
        detail: "",
      },
      translatedProductInfo: {
        name: "",
        description: "",
        detail: "",
        product_id: "",
      },
      timeout:'',

      //alert
      isAlertVisible: "",
      alertMessage: "",
      isRequestSucceed: "",
    };
  },
  computed: {
    ...mapGetters(["categories"]),
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
     setImages(images) {
      this.product_images=images
    },
    setEditorValue(value) {
      this.product.detail = value;
    },
    async addNewProduct() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        var fd = new FormData();
        this.product_images.forEach((image, i) => {
          fd.append(`images[${i}]`, image);
        });
        for (const attr in this.product) {
          fd.append(attr, this.product[attr]);
        }
        try {
          const response = await apiClient.post("/api/products", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          });
          if (response.status === 201) {
            this.product_images = [];

            this.setAlertData(true, 'Product is uploaded successfully.');
          } else throw "";
        } catch (e) {
           this.setAlertData(false, 'Faild to upload product')
        } finally {
          this.isLoading = false;
          this.dismissAlert()
        }
      }
    },
  },
  beforeUnmount(){
     clearTimeout(this.timeout)
  },
  validations() {
    return {
      product: {
        name: {
          required,
          max: helpers.withMessage(
            "The name is too large",
            maxLength(300)
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
          required,
          numeric,
        },
        maximum_current_power: {
          required,
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
