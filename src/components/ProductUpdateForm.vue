<template>
     <span
       @click="$router.back()"
       role="button"
       class="text-dark-blue pe-2 fw-bold fs-5"
       ><i class="fas fa-arrow-left"></i>Back</span
     >
    <div
      class=" p-3 m-2 d-block mx-auto"
    >
      <form @submit.prevent class="row">
     <div class="col-md-6">   
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
            >{{ error.$message + ", " }}</span
          >
        </div>
  <div class="row">     
       <div class="mb-3 col-md-6" :class="{ warining: v$.product.price.$error }">
          <label for="price" class="form-label">Price</label>
          <input
            type="text"
            class="form-control"
            id="price"
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

       <div class="mb-3 col-md-6" :class="{ warining: v$.product.qty.$error }">
          <label for="qty" class="form-label">Qty</label>
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
            >{{ error.$message + ", " }}</span
          >
        </div>
  </div>
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
</div>       

<div class="col-md-6">
        <div class="mb-3" :class="{ warining: v$.product.application.$error }">
          <label for="application" class="form-label">Application</label>
          <input
            type="text"
            class="form-control"
            id="application"
            v-model.trim="product.application"
            @blur="v$.product.application.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.application.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-3" :class="{ warining: v$.product.effciency.$error }">
          <label for="effciency" class="form-label">Efficiency</label>
          <input
            type="text"
            class="form-control"
            id="effciency"
            v-model.trim="product.effciency"
            @blur="v$.product.effciency.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.effciency.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-3" :class="{ warining: v$.product.function.$error }">
          <label for="function" class="form-label">Function</label>
          <input
            type="text"
            class="form-control"
            id="function"
            v-model.trim="product.function"
            @blur="v$.product.function.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.function.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>

        <div class="mb-3" :class="{ warining: v$.product.material.$error }">
          <label for="material" class="form-label">Material</label>
          <input
            type="text"
            class="form-control"
            id="material"
            v-model.trim="product.material"
            @blur="v$.product.material.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.material.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
        <!-- max -->
<div class="row">
        <div
          class="mb-3 col-md-6"
          :class="{ warining: v$.product.maximum_current_power.$error }"
        >
          <label for="maximum_current_power" class="form-label"
            >Maximum current power</label
          >
          <input
            type="text"
            class="form-control"
            id="maximum_current_power"
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
          class="mb-3 col-md-6"
          :class="{ warining: v$.product.maximum_supply_voltage.$error }"
        >
          <label for="maximum_supply_voltage" class="form-label"
            >Maximum supply voltage</label
          >
          <input
            type="text"
            class="form-control"
            id="maximum_supply_voltage"
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

   </div>     
       
        <div class="mb-3" :class="{ warining: v$.product.warranty.$error }">
          <label for="warranty" class="form-label">Warranty</label>
          <input
            type="text"
            class="form-control"
            id="warranty"
            v-model.trim="product.warranty"
            @blur="v$.product.warranty.$touch"
          />
          <span
            class="error-msg mt-1"
            v-for="(error, index) of v$.product.warranty.$errors"
            :key="index"
            >{{ error.$message + ", " }}</span
          >
        </div>
</div>      
        <base-button
          class="mt-3"
          title="Save changes"
          :isLoading="isLoading"
          loadingTitle="Saving"
          @submit="updateProductInfo"
        />
      </form>

      
<!-- alert  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { mapGetters } from 'vuex'
import { required, helpers, maxLength, numeric } from "@vuelidate/validators";
import apiClient from "../resources/baseUrl";
export default {
  props:['productInfo'],
  data() {
    return {
      v$:useValidate(),
      product: {},
      isLoading: false,
    //   alert
      isAlertVisible:false,
      alertMessage:'',
      isRequestSucceed:'',
      timeout:'',
    };
  },
  computed:{
    ...mapGetters(['categories'])
  },
  methods:{
       dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 3000)
      
      },
      
      async updateProductInfo() {
      this.isLoading = true;
      try {
        const response = await apiClient.put(
          "/api/products/" + this.product.id,
          {
            ...this.product
          }
        );
        if (response.status === 200) {
          this.isAlertVisible = true;
          this.alertMessage = "Product info has been updated successfully!";
          this.isRequestSucceed = true;
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Product to update damaged Institution info";
        this.isRequestSucceed = false;
      } finally {
        this.isLoading = false;
        this.dismissAlert();
      }
    },
  },
  beforeUnmount(){
   clearTimeout(this.timeout)
  },
  created(){
       this.product={...this.productInfo}
  },
  watch:{
    productInfo(){
      this.product = this.productInfo
    }
  },
    validations() {
    return {
      product: {
        name: {
          required,
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
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
        date_of_production:{
          required
        },
        application:{
           required
        },
        material:{
          required
        },
        effciency:{
          required
        }
      },
    };
  },
};
</script>
