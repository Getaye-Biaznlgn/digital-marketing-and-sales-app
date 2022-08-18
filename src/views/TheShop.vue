<template>
  <div class="m-3">
    <h5>Agent Shop</h5>
    <div class="d-flex justify-content-between">
      <ul class="nav mt-4">
        <li class="nav-item-tab">
          <a
            class="nav-link text-black"
            :class="{
              'border-bottom border-dark border-2': filterString == 'all',
            }"
            role="button"
            @click="fetchByFilter('all')"
          >
            All shops
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-black"
            role="button"
            :class="{
              'border-bottom border-dark border-2': filterString == 'active',
            }"
            @click="fetchByFilter('active')"
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
            @click="fetchByFilter('inactive')"
          >
            Inactive
          </a>
        </li>
      </ul>
      <div>
        <button
          v-if="hasPermissionTo('add shop')"
          @click="navigateToAddShop"
          class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
        >
          Add New Shop/Agent
        </button>
      </div>
    </div>

    <hr class="my-0" />
    <div class="d-flex p-2 selection-bar justify-content-between">
      <div class="position-relative w-50 me-2">
        <input
          type="text"
          v-model="searchValue"
          @keyup.enter="searchShop"
          class="form-control rounded-pill pe-5"
          placeholder="Search by name or city"
          aria-label="search"
          aria-describedby="basic-add"
        />
        <span
          @click="searchShop"
          role="button"
          class="position-absolute end-0 top-0 p-2 me-2"
          ><i class="fas fa-search"></i
        ></span>
      </div>
      <div>
        <button @click="downloadCSV()" class="btn border">Export</button>
      </div>
    </div>
    <!-- Table -->
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Region</th>
        <th>Zone</th>
        <th>City</th>
        <th>Owner</th>
        <th>Status</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(shop, index) in shops" :key="shop.id" class="text-capitalize">
        <td>{{ pageNo * perPage - perPage + index + 1 }}</td>
        <td>{{ shop.name }}</td>
        <td>{{ shop.region }}</td>
        <td>{{ shop.zone }}</td>
        <td>{{ shop.city }}</td>
        <td>
          <span>{{ shop.first_name + " " + shop.last_name }}</span>
        </td>
        <td>{{ shop.shop_status ? "Active" : "Inactive" }}</td>
        <td style="white-space: nowrap">
          <span
            v-if="hasPermissionTo('edit shop')"
            class="me-2"
            @click="
              $router.push({
                name: 'UpdateShop',
                params: { id: shop.id },
              })
            "
            role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span
            v-if="hasPermissionTo('delete shop')"
            class="me-2"
            @click="showDeleteModal(shop)"
            role="button"
          >
            <i class="fas fa-trash"></i
          ></span>
          <span
            @click="
              $router.push({ name: 'ShopDetail', params: { id: shop.id } })
            "
            role="button"
            ><i class="fas fa-eye"></i
          ></span>
        </td>
      </tr>
    </table>
    <div v-if="!shops.length" class="mt-2 text-center">No record</div>
    <!-- pagination -->
    <div v-if="!isSearch" class="d-flex justify-content-end my-3 me-2">
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
        v-model="pageNo"
        :page-count="totalPage"
        :click-handler="fetchByPageNo"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'d-flex nav page-item'"
      >
      </paginate>
    </div>
  </div>

  <!-- <base-modal
    :modalState="isUpdateModalVisible"
    btnLabel="Save"
    :isLoading="isLoading"
    title="Shop"
    @close="closeEditModal"
    @submit="updateShop">
  
  </base-modal> -->

  <!-- delete base modal -->
  <base-modal
    :modalState="isDeleteModalVisible"
    btnLabel="Delete"
    :isLoading="isLoading"
    title="Delete Shop"
    @close="closeDeleteModal"
    @submit="deleteShop"
  >
    <p>
      Do u want to delete? <br />
      {{ shopForDelete?.name }}
    </p>
  </base-modal>

  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="false"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import Paginate from "vuejs-paginate-next";
