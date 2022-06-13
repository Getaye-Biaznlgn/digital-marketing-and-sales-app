<template>
    <h5>Supported Languages</h5>
  <div>
    In the language section, you will review and manage 
    all Languages supported in the system.
  </div>
   <button @click="showAddModal" class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light">
        Add New Languages
   </button>
<hr/>
  <!-- Table -->
      <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>ISO 639-2 Code</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(lang, index) in languages"
        :key="lang.id">
        <td>{{index+1}}</td>
        <td>{{lang.name}}</td>
        <td>{{lang.code}}</td>
        <td>
          <span  @click="showDeleteModal(lang)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>

    <!-- add languages -->
<base-modal :modalState="isAddModalVisible" title="Add Language" @close="closeAddModel" btnLabel="Save" 
  :isLoading="isLoading" @submit="addNewLanguages">
     <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.language.name.$error }">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model.trim="language.name"
          @blur="v$.language.name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.language.name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.language.code.$error }">
        <label for="code" class="form-label">Code</label>
        <input
          type="text"
          class="form-control"
          id="code"
          v-model.trim="language.code"
          @blur="v$.language.code.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.language.code.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
     </form>
  </base-modal>
</template>

<script>
import apiClient from '../resources/baseUrl'
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
export default {
    data(){
        return{
            v$:useValidate(),
            isAddModalVisible:false,
            isLoading: false,
            languages:[],
            language:{
                name:'',
                code:''
            }
        }
    },
    methods:{
         closeAddModel(){
            this.isAddModalVisible=false
         },
         showAddModal(){
            this.isAddModalVisible=true
         },
         ///add new language isnot finished
        async addNewLanguage(){
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/languages", this.language);
          if (response.status === 201) {
            this.languages.push(response.data);
            this.closeAddModal();
          } else throw "";
        } catch (e) {
          this.errorMessage = "Failed to add coordinator";
        } finally {
          this.isLoading = false;
        }
      }
         },
     async fetchLanguages(){
       try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/languages`
        );
        if (response.status === 200) {
           this.languages=response.data
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }  
   }
 },
   validations() { 
    return {
      language: {
        name: {
          required,
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        code:{
            required,
            max: helpers.withMessage(
                "Code should not be greater than 5",
                maxLength(5)
            )
        }
      }
    }
  }
}
</script>

<style scoped>
.btn-bg-primary {
  background-color: #ff7e00;
}
</style>