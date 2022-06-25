<template>
  <div class="m-3">
    <h5>Product order</h5>
    <div>
      In the order section, you will review and manage all solar product orders.
    </div>
    <!-- <button
      @click="AddOrderPage"
      class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
    >
      Add New Order
    </button> -->
    <hr />
    <div class="d-flex p-2 selection-bar justify-content-between">
      <div class="position-relative w-50 me-2">
        <input
          type="text"
          v-model="searchValue"
          class="form-control rounded-pill pe-5"
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-add"
        />
        <span role="button" class="position-absolute end-0 top-0 p-2 me-2"
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
        <th>Order Id</th>
        <th>Customer</th>
        <th>Order Date</th>
        <th>Shop</th>
        <th>Order Status</th>
        <th>Payment Method</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(order, index) in orders" :key="order.id">
        <td>{{ index + 1 }}</td>
        <td>{{ order.order_ref }}</td>
        <td>{{ order.first_name + " " + order.last_name }}</td>
        <td>{{ (new Date(order.order_date)).toString().split(' ').slice(0,4).join(' ')  }}</td>
        <td>{{ order.shop_name }}</td>
        <td>{{ order.order_status }}</td>
        <td>--\\--</td>
        <td>
          <span class="me-2" @click="showDetail(order.id)" role="button"
            ><i class="far fa-eye"></i
          ></span>
          <span @click="showDeleteModal(order)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
  </div>
  <!-- add orders -->
  <base-modal
    :modalState="isAddModalVisible"
    title="order"
    @close="closeAddModal"
    btnLabel="Save"
    :isLoading="isLoading"
    @submit="addNewOrder"
  >
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.order.title.$error }">
        <label for="title" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model.trim="order.title"
          @blur="v$.order.title.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.order.title.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.order.description.$error }">
        <label for="description" class="form-label">Description</label>
        <textarea
          rows="5"
          class="form-control"
          id="description"
          v-model.trim="order.description"
          @blur="v$.order.description.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.order.description.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
    </form>
  </base-modal>

  <!-- delete base modal -->
  <base-modal
    :modalState="isDeleteModalVisible"
    btnLabel="Delete"
    :isLoading="isLoading"
    title="Delete Image"
    @close="closeDeleteModal"
    @submit="deleteOrder"
  >
    <p>
      Do u want to delete? <br />
      {{ orderForDelete?.pin }}
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
import apiClient from "../resources/baseUrl";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      orderForDelete: {},
      alertMessage: "",

      isLoading: false,
      orders: [],
      order: {
        title: "",
        description: "",
      },
      // alert
      isAlertVisible: false,
      timeout: "",
      // to use add modal as edit depend on the condition and #forUpdate to
      //chage the action which should be performed
      forUpdate: false,
    };
  },
  methods: {
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
    resetFieldEmpity() {
      // (this.order.title = ""), (this.order.description = "");
    },
    showDeleteModal({ ...order }) {
      this.orderForDelete = order;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    showDetail(id){
       this.$router.push({name:'OrderDetail', params:{id:id}})
    },
    // showEditModal({ ...order }) {
    //   this.forUpdate = true;
    //   this.order = order;
    //   this.isAddModalVisible = true;
    // },
    closeAddModal() {
      this.v$.$reset();
      this.resetFieldEmpity();
      this.isAddModalVisible = false;
    },
    AddOrderPage() {
      // this.isAddModalVisible = true;
      this.$router.push({name:'AddNewOrder'})
    },
    // async updateOrder() {
    //   this.v$.$validate();
    //   if (!this.v$.$error) {
    //     this.isLoading = true;
    //     try {
    //       const response = await apiClient.put(
    //         `/api/orders/${this.order.id}`,
    //         this.order
    //       );
    //       if (response.status === 200) {
    //         const editedIndex = this.orders.findIndex((order) => {
    //           return this.order.id === order.id;
    //         });
    //         this.orders[editedIndex] = response.data;
    //         ///
    //       } else throw "";
    //     } catch (e) {
    //       this.alertMessage = "Faild to update order";
    //       this.isAlertVisible = true;
    //       this.dismissAlert();
    //     } finally {
    //       this.isLoading = false;
    //       this.closeAddModal();
    //       this.forUpdate = false;
    //     }
    //   }
    // },
    async addNewOrder() {
      // if (this.forUpdate) {
      //   this.updateOrder();
      //   return;
      // }

      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/orders", this.order);
          if (response.status === 201) {
            this.orders.push(response.data);
          } else throw "";
        } catch (e) {
          this.isAlertVisible = true;
          this.alertMessage = "Faild to add a new order";
          this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
        }
      }
    },
    async deleteOrder() {
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/orders/${this.orderForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.orders.findIndex((order) => {
            return order.id === this.orderForDelete.id;
          });
          this.orders.splice(deletedIndex, 1);
        }
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to delete a new order";
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
      }
    },
    async fetchOrders() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/all_orders`);
        if (response.status === 200) {
          this.orders = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchOrders();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      order: {
        title: {
          required: helpers.withMessage("order title is required", required),
        },
        description: {
          required: helpers.withMessage(
            "order description is required",
            required
          ),
        },
      },
    };
  },
};
</script>