import useValidate from "@vuelidate/core";
import exportFromJSON from "export-from-json";
// import { required, helpers, maxLength } from "@vuelidate/validators";
export default {
  components: {
    Paginate,
  },
  data() {
    return {
      v$: useValidate(),
      // isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      shopForDelete: {},
      filterString: "",
      alertMessage: "",
      searchValue: "",
//
      isLoading: false,
      shops: [],
      //shop for edit
      shop: {},
      // alert
      isAlertVisible: false,
      timeout: "",
      //paginate
      perPage: 10,
      pageNo: 1,
      totalPage: 0,
      //to make the pagination off on search result
      isSearch: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    hasPermissionTo(act) {
      let index = this.user?.role?.permissions.findIndex(
        (per) => per.name.toLowerCase() === act.toLowerCase()
      );
      if (!isNaN(index) && index !== -1) return true;
      return false;
    },
    downloadCSV() {
      const data = this.shops;
      const fileName = "shops";
      const exportType = exportFromJSON.types.csv;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
    resetFieldEmpity() {
      (this.shop.name = ""), (this.shop.code = "");
    },
    showDeleteModal({ ...shop }) {
      this.shopForDelete = shop;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    // showEditModal({ ...shop }) {
    //   this.shop = shop;
    //   this.isUpdateModalVisible = true;
    // },
    // closeEditModal() {
    //   this.isUpdateModalVisible = false;
    // },
    navigateToAddShop() {
      this.$router.push({ name: "AddShop" });
    },
    // async updateShop() {
    //  this.shop.shop_status=this.$refs.shopStatus.checked
    //   this.v$.$validate();
    //   if (!this.v$.$error) {
    //     this.isLoading = true;
    //     try {
    //       const response = await apiClient.put(
    //         `/api/shops/${this.shop.id}`,
    //         {
    //           is_active: this.$refs.shopStatus.checked,
    //           ...this.shop
    //         }

    //       );
    //       if (response.status === 200) {
    //         const editedIndex = this.shops.findIndex((shop) => {
    //           return this.shop.id === shop.id;
    //         });
    //         this.shops[editedIndex] = this.shop;
    //         ///
    //       } else throw "";
    //     } catch (e) {
    //       this.alertMessage = "Faild to update shop";
    //       this.isAlertVisible = true;
    //       this.dismissAlert();
    //     } finally {
    //       this.isLoading = false;
    //       this.closeEditModal();
    //     }
    //   }
    // },

    async deleteShop() {
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/shops/${this.shopForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.shops.findIndex((shop) => {
            return shop.id === this.shopForDelete.id;
          });
          this.shops.splice(deletedIndex, 1);
        }
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to delete a shop";
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
      }
    },
    async searchShop() {
      if (this.searchValue == "") return this.fetchShops("all");

      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.post(
          `/api/search_shops?search=${this.searchValue}`
        );
        if (response.status === 200) {
          this.shops = response.data.data;
          this.filterString = " ";
          this.isSearch = true;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async fetchShops(filterQuery) {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/shops?filter=${filterQuery}&&page=${this.pageNo}&&per_page=${this.perPage}`
        );
        if (response.status === 200) {
          this.shops = response.data.data;
          this.filterString = filterQuery;
          this.isSearch = false;
          this.perPage = response.data.meta.per_page;
          this.pageNo = response.data.meta.current_page;
          this.totalPage = response.data.meta.last_page;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    fetchByFilter(filter) {
      this.pageNo = 1;
      this.fetchShops(filter);
    },
    //paginations
    fetchByPageNo(no) {
      this.pageNo = no;
      this.fetchShops(this.filterString);
    },
    handlePerPage() {
      this.pageNo = 1;
      this.fetchShops(this.filterString);
    },
  },
  created() {
    this.fetchShops("all");
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  // validations() {
  //   return {
  //     shop: {
  //       name: {
  //         required: helpers.withMessage("Shop name is required", required),
  //         max: helpers.withMessage(
  //           "Name should not be greater than 50 characters",
  //           maxLength(50)
  //         ),
  //       },
  //       region: {
  //         required: helpers.withMessage("Shop region is required", required),
  //       },
  //       zone: {
  //         required: helpers.withMessage("Zone is required", required),
  //       },
  //       city: {
  //         required: helpers.withMessage("City is required", required),
  //       },
  //       // woreda: {
  //       //   required: helpers.withMessage("Woreda is required", required),
  //       // },
  //       // kebele: {
  //       //   required: helpers.withMessage("Kebele is required", required),
  //       // },
  //     },
  //   };
  // },
};
</script>
