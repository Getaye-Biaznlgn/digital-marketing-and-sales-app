<template>
  <div class="">
    <div class="d-flex">
      <span
        @click="$router.back()"
        role="button"
        class="text-dark-blue p-1 fw-bold fs-5"
        ><i class="fas fa-arrow-left"></i
      ></span>
      <span class="mt-1 fs-5 fw-bold">Shop Detail</span>
    </div>

    <div class="mx-3">
      <div class="d-flex justify-content-between">
        <div>
          <p class="text-capitalize mb-1">
            <strong class="me-1"> Shop name:</strong>{{ shop?.shop_name }}
          </p>
          <p class="text-capitalize mb-1">
            <strong class="me-1"> Shop status:</strong
            >{{ shop?.shop_status ? "Active" : "Inactive" }}
          </p>
        </div>
        <div>
          <p class="text-capitalize mb-1">
            <strong class="me-1"> Shop location:</strong
            >{{ shop?.region + "/" + shop.city }}
          </p>
          <p class="text-capitalize mb-1">
            <strong class="me-1"> Shop manager:</strong
            >{{ shop?.manager_first_name + " " + shop?.manager_last_name }}
          </p>
        </div>
      </div>
      <button
        @click="selectedComponent = 'ShopProduct'"
        :class="{
          'btn-bg-primary text-light': selectedComponent == 'ShopProduct',
        }"
        class="btn me-3 border"
      >
        Products on the shop
      </button>
      <button
        @click="selectedComponent = 'ShopDistribution'"
        :class="{
          'btn-bg-primary text-light': selectedComponent == 'ShopDistribution',
        }"
        class="btn border"
      >
        Product for approval
      </button>
      <hr />
      <keep-alive>
        <component
          :shopId="$route.params.id"
          @deletePendingProduct="deletePendingProduct"
          @newProductAdded="addPendingProduct"
          :pendingProducts="pendingProducts"
          :allProducts="allProducts"
          :shopProducts="shop.products"
          :is="selectedComponent"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import apiClient from "../resources/baseUrl";
import ShopDistribution from "../components/ShopDistribution.vue";
import ShopProduct from "../components/ShopProduct.vue";
export default {
  components: {
    ShopDistribution,
    ShopProduct,
  },
  data() {
    return {
      shop: {},
      // allProducts:[],
      pendingProducts: [],
      selectedComponent: "ShopProduct",
    };
  },
  computed: {
    allProducts() {
      return this.$store.getters.products;
    },
  },
  methods: {
    showSendProductModal() {
      this.selectedComponent = "ShopProduct";
      this.selectedComponent = "ShopDistribution";
      // this.isSendProductModalVisible=true;
    },
    addPendingProduct(value) {
      let previous = this.pendingProducts;
      this.pendingProducts = [...value, ...previous];
    },
    async fetchShopProduct() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/shop_products/${this.$route.params.id}`
        );
        if (response.status === 200) {
          this.shop = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async deletePendingProduct(product) {
      try {
        const response = await apiClient.delete(
          `/api/product_distribution_data/${product.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.pendingProducts.findIndex((prod) => {
            return prod.id === product.id;
          });
          this.pendingProducts.splice(deletedIndex, 1);
        }
      } catch (e) {
        //
      } finally {
        //
      }
    },
    async fetchPendingProduct() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/product_distribution_data/${this.$route.params.id}`
        );
        if (response.status === 200) {
          this.pendingProducts = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    // async fetchAllProducts() {
    //   try {
    //     this.$store.commit("setIsLoading", true);
    //     const response = await apiClient.get(
    //       `/api/products`
    //     );
    //     if (response.status === 200) {
    //       this.allProducts = response.data.data;
    //     }
    //   } catch (e) {
    //     //
    //   } finally {
    //     this.$store.commit("setIsLoading", false);
    //   }
    // },
  },
  created() {
    this.fetchShopProduct();
    // this.fetchAllProducts();
    this.fetchPendingProduct();
  },
};
</script>
