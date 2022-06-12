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
        v-for="(product,index) in products"
        :key="product.id"
      >
        <td>{{index+1}}</td>
        <td>{{product.model}}</td>
        <td>
          <img
            :src="product.images?.[index]?.image_path"
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
          <span class="me-2" @click="$router.push({name:'ProductDetail'})" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
    <add-product-modal :isAddModalVisible="isAddModalVisible" @closeAddModal="closeAddModal"/>
</template>

<script>
import AddProductModal from '../components/AddProductModal.vue'
import apiClient from '../resources/baseUrl'
import {useStore} from 'vuex'
import { ref} from 'vue';
export default {
 components:{
    AddProductModal
 },
  setup(){
    const store= useStore();
   var isAddModalVisible= ref(false);
   var products = ref({});
   var closeAddModal= function(){
        isAddModalVisible.value= false
   }
   var showAddModal= function(){
      isAddModalVisible.value = true;
   }
   const fetchProducts= async function(){
       try {
        store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/products`
        );
        if (response.status === 200) {
           products.value=response.data
           console.log('products...', products)
        }
      } catch (e) {
        //
      } finally {
        store.commit("setIsLoading", false);
      }
   }
   fetchProducts()
    return {
      isAddModalVisible,
      closeAddModal,
      showAddModal,
      products
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
.text-dark-blue {
  color: #2f4587;
}
.btn-bg-primary {
  background-color: #ff7e00;
}
.warining input,
.warining textarea {
  border: 1px red solid;
}
.warining span {
  display: inline;
  color: red;
  font-size: 14px;
}
</style>
