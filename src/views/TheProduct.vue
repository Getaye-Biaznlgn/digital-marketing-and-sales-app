<template>
  <h5>Product Details</h5>
  <div>
    In the product section, you will review and manage 
    all products with their details. You can view and edit 
    many information such as product name, description, stock, price and more.
  </div>
   <button @click="showAddModal" class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light">
        Add New Product
   </button>
<hr/>
<div class="d-flex justify-content-between p-2 selection-bar">
   <div class="d-flex  border rounded">
      <input type="text"  class="form-control search-input" placeholder="Search" aria-label="search" aria-describedby="basic-addon2"/>
        <span role="button"  class="input-group-text search rounded-0" id="basic-addon2">
            <i class="fas fa-search"></i>
        </span>           
   </div>
   
   <div class="d-flex">
      <div class="pe-2">
        <select
          class="form-select"
          aria-label="selectFilte"
        >
          <option value=" ">Sort</option>
          <option>
            Sort
          </option>
        </select>
      </div>
      <div>
        <select
          class="form-select"
          aria-label="selectFilterRegion"
        >
          <option value=" ">Sort</option>
          <option>
             Sort
          </option>
        </select>
      </div>
     </div>
    </div>
  <!-- Table -->
      <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Model</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Weight</th>
        <th>Category</th>
        <th>Status</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr
        v-for="(product, index) in products"
        :key="product.id"
      >
        <td>{{index+1}}</td>
        <td>{{product.model}}</td>
        <td>
          <img
            :src="product.images?.path"
            width="100"
            height="100"
            alt="product image"
          />
        </td>
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.qty}}</td>
        <td>{{product.weight}}</td>
        <td>{{product.category?.title}}</td>
        <td>{{product.isActive}}</td>
        <td
        >
          <span class="me-2" @click="$router.push({name:'ProductDetail', params:{id:product.id}})" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  @click="showDeleteModal(product)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <add-product-modal :isAddModalVisible="isAddModalVisible" @closeAddModal="closeAddModal"/>
      <!-- delete base modal -->
  <base-modal :modalState="isDeleteModalVisible"
   @close="closeDeleteModal"
    title="Delete Product"
    btnLabel="Delete" :isLoading="isLoading" @submit="deleteProduct">
    <p>Do u want to delete?</p>
    <p>{{productForDelete?.name}}</p>
  </base-modal>
    <the-alert
    :isVisible="isAlertVisible"
    message="Faild to delete product"
    :isSucceed="false"
  />
</template>

<script>
import AddProductModal from '../components/AddProductModal.vue'
import apiClient from '../resources/baseUrl'
import {useStore} from 'vuex'
import { ref, onBeforeUnmount} from 'vue';
export default {
 components:{
    AddProductModal
 },
  setup(){
   const store= useStore();
   var isAddModalVisible= ref(false);
   var isDeleteModalVisible= ref(false);
   var products = ref({});
   var isLoading = ref(false);
   var productForDelete= ref();
   var isAlertVisible= ref(false)
   var timeout = ref(false)
   var closeAddModal= function(){
        isAddModalVisible.value= false
   }
   var showAddModal= function(product){
    productForDelete.value= product
      isAddModalVisible.value = true;

   }
  var showDeleteModal= function(product){
      productForDelete.value= product
      isDeleteModalVisible.value = true;
   }

   const closeDeleteModal= async function(){
      isDeleteModalVisible.value=false;
   }
   const deleteProduct = async function(){
     isLoading.value = true;
      try {
        const response = await apiClient.delete(
          `/api/products/${productForDelete.value.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.products.findIndex(
            (product) => {
              return product.id === this.productForDelete.id;
            }
          );
          this.products.splice(deletedIndex, 1);
          this.closeDeleteModal();
        }
      } catch (e) {
        isAlertVisible.value=true
      } finally {
        isDeleteModalVisible.value=false;
        isLoading.value = false;
        dismissAlert();
      }
   }
   const dismissAlert= function() {
     timeout.value = setTimeout(() => {
      isAlertVisible.value = false;
      }, 2000);
   }

   const fetchProducts= async function(){
       try {
        store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/products`
        );
        if (response.status === 200) {
           products.value=response.data.data
        }
      } catch (e) {
        //
      } finally {
        store.commit("setIsLoading", false);
      }
   }
   fetchProducts()
   onBeforeUnmount(function(){
    clearTimeout(timeout)
   })
    return {
      closeAddModal,
      showAddModal,
      closeDeleteModal,
      deleteProduct,
      showDeleteModal,
      isAlertVisible,
      isAddModalVisible,
      isDeleteModalVisible,
      productForDelete,
      products,
      isLoading,
      
    }
   },
  

}
</script>

<style>
  .search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.selection-bar{
  background-color: rgb(250, 250, 250);
}
  .input-group{
    padding: 0 !important;
    margin: 0 !important;
  }
table {
  border-collapse: collapse;
  width: 100%;
}
/* new design change start*/
tr:last-child {
  border-bottom: 2px solid #f1f1f1;
}
th {
  text-align: left;
  padding: 8px;
}
tr {
  border-bottom: 2px solid #f1f1f1;
}
td {
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.btn-bg-primary {
  background-color: #ff7e00;
}
</style>
