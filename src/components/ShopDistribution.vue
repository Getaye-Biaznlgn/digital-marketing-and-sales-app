<template>
  <button @click="showSendModal" class="btn border ms-auto d-block">
    Send Product
  </button>
  <!-- Table -->
  <table class="mt-2">
    <tr>
      <th>No</th>
      <th>Model</th>
      <th>Name</th>
      <th>Qty</th>
      <th>Status</th>
      <th><span class="sr-only">Action</span></th>
    </tr>
    <tr
      v-for="(product, index) in pendingProducts"
      :key="product.id"
      class="text-capitalize"
    >
      <td>{{ index + 1 }}</td>
      <td style="white-space: nowrap">{{ product.model }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.qty }}</td>
      <td>{{ product.status }}</td>
      <td class="d-flex">
        <!-- <span class="me-2" @click="showEditModal(product)" role="button"
          ><i class="far fa-edit"></i
        ></span> -->
        <span class="me-2" @click="deleteProduct(product)" role="button"
          ><i class="fas fa-trash"></i
        ></span>
      </td>
    </tr>
  </table>

  <!-- modal to select and send product to agent -->
  <base-modal
    :modalState="isSendProductModalVisible"
    @close="closeSendModal"
    title="Select Product"
    btnLabel="Send"
    :isLoading="isLoading"
    @submit="sendProductsToAgent"
  >
    <input
      v-model="searchByName"
      class="form-control rounded-pill"
      placeholder="Search"
      type="text"
    />
    <ul class="m-0 p-0">
      <li
        v-for="(product, index) in filteredProduct"
        :key="product.id"
        class="my-2 p-2 border-bottom shadow-sm d-flex justify-content-between"
      >
        <!-- <div class="form-check">
      <input class="form-check-input" v-model="selectedProductQty" max="100" type="checkbox" :value="{product_id:product.id, qty:''}" :id="'flexCheck'+key">
        <label class="form-check-label" for="flexCheckDefault">
        {{product.name}}
      </label>
      </div> -->
        <div class="">{{ index + 1 + "." + " " + product.name }}</div>
        <div>
          <input
            min="1"
            type="text"
            maxlength="4"
            size="4"
            class="p-0"
            placeholder="Qty"
            @blur="setValue(product.id, $event)"
            name="qty"
            :id="'qty' + index"
          />
        </div>
        <!-- <button @click="addProduct({product_id:product.id, qty})" class="btn btn-primary text-light" >Add</button> -->
      </li>
    </ul>
  </base-modal>
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  props: {
    pendingProducts: {
      required: true,
    },
    allProducts: {
      required: true,
    },
    shopId: {
      required: true,
    },
    shopProducts: {
      required: false,
    },
  },
  emits: {
    newProductAdded() {
      return true;
    },
  },
  data() {
    return {
      isSendProductModalVisible: false,
      searchResult: "",
      //
      searchByName: "",
      selectedProductQty: [],

      isLoading: false,
      timeout: "",
      //alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: "",
    };
  },
  computed: {
    filteredProduct() {
      let tempProduct = [...this.allProducts];
      if (this.searchByName !== "") {
        tempProduct = tempProduct.filter((product) => {
          return product.name
            .toString()
            .toLowerCase()
            .startsWith(this.searchByName.toLowerCase());
        });
      }
      return tempProduct;
    },
  },
  methods: {
    addProduct(value) {
      this.selectedProductQty.push(value);
    },
    setValue(productId, event) {
      let index = this.selectedProductQty.findIndex(
        (product) => product.product_id.toString() == productId.toString()
      );
      if (index == -1) {
        if (event.target.value != "") {
          this.selectedProductQty.push({
            product_id: productId,
            qty: event.target.value,
          });
        } else {
          this.selectedProductQty[index].qty = event.target.value;
        }
      }
    },
    async deleteProduct(product) {
     this.$emit('deletePendingProduct', product)
    },
    showSendModal() {
      this.isSendProductModalVisible = true;
    },
    closeSendModal() {
      this.isSendProductModalVisible = false;
    },
    search(product) {
      // this.searchIndex=index
      this.searchResult = [...this.allProducts];
      if (product !== "") {
        this.searchResult = this.allProducts.filter((item) => {
          return item.id.toString() === product.id?.toString();
        });
      } else {
        this.searchResult = [...this.allProducts];
      }
    },
    async sendProductsToAgent() {
      this.isLoading = true;
      try {
        const response = await apiClient.post(
          "/api/product_distribution_data",
          {
            shop_id: this.shopId,
            products: [...this.selectedProductQty],
          }
        );
        if (response.status == 200) {

          this.$emit("newProductAdded", response.data);
           this.isAlertVisible = true;
        this.alertMessage = "The product is successfully sent to shop.";
        this.isRequestSucceed = true;
        }
       else if(response.status == 201){
        this.isAlertVisible = true;
        this.alertMessage = "The requested product quantity is over the stock.";
        this.isRequestSucceed = false;
        }

        else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to send product";
        this.isRequestSucceed = false;
      } finally {
        this.isLoading = false;
        this.dismissAlert();
        this.closeSendModal();
      }
    },
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
  },
  created() {
    this.searchResult = this.allProducts;
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  watch: {
    allProducts(newValue) {
      this.searchResult = newValue;
    },
  },
};
</script>
