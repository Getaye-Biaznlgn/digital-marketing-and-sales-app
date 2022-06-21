<template>
  <div class="m-3">
    <h5>Agent Shop</h5>
    <button
      @click="navigateToAddShop"
      class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
    >
      Add New Shop/Agent
    </button>
    <hr />
    <div class="d-flex  p-2 selection-bar justify-content-between">
      <div class="position-relative w-50 me-2">
        <input
          type="text"
          v-model="searchValue"
          class="form-control rounded-pill pe-5"
          placeholder="Search by name"
          aria-label="Recipient's username"
          aria-describedby="basic-add"
        />
        <span role="button" class="position-absolute  end-0 top-0 p-2 me-2"
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
        <th>Name</th>
        <th>Region</th>
        <th>Zone</th>
        <th>City</th>
        <th>Owner</th>
        <th>Status</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(shop, index) in shops" :key="shop.id" class="text-capitalize">
        <td>{{ index + 1 }}</td>
        <td>{{ shop.shop_name }}</td>
        <td>{{ shop.region }}</td>
        <td>{{ shop.zone }}</td>
        <td>{{ shop.city }}</td>
        <td> <span v-if="shop.manager">{{ shop.manager?.first_name + " " + shop.manager?.last_name }}</span>
             <span v-else>--|--</span>
        </td>
        <td>{{ shop.is_active ? "Active" : "In active" }}</td>
        <td>
          <span class="me-2" @click="showEditModal(shop)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span class="me-2" @click="showDeleteModal(shop)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
          <span @click="$router.push({name:'ShopDetail', params:{id:shop.id}})" role="button"><i class="fas fa-eye"></i></span>
        </td>
      </tr>
    </table>
  </div>
  <base-modal
    :modalState="isUpdateModalVisible"
    btnLabel="Save"
    :isLoading="isLoading"
    title="Shop"
    @close="closeEditModal"
    @submit="updateShop"
  >
    <div class="mb-3" :class="{ warining: v$.shop.shop_name.$error }">
      <label for="shop_name" class="form-label">Shop name</label>
      <input
        type="text"
        class="form-control"
        id="shop_name"
        v-model.trim="shop.shop_name"
        @blur="v$.shop.shop_name.$touch"
      />
      <span
        class="error-msg mt-1"
        v-for="(error, index) of v$.shop.shop_name.$errors"
        :key="index"
      >
        {{ error.$message + ", " }}</span
      >
    </div>
    <div class="mb-3" :class="{ warining: v$.shop.region.$error }">
      <label for="region" class="form-label">Region</label>
      <input
        type="text"
        class="form-control"
        id="region"
        v-model.trim="shop.region"
        @blur="v$.shop.region.$touch"
      />
      <span
        class="error-msg mt-1"
        v-for="(error, index) of v$.shop.region.$errors"
        :key="index"
      >
        {{ error.$message + ", " }}</span
      >
    </div>
    <div class="mb-3" :class="{ warining: v$.shop.zone.$error }">
      <label for="zone" class="form-label">Zone</label>
      <input
        type="text"
        class="form-control"
        id="zone"
        v-model.trim="shop.zone"
        @blur="v$.shop.zone.$touch"
      />
      <span
        class="error-msg mt-1"
        v-for="(error, index) of v$.shop.zone.$errors"
        :key="index"
      >
        {{ error.$message + ", " }}</span
      >
    </div>
    <div class="mb-3" :class="{ warining: v$.shop.city.$error }">
      <label for="city" class="form-label">City</label>
      <input
        type="text"
        class="form-control"
        id="city"
        v-model.trim="shop.city"
        @blur="v$.shop.city.$touch"
      />
      <span
        class="error-msg mt-1"
        v-for="(error, index) of v$.shop.city.$errors"
        :key="index"
      >
        {{ error.$message + ", " }}</span
      >
    </div>
  </base-modal>

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
      {{ shopForDelete?.shop_name }}
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
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      shopForDelete: {},
      alertMessage: "",

      isLoading: false,
      shops: [],
      //shop for edit
      shop: {},
      // alert
      isAlertVisible: false,
      timeout: "",
    };
  },
  methods: {
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
    showEditModal({ ...shop }) {
      this.shop = shop;
      this.isUpdateModalVisible = true;
    },
    closeEditModal() {
      this.isUpdateModalVisible = false;
    },
    navigateToAddShop() {
      this.$router.push({ name: "AddShop" });
    },
    async updateShop() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.put(
            `/api/shops/${this.shop.id}`,
            this.shop
          );
          if (response.status === 200) {
            const editedIndex = this.shops.findIndex((shop) => {
              return this.shop.id === shop.id;
            });
            this.shops[editedIndex] = this.shop;
            ///
          } else throw "";
        } catch (e) {
          this.alertMessage = "Faild to update shop";
          this.isAlertVisible = true;
          this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeEditModal();
        }
      }
    },

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
    async fetchShops() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/shops`);
        if (response.status === 200) {
          this.shops = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchShops();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      shop: {
        shop_name: {
          required: helpers.withMessage("Shop name is required", required),
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        region: {
          required: helpers.withMessage("Shop region is required", required),
        },
        zone: {
          required: helpers.withMessage("Zone is required", required),
        },
        city: {
          required: helpers.withMessage("City is required", required),
        },
        woreda: {
          required: helpers.withMessage("Woreda is required", required),
        },
        kebele: {
          required: helpers.withMessage("Kebele is required", required),
        },
      },
    };
  },
};
</script>
