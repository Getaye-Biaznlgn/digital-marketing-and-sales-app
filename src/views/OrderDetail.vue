<template>
<DetailPage title="Order Details">
    <div class="container-fuild mt-2 px-4">
      <div class="row g-5">
        <div class="col-md-6">
          <div class="bg-light px-3 py-2">
            <strong class="d-block fw-bold">Customer</strong>
            <div class="text-capitalize mt-2">
              <span class="fw-bold">Full Name:</span>
              {{ " " + order.first_name + " " + order.last_name }}
            </div>
            <div>
              <span class="fw-bold">Phone No:</span
              >{{ " " + order.phone_number }}
            </div>
            <div>
              <span
                ><span class="fw-bold">Region:</span
                ><span v-if="order.region">{{ " " + order.region }}</span> </span
              >
            </div>
            <div class="d-flex justify-content-between">
              <span
                ><span class="fw-bold">Zone:</span>
                <span v-if="order.woreda">{{ " " + order.zone }}</span>
                </span
              >
              <span
                ><span class="fw-bold">Woreda:</span
                ><span v-if="order.woreda">{{ " " + order.woreda }}</span> </span
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="bg-light px-3 py-2">
            <strong class="shop">Shop</strong>
            <div class="text-capitalize mt-2 d-flex flex-column">
              <span
                ><span class="fw-bold">Shop Name:</span
                >{{ " " + order.shop?.name }}</span
              >
              <span
                ><span class="fw-bold">Region:</span
                >{{ " " + order.shop?.region }}</span
              >
              <span
                ><span class="fw-bold">Zone:</span
                >{{ " " + order.shop?.zone }}</span
              >
              <span
                ><span class="fw-bold">Woreda:</span
                >{{ " " + order.shop?.woreda }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order detail -->
    <div class="mx-4 mt-5 p-3 bg-light">
      <table>
        <tr>
          <th>No</th>
          <th>Model</th>
          <th>Image</th>
          <th>Name</th>
          <th>Qty</th>
          <th style="white-space:nowrap;">Unit Price</th>
          <th>Total</th>
        </tr>
        <tr v-for="(item, index) in order.order_items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.model }}</td>
          <td>
            <img
              :src="item.image?.path"
              width="100"
              height="100"
              alt="Product image"
            />
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>{{ item.qty }}</td>
          <td>{{ item.unit_price }}</td>
          <td>{{ item.qty * item.unit_price }}</td>
        </tr>
        <tr>
          <td class="fw-bold" colspan="6">Total Qty</td>
          <td>{{totalQty}}</td>
        </tr>
        <tr>
          <td class="fw-bold" colspan="6">Total Price</td>
          <td>{{ order.total_price }}</td>
        </tr>
      </table>
    </div>
</DetailPage>
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  data() {
    return {
      order: {},
    };
  },
  computed: {
    totalQty() {
      return this.order.order_items?.reduce(function (accumulator, order) {
        return accumulator + order.qty;
      }, 0);
    },
  },
  methods: {
    async fetchCategories() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/order_detail/${this.$route.params.id}`
        );
        if (response.status === 200) {
          this.order = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
th {
  background-color: lightgray;
}
/* table, tr, th{
    border-collapse: unset;
} */
tr {
  border-top: 2x solid red;
}
/* table{
    border-collapse: inherit;
} */
</style>
