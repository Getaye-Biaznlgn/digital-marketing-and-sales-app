<template>
  <div class="m-3">
    <h5>Product Details</h5>
    <div>
      In the product section, you will review and manage all products with their
      details. You can view and edit many information such as product name,
      description, stock, price and more.
    </div>
    <button
      @click="showAddModal"
      class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
    >
      Add New Product
    </button>
    <hr />
    <div class="d-flex justify-content-between p-2 selection-bar">
      <div class="d-flex rounded-pill">
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
    <tr v-for="(product, index) in products" :key="product.id">
      <td>{{ index + 1 }}</td>
      <td>{{ product.model }}</td>
      <td>
        <img
          :src="product.images?.path"
          width="100"
          height="100"
          alt="product image"
        />
      </td>
      <td>{{ product.name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.qty }}</td>
      <td>{{ product.weight }}</td>
      <td>{{ product.category?.title }}</td>
      <td>{{ product.is_active ? "Active" : "In active" }}</td>
      <td class="d-flex">
        <span
          class="me-2"
          @click="
            $router.push({ name: 'ProductDetail', params: { id: product.id } })
          "
          role="button"
          ><i class="far fa-edit"></i
        ></span>
        <span @click="showDeleteModal(product)" role="button"
          ><i class="fas fa-trash"></i
        ></span>
      </td>
    </tr>
  </table>
  </div>

 
  <!-- delete base modal -->
  <base-modal
    :modalState="isDeleteModalVisible"
    @close="closeDeleteModal"
    title="Delete Product"
    btnLabel="Delete"
    :isLoading="isLoading"
    @submit="deleteProduct"
  >
    <p>Do u want to delete?</p>
    <p>{{ productForDelete?.name }}</p>
  </base-modal>
  <the-alert
    :isVisible="isAlertVisible"
    message="Faild to delete product"
    :isSucceed="false"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onBeforeUnmount, computed } from "vue";
export default {
  components: {
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    var isDeleteModalVisible = ref(false);
    const products= computed(()=>store.getters.products)
    var isLoading = ref(false);
    var productForDelete = ref();
    var isAlertVisible = ref(false);
    var timeout = ref(false);
   
    var showAddModal = function () {
      router.push({ name: "AddProduct" });
      // productForDelete.value= product
      //   isAddModalVisible.value = true;
    };
    var showDeleteModal = function (product) {
      productForDelete.value = product;
      isDeleteModalVisible.value = true;
    };

    const closeDeleteModal = async function () {
      isDeleteModalVisible.value = false;
    };
    const deleteProduct = async function () {
      isLoading.value = true;
      try {
        const response = await apiClient.delete(
          `/api/products/${productForDelete.value.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.products.findIndex((product) => {
            return product.id === this.productForDelete.id;
          });
          this.products.splice(deletedIndex, 1);
          this.closeDeleteModal();
        }
      } catch (e) {
        isAlertVisible.value = true;
      } finally {
        isDeleteModalVisible.value = false;
        isLoading.value = false;
        dismissAlert();
      }
    };
    const dismissAlert = function () {
      timeout.value = setTimeout(() => {
        isAlertVisible.value = false;
      }, 2000);
    };

    onBeforeUnmount(function () {
      clearTimeout(timeout);
    });
    return {
      showAddModal,
      closeDeleteModal,
      deleteProduct,
      showDeleteModal,
      isAlertVisible,
      isDeleteModalVisible,
      productForDelete,
      products,
      isLoading,
    };
  },
};
</script>


