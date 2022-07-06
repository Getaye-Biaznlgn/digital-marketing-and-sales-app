<template>
<div class="m-3">
    <h5>Product Category</h5>
  <div>
    In the category section, you will review and manage 
    all solar product categories.
  </div>
   <button @click="showAddModal" class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light">
        Add New Category
   </button>
<hr/>
  <!-- Table -->
      <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Description</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(category, index) in categories"
        :key="category.id">
        <td>{{index+1}}</td>
        <td>{{category.title}}</td>
        <td>{{category.description?.slice(0,50)}}...</td>
        <td style="white-space:nowrap;">
          <span class="me-2" @click="showDetailModal(category)" role="button"
            ><i class="far fa-eye"></i
          ></span>
          <span class="me-2" @click="$router.push({name:'CategoryDetail', params:{id:category.id} })" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  @click="showDeleteModal(category)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
</div>
    <!-- add categories -->
<base-modal :modalState="isAddModalVisible" title="Category" @close="closeAddModal" :btnLabel="forDetail?'OK' :'Save'" 
  :isLoading="isLoading" @submit="addNewCategory">
     <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.category.title.$error }">
        <label for="title" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          :disabled="forDetail"
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
          :disabled="forDetail"
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
                <multiple-image-upload v-if="!forDetail" @saveImage="setImages" />

     </form>
  </base-modal>

  <!-- delete base modal -->
  <base-modal :modalState="isDeleteModalVisible" btnLabel="Delete" :isLoading="isLoading"
   title="Delete Image" @close="closeDeleteModal" @submit="deleteCategory">
    <p>Do u want to delete? <br>
     {{categoryForDelete?.title}}
    </p>
  </base-modal>

    <!--to show delete image is failed  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="false"
  />
</template>

<script>
import apiClient from '../resources/baseUrl'
import useValidate from "@vuelidate/core";
import MultipleImageUpload from "../components/MultipleImageUpload.vue"
import { required, helpers } from "@vuelidate/validators";
export default {
  components:{
       MultipleImageUpload
  },
    data(){
        return{
            v$:useValidate(),
            isAddModalVisible:false,
            isDeleteModalVisible:false,
            categoryForDelete:{},
            alertMessage:'',
            
            isLoading: false,
            categories:[],
            category:{
                title:'',
                description:''
            },
            image:"",
            // alert
            isAlertVisible:false,
            timeout: '',
            // to use add modal as edit depend on the condition and #forDetail to 
            //chage the action which should be performed 
            forDetail:false,

        }
    },
    methods:{
      setImages(images){
        this.image=images?.[0]
      },
       dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
     resetFieldEmpity(){
      this.category.title='',
      this.category.description=''
     },
     showDeleteModal({...catagory}){
      this.categoryForDelete=catagory
       this.isDeleteModalVisible=true
     },
     closeDeleteModal(){
       this.isDeleteModalVisible=false
     },
     showDetailModal({...catagory}){
       this.forDetail=true;
        this.category=catagory
        this.isAddModalVisible=true
     },
       closeAddModal(){
          this.v$.$reset()
          this.resetFieldEmpity()
          this.isAddModalVisible=false
         },
         showAddModal(){
            this.isAddModalVisible=true
         },
    // async updateCategory(){
    //   this.v$.$validate();
    //   if (!this.v$.$error) {
    //     this.isLoading = true;
    //     try {
    //       const response = await apiClient.put(`/api/categories/${this.category.id}`, this.category);
    //       if (response.status === 200) {
    //         const editedIndex = this.categories.findIndex((category) => {
    //           return this.category.id === category.id;
    //         });
    //         this.categories[editedIndex] = response.data;
    //         ///
    //       } else throw "";
    //     } catch (e) {
    //        this.alertMessage="Faild to update category"
    //        this.isAlertVisible=true
    //        this.dismissAlert();
    //     } finally {
    //       this.isLoading = false;
    //       this.closeAddModal();
    //       this.forDetail=false;
    //     }
    //   }
    //  },

     async addNewCategory(){
      if(this.forDetail){
       return this.closeAddModal();
        
      }
        
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        var fd= new FormData()
        fd.append(`image`, this.image);
        for (const attr in this.category) {
          fd.append(attr, this.category[attr]);
        }
        
        try {
          const response = await apiClient.post("/api/categories", fd,{
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          });
          
          if (response.status === 201) {
            this.categories.push(response.data);
          } else throw "";
        } catch (e) {
             this.isAlertVisible=true
             this.alertMessage="Faild to add a new category"
             this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
        }
      }
   },
   async deleteCategory(){
        this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/categories/${this.categoryForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.categories.findIndex((category)=> {
            return category.id === this.categoryForDelete.id;
          });
          this.categories.splice(deletedIndex, 1);     
        }
      } catch (e) {
        this.isAlertVisible=true
        this.alertMessage="Faild to delete a new category"
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
        
      }
   },
     async fetchCategories(){
       try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/categories`
        );
        if (response.status === 200) {
           this.categories=response.data
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }  
   }
 },
 created(){
   this.fetchCategories()
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
}
</script>

