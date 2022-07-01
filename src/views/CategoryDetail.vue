<template>
  <DetailPage title="Edit Category">
    <div class="pe-3 d-flex justify-content-end">
      <div>
        <select
          v-model="selectedLang"
          class="form-select text-lowercase"
          aria-label="selectFilte"
          @change="fetchCategoryDetail"
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
            <div class="mb-3" :class="{ warining: v$.category.title.$error }">
        <label for="title" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model.trim="category.title"
          @blur="v$.category.title.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.category.title.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.category.description.$error }">
        <label for="description" class="form-label">Description</label>
        <textarea
        rows="5"
          class="form-control"
          id="description"
          v-model.trim="category.description"
          @blur="v$.category.description.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.category.description.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
            <BaseButton
              @submit="updateCategory"
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
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      category: {},
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
  async updateCategory() {
    // let path;
    // if(this.selectedLang=='en'){
    //   path = '/api/`/api/categories`';
    // }else
    //  path= '/api/category_translations'
     
      this.v$.$validate();
      if (!this.v$.$error) {
       this.isLoading = true;
      try {
        const response = await apiClient.put(
          `/api/categories/ ${this.$route.params.id}?language=${this.selectedLang.toLowerCase()}`,
          
            // language: this.selectedLang.toLowerCase(),
            this.category,
          
        );
        if (response.status === 200) {
          this.setAlertData(
            true,
            "category info has been updated successfully!"
          );
        } else throw "";
      } catch (e) {
        this.setAlertData(false, "Faild to update category info!");
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
    async fetchCategoryDetail() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/category_detail/${this.$route.params.id}?language=${this.selectedLang}`
        );
        if (response.status === 200) {
           if(response.data.data==null || response.data.data=='')
           this.category={}
           else
            this.category = response.data.data;
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
    this.fetchCategoryDetail();
  },
  beforeUnmount(){
    clearTimeout(this.timeout)
  },
    validations() { 
    return {
      category: {
        title: {
          required: helpers.withMessage('category title is required', required),
        },
        description:{
            required: helpers.withMessage('category description is required', required),
        }
      }
    }
  }
};
</script>

<style></style>
