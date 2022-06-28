<template>
  <div class="m-3">
    <h5>Products</h5>
    <div>
      In the product section, you will review and manage all products with their
      details. You can view and edit many information such as product name,
      description, stock, price and more.
    </div>
    <div class="d-flex justify-content-between mt-4">
      <ul class="nav">
        <li class="nav-item-tab">
          <a
            class="nav-link text-black"
            :class="{
              'border-bottom border-dark border-2': filterString == 'all',
            }"
            role="button"
            @click="fetchProducts('all')"
          >
            All Products
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            role="button"
            :class="{
              'border-bottom border-dark border-2': filterString == 'outstock',
            }"
            @click="fetchProducts('outstock')"
          >
            Out Stock
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            role="button"
            :class="{
              'border-bottom border-dark border-2': filterString == 'instock',
            }"
            @click="fetchProducts('instock')"
          >
            In stock
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link text-black"
            role="button"
            :class="{
              'border-bottom border-dark border-2': filterString == 'active',
            }"
            @click="fetchProducts('active')"
          >
            Active
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link text-black"
            role="button"
            :class="{
              'border-bottom border-dark border-2': filterString == 'inactive',
            }"
            @click="fetchProducts('inactive')"
          >
            In Active
          </a>
        </li>
      </ul>
      <button @click="showAddModal" class="btn btn-bg-primary mb-1 text-light">
        Add New Product
      </button>
    </div>

    <hr class="my-0" />
    <div class="d-flex p-2 selection-bar justify-content-between">
      <div class="position-relative w-50 me-2">
        <input
          type="text"
          v-model="searchValue"
          class="form-control rounded-pill pe-5"
          placeholder="Search by name"
          aria-label="Recipient's username"
          @keyup.enter="searchProduct(searchValue)"
          aria-describedby="basic-add"
        />
        <span @click="searchProduct(searchValue)" role="button" class="position-absolute end-0 top-0 p-2 me-2"
          ><i class="fas fa-search"></i
        ></span>
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
        <td>{{ pageNo * perPage - perPage + index + 1 }}</td>
        <td style="white-space: nowrap">{{ product.model }}</td>
        <td>
          <img
            :src="product.images?.path"
            width="80"
            height="70"
            alt="product image"
          />
        </td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.qty }}</td>
        <td>{{ product.weight }}</td>
        <td>{{ product.category?.title }}</td>
        <td style="white-space:nowrap;">{{ product.is_active ? "Active" : "In active" }}</td>
        <td class="d-flex">
          <span
            class="me-2"
            @click="
              $router.push({
                name: 'ProductDetail',
                params: { id: product.id },
              })
            "
            role="button"
            ><i class="far fa-eye"></i
          ></span>
          <span
            class="me-2"
            @click="
              $router.push({
                name: 'UpdateProduct',
                params: { id: product.id },
              })
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
  <!-- pagination -->
  <div class="d-flex justify-content-end mb-3 me-2">
    <div class="me-3">
      <select
        @change="handlePerPage()"
        v-model="perPage"
        class="form-select"
        aria-label="perPage"
      >
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>

    <paginate
      :page-count="totalPage"
      :click-handler="fetchByPageNo"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'d-flex nav page-item'"
    >
    </paginate>
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
import Paginate from "vuejs-paginate-next";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onBeforeUnmount } from "vue";
export default {
  components: { Paginate },
  setup() {
    const store = useStore();
    const router = useRouter();
    var isDeleteModalVisible = ref(false);
    var products = ref([]);
    // const products = computed(() => store.getters.products);
    var isLoading = ref(false);
    var productForDelete = ref();
    var isAlertVisible = ref(false);
    var timeout = ref(false);
    var searchValue = ref("");
    var filterString = ref("all");
    var perPage = ref(10);
    var pageNo = ref(1);
    var totalPage = ref();
    // var filteredProduct = computed(() => {
    //   if (searchValue.value == "") {
    //     return products.value;
    //   }
    //   return products.value.filter((product) =>
    //     product.name.toLowerCase().includes(searchValue.value.toLowerCase())
    //   );
    // });
    const searchProduct = async function (searchQuery) {
       try {
        store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/search?search=${searchQuery}`
        );
        if (response.status === 200) {
          products.value = response.data.data;
          filterString.value = '';
          perPage.value = response.data.meta.per_page;
          pageNo.value = response.data.meta.current_page;
          totalPage.value = response.data.meta.last_page;
        }
      } catch (e) {
        //
      } finally {
        store.commit("setIsLoading", false);
      }
    };
    const fetchByPageNo = async function (no) {
      pageNo.value = no;
      fetchProducts(filterString.value);
    };
    const handlePerPage = async function () {
      pageNo.value=1
      fetchProducts(filterString.value);
    };
    const fetchProducts = async function (query) {
      try {
        store.commit("setIsLoading", true);
        searchValue.value=''
        const response = await apiClient.get(
          `/api/products?filter=${query}&&page=${pageNo.value}&&per_page=${perPage.value}`
        );
        if (response.status === 200) {
          products.value = response.data.data;
          filterString.value = query;
          perPage.value = response.data.meta.per_page;
          pageNo.value = response.data.meta.current_page;
          totalPage.value = response.data.meta.last_page;
        }
      } catch (e) {
        //
      } finally {
        store.commit("setIsLoading", false);
      }
    };

    
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
        // const response = await apiClient.delete(
        //   `/api/products/${productForDelete.value.id}`
        // );
        store.dispatch("deleteProducts", productForDelete.value.id);
        closeDeleteModal();
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
    // store.dispatch("fetchProducts");
    fetchProducts("all");
    return {
      showAddModal,
      closeDeleteModal,
      deleteProduct,
      showDeleteModal,
      fetchProducts,
      fetchByPageNo,
      handlePerPage,
      searchProduct,
      isAlertVisible,
      isDeleteModalVisible,
      productForDelete,
      products,
      isLoading,
      searchValue,
      filterString,
      perPage,
      pageNo,
      totalPage,
    };
  },
};
</script>
<style scoped></style>
