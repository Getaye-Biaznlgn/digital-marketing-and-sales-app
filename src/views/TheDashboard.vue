<template>
  <div class="m-3 text-white">
    <div class="container overflow-hidden">
      <div class="row gx-5 gy-3">
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-3">
            <div class="py-2 icon"></div>
            <div class="flex-fill py-2 ms-1">Total Sales</div>
            <div class="text-center">
              <strong class="d-block">400000</strong>
              <span class="small text-grey">Last 7days</span>
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-2">
            <div class="py-2 icon"></div>
            <div class="flex-fill py-2 ms-1">Total Sales</div>
            <div class="text-center">
              <strong class="d-block">400000</strong>
              <span class="small text-grey">Last 30 days</span>
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-2">
            <div class="py-2 icon"></div>
            <div class="flex-fill py-2 ms-1">Total Sales</div>
            <div class="text-center">
              <strong class="d-block">400000</strong>
              <span class="small text-grey">Last 6months</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- chart -->
    <div class="container mt-3 overflow-hidden">
      <div class="row gx-5 gy-3">
        <div class="col-lg-8">
          <div class="bg-blue-black py-4 px-2">
            <div class="d-flex mb-2 mx-2 justify-content-between">
              <strong>Customer Analytics</strong>
              <div>
                <select name="" id="" class="form-select align-items-start">
                  <option>This Week</option>
                </select>
              </div>
            </div>
            <bar-chart class="chart" />
          </div>
        </div>
        <div class="col-lg-4">
          
          <div class="bg-blue-black justify-content-center py-4 px-2">
             <div class="d-flex mb-2 mx-2 justify-content-between">
              <strong>Sold Product Report</strong>
              <div>
                <select name="" id="" class="form-select align-items-start">
                  <option>This Week</option>
                </select>
              </div>
            </div>
            <pie-chart class="chart mx-auto pie-chart" />
          </div>
        </div>
      </div>
    </div>

    <!-- orders -->
    <div class="container mt-3 overflow-hidden">
      <div class="row gx-5 gy-3">
        <div class="col">
          <div class="bg-blue-black py-2 px-4">
            <div class="my-2 fw-bold">Recent Orders</div>
                <!-- Table -->
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Order Id</th>
        <th>Customer</th>
        <th>Order Date</th>
        <th>Shop</th>
        <th>Order Status</th>
        
      </tr>
      <tr v-for="(order, index) in orders" :key="order.id">
        <td>{{ index + 1 }}</td>
        <td>{{ order.order_ref }}</td>
        <td>{{ order.first_name + " " + order.last_name }}</td>
        <td>{{ (new Date(order.order_date)).toString().split(' ').slice(0,4).join(' ')  }}</td>
        <td>{{ order.shop_name }}</td>
        <td>{{ order.order_status }}</td>
      </tr>
    </table>
     <div v-if="!orders.length" class="text-center">No Resent Order</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PieChart from "../components/PieChart.vue";
import BarChart from "../components/BarChart.vue";
import apiClient from '../resources/baseUrl'
import {useStore} from 'vuex'
import {ref} from 'vue'
const orders =ref([])
const store= useStore();
 const  fetchOrders =async function() {
      try {
        store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/orders`);
        if (response.status === 200) {
          orders.value = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        store.commit("setIsLoading", false);
      }
    }
    fetchOrders()

</script>

<style scoped>
.bg-blue-black {
  background-color: #062539;
  border-radius: 1em;
}
.chart {
  height: 14em !important;
}
.pie-chart {
  width: 15em !important;
}
.icon {
  width: 3em;
  height: 3em;
  background-color: #82bc3e;
  border-radius: 50%;
}
.text-grey {
  color: #d3d3d3;
}
</style>
