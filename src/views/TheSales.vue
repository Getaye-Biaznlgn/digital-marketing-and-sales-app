<template>
  <div class="m-3">
    <h5>Sales Detail</h5>
  <div>
    In the sales section, you will review and manage 
    all sales with theier details.
  </div>
<hr/>
    <div class="d-flex justify-content-between p-2 selection-bar">
      <div class="d-flex border rounded">
        <input
          type="text"
          class="form-control search-input"
          placeholder="Search"
          aria-label="search"
          aria-describedby="basic-addon2"
        />
        <span
          role="button"
          class="input-group-text search rounded-0"
          id="basic-addon2"
        >
          <i class="fas fa-search"></i>
        </span>
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
        <th>Customer</th>
        <th>Order Id</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Shop</th>
        <th>Payment method</th>
        <th>Sales status</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(sales, index) in saless"
        :key="sales.id">
        <td>{{index+1}}</td>
        <td>{{sales.first_name+' '+sales.last_name}}</td>
        <td>{{sales.email}}</td>
        <td>{{sales.phone_no}}</td>
        <td>{{sales.region}}</td>
        <td>{{sales.city}}</td>
        <td>
          <span class="me-2" @click="showEditModal(sales)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  @click="showDeleteModal(sales)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
</div>
</template>

<script>
export default {
  data(){
    return{
        sales:[]
    }
  }
}
</script>