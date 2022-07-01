<template>
  <div class="m-3">
    <h5>Sales Detail</h5>
  <div>
    In the sales section, you will review and manage 
    all sales with theier details.
  </div>
<hr/>
    <div class="d-flex  p-2 selection-bar justify-content-end">
      <!-- <div class="position-relative w-50 me-2">
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
      </div> -->

      <div>
        <!-- <div class="pe-2">
          <select class="form-select" aria-label="selectFilte">
            <option value=" ">Sort</option>
            <option>Sort</option>
          </select>
        </div> -->
        <div>
          <button @click="downloadCSV()" class="btn border">Export</button>
        </div>
      </div>
    </div>
  <!-- Table -->
      <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Customer</th>
        <th>Order Id</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Shop</th>
        <th>Payment method</th>
        <th>Sales status</th>
        <!-- <th><span class="sr-only">Action</span></th> -->
      </tr>
      <tr v-for="(sale, index) in sales"
        :key="sale.id">
        <td>{{index+1}}</td>
        <td>{{sale.first_name+' '+sale.last_name}}</td>
        <td>{{sale.order_ref}}</td>
        <td>
           {{
            new Date(sale.order_date)
              .toString()
              .split(" ")
              .slice(0, 4)
              .join(" ")
          }}
        </td>
        <td>{{sale.total_price}}</td>
        <td>{{sale.shop_name}}</td>
        <td>{{sale.payment_type}}</td>
        <td>{{sale.order_status}}</td>
        <!-- <td>
          <span class="me-2" @click="showEditModal(sale)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  @click="showDeleteModal(sale)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td> -->
      </tr>
    </table>
    <div v-if="!sales.length" class="text-center">No record</div>
</div>
 <!-- pagination -->
  <div class="d-flex justify-content-end mb-3 me-2">
    <div class="me-3">
      <select
        @change="fetchSales"
        v-model="perPage"
        class="form-select"
        aria-label="perPage"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
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
</template>

<script>
import apiClient from '../resources/baseUrl'
import Paginate from "vuejs-paginate-next";
import exportFromJSON from "export-from-json";

export default {
  components:{
     Paginate
  },
  data(){
    return{
        sales:[],
        //pagination
        perPage:10,
        pageNo:1,
        totalPage:0
    }
  },
  methods:{
    downloadCSV(){
        const data = this.sales;
      const fileName = "sales";
      const exportType = exportFromJSON.types.csv;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
      async fetchSales() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/sales?page=${this.pageNo}&&per_page=${this.perPage}`
        );
        if (response.status === 200) {
          this.sales = response.data.data;
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
  },
  created(){
    this.fetchSales()
  }
}
</script>