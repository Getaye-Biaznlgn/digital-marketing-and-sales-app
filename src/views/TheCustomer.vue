<template>
<div class="m-3">
  <h5>Product customer</h5>
  <div>
    In the customer section, you will review and manage 
    all solar product customers.
  </div>
   <button @click="showAddModal" class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light">
        Add New Customer
   </button>
<hr/>
 <div class="d-flex justify-content-between p-2 selection-bar">
      <div class="d-flex bcustomer rounded">
        <input
          type="text"
          class="form-control search-input"
          placeholder="Search"
          aria-label="search"
          aria-describedby="basic-addon2"
        />
        <span
          role="button"
          class="input-group-text search rounded-0"
          id="basic-addon2"
        >
          <i class="fas fa-search"></i>
        </span>
      </div>

      <div class="d-flex">
        <div class="pe-2">
          <select class="form-select" aria-label="selectFilte">
            <option value=" ">Sort</option>
            <option>Sort</option>
          </select>
        </div>
        <div>
          <select class="form-select" aria-label="selectFilterRegion">
            <option value=" ">Sort</option>
            <option>Sort</option>
          </select>
        </div>
      </div>
    </div>
  <!-- Table -->
      <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Id</th>
        <th>Customer</th>
        <th>customer</th>
         <th>Qty</th>
         <th>customer Date</th>
         <th>Shop</th>
         <th>customer Status</th>
         <th>Payment Method</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(customer, index) in customers"
        :key="customer.id">
        <td>{{index+1}}</td>
        <td>{{customer.id}}</td>
        <td>{{customer}}</td>
        <td>
          <span class="me-2" @click="showEditModal(customer)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  @click="showDeleteModal(customer)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
</div>
    <!-- add customers -->
<base-modal :modalState="isAddModalVisible" title="Customer" @close="closeAddModal" btnLabel="Save" 
  :isLoading="isLoading" @submit="addNewCustomer">
     <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.customer.title.$error }">
        <label for="title" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model.trim="customer.title"
          @blur="v$.customer.title.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.customer.title.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.customer.description.$error }">
        <label for="description" class="form-label">Description</label>
        <textarea
        rows="5"
          class="form-control"
          id="description"
          v-model.trim="customer.description"
          @blur="v$.customer.description.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.customer.description.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
     </form>
  </base-modal>

  <!-- delete base modal -->
  <base-modal :modalState="isDeleteModalVisible" btnLabel="Delete" :isLoading="isLoading"
   title="Delete Image" @close="closeDeleteModal" @submit="deleteCustomer">
    <p>Do u want to delete? <br>
     {{customerForDelete?.title}}
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
import { required, helpers } from "@vuelidate/validators";
export default {
    data(){
        return{
            v$:useValidate(),
            isAddModalVisible:false,
            isDeleteModalVisible:false,
            customerForDelete:{},
            alertMessage:'',
            
            isLoading: false,
            customers:[],
            customer:{
                title:'',
                description:''
            },
            // alert
            isAlertVisible:false,
            timeout: '',
            // to use add modal as edit depend on the condition and #forUpdate to 
            //chage the action which should be performed 
            forUpdate:false,
        }
    },
    methods:{
       dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
     resetFieldEmpity(){
      this.customer.title='',
      this.customer.description=''
     },
     showDeleteModal({...customer}){
      this.customerForDelete=customer
       this.isDeleteModalVisible=true
     },
     closeDeleteModal(){
       this.isDeleteModalVisible=false
     },
     showEditModal({...customer}){
       this.forUpdate=true;
        this.customer=customer
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
    async updateCustomer(){
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.put(`/api/customers/${this.customer.id}`, this.customer);
          if (response.status === 200) {
            const editedIndex = this.customers.findIndex((customer) => {
              return this.customer.id === customer.id;
            });
            this.customers[editedIndex] = response.data;
            ///
          } else throw "";
        } catch (e) {
           this.alertMessage="Faild to update customer"
           this.isAlertVisible=true
           this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
          this.forUpdate=false;
        }
      }
         },
     async addNewCustomer(){
      if(this.forUpdate){
        this.updateCustomer();
        return;
      }
        
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/customers", this.customer);
          if (response.status === 201) {
            this.customers.push(response.data);
          } else throw "";
        } catch (e) {
             this.isAlertVisible=true
             this.alertMessage="Faild to add a new customer"
             this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
        }
      }
   },
   async deleteCustomer(){
        this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/customers/${this.customerForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.customers.findIndex((customer)=> {
            return customer.id === this.customerForDelete.id;
          });
          this.customers.splice(deletedIndex, 1);     
        }
      } catch (e) {
        this.isAlertVisible=true
        this.alertMessage="Faild to delete a new customer"
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
        
      }
   },
     async fetchCustomers(){
       try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/customers`
        );
        if (response.status === 200) {
           this.customers=response.data
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }  
   }
 },
 created(){
   this.fetchCustomers()
 },
   beforeUnmount(){
    clearTimeout(this.timeout)
   },
   validations() { 
    return {
      customer: {
        title: {
          required: helpers.withMessage('customer title is required', required),
        },
        description:{
            required: helpers.withMessage('customer description is required', required),
        }
      }
    }
  }
}
</script>
