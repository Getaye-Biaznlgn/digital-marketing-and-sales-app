<template>
  <div class="m-3 text-white">
    <div class="container overflow-hidden">
      <div class="row gx-5 gy-3">
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-3">
            <div class="py-2 icon text-center">
              <i class="fas fa-layer-group fs-5 mt-1"></i>
            </div>
            <div class="flex-fill py-2 ms-1">Total Product</div>
            <div class="text-center" style="color: #82bc3e">
              <span><i class="fa fa-chart-line"></i></span>
              <strong class="d-block">{{
                marketStatistics.total_customer
              }}</strong>
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-2">
            <div class="py-2 icon text-center" style="backgroundcolor: #ff7e00">
              <i class="fa-solid fa-cart-shopping fs-5 mt-1 align-middle"></i>
            </div>
            <div class="flex-fill py-2 ms-1">Total Order</div>
            <div class="text-center" style="color: #ff7e00">
              <span><i class="fa fa-chart-line"></i></span>
              <strong class="d-block">{{
                marketStatistics.total_order
              }}</strong>
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div class="bg-blue-black d-flex py-4 px-2">
            <div class="py-2 icon text-center">
              <i class="fas fa-user-friends fs-5 align-middle"></i>
            </div>
            <div class="flex-fill py-2 ms-1">Total Customer</div>
            <div class="text-center" style="color: #82bc3e">
              <span class="d-block"><i class="fa fa-chart-line"></i></span>
              <strong class="d-block">{{
                marketStatistics.total_product
              }}</strong>
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
                <select
                  @change="fetchCustomerStatistics()"
                  v-model="selectedTimeForBar"
                  name="customeranalytics"
                  id="customerAn"
                  class="form-select align-items-start"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            <bar-chart
              :data="barGraphValues"
              :labels="barGraphLabels"
              class="chart"
            />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="bg-blue-black justify-content-center py-4 px-2">
            <div class="d-flex mb-2 mx-2 justify-content-between">
              <strong>Sold Product Report</strong>
              <div>
                <select
                  @change="fetchSoldProductStatistics()"
                  v-model="selectedTimeForPie"
                  name=""
                  id=""
                  class="form-select align-items-start"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            <pie-chart
              :data="pieChartVales"
              :labels="pieChartLables"
              class="chart mx-auto pie-chart"
            />
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
                <td class="text-capitalize">
                  {{ order.first_name + " " + order.last_name }}
                </td>
                <td>
                  {{
                    new Date(order.order_date)
                      .toString()
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")
                  }}
                </td>
                <td class="text-capitalize">{{ order.shop_name }}</td>
                <td class="text-capitalize">{{ order.order_status }}</td>
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
import apiClient from "../resources/baseUrl";
import { useStore } from "vuex";
import { ref } from "vue";
const orders = ref([]);
const store = useStore();
const selectedTimeForBar = ref("week");
const selectedTimeForPie = ref("week");
// for total_customer, total_order, total_product
const marketStatistics = ref({});
const barGraphValues = ref([]);
const barGraphLabels = ref([]);
const pieChartVales = ref([]);
const pieChartLables = ref([]);
const fetchOrders = async function () {
  try {
    store.commit("setIsLoading", true);
    const response = await apiClient.get(`/api/all_orders?per_page=5`);
    if (response.status === 200) {
      orders.value = response.data.data;
    }
  } catch (e) {
    //
  } finally {
    store.commit("setIsLoading", false);
  }
};
const fetchMarketStatistics = async function () {
  try {
    store.commit("setIsLoading", true);
    const response = await apiClient.get(`/api/dashboard`);
    if (response.status === 200) {
      marketStatistics.value = response.data;
    }
  } catch (e) {
    //
  } finally {
    store.commit("setIsLoading", false);
  }
};
const fetchCustomerStatistics = async function () {
  try {
    store.commit("setIsLoading", true);
    const response = await apiClient.get(
      `/api/dashboard_bargraph?time=${selectedTimeForBar.value}`
    );
    if (response.status === 200) {
      let graphLables = [];
      let graphValues = [];
      const responseData = response.data;
      for (const attr in responseData) {
        graphLables.push(attr);
        graphValues.push(responseData[attr]);
      }
      barGraphValues.value = graphValues;
      barGraphLabels.value = graphLables;
    }
  } catch (e) {
    //
  } finally {
    store.commit("setIsLoading", false);
  }
};
const fetchSoldProductStatistics = async function () {
  try {
    store.commit("setIsLoading", true);
    const response = await apiClient.get(
      `/api/dashboard_piechart?time=${selectedTimeForPie.value}`
    );
    if (response.status === 200) {
      let graphLables = [];
      let graphValues = [];
      const responseData = response.data;
      
      if(responseData?.top1){
       graphLables.push(responseData?.top1?.name);
       graphValues.push(responseData?.top1?.product_count);
      }
      if(responseData?.top2){
        graphLables.push(responseData?.top2?.name);
        graphValues.push(responseData?.top2?.product_count);
      }
      graphLables.push("Other");      
      
      graphValues.push(responseData?.top3?.other);
      pieChartVales.value = graphValues;
      pieChartLables.value = graphLables;
    }
  } catch (e) {
    //
  } finally {
    store.commit("setIsLoading", false);
  }
};
fetchOrders();
fetchMarketStatistics();
fetchCustomerStatistics();
fetchSoldProductStatistics();
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
