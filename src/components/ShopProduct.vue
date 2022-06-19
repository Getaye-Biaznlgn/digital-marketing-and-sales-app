<template>
<!-- Table -->
      <table class="mt-2">
        <tr>
          <th>No</th>
          <th>Model</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Status</th>
          <th><span class="sr-only">Action</span></th>
        </tr>
        <tr
          v-for="(product, index) in shopProducts"
          :key="product.id"
          class="text-capitalize">
          <td>{{ index + 1 }}</td>
          <td style="white-space: nowrap;">{{ product.model }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.qty }}</td>
          <td>{{ product.qty > 0 ? "Instock" : "OutStock" }}</td>
          <td class="d-flex">
            <span class="me-2" @click="showEditModal(product)" role="button"
              ><i class="far fa-edit"></i
            ></span>
            <!-- <span class="me-2" @click="showDeleteModal(product)" role="button"
              ><i class="fas fa-trash"></i
            ></span> -->
          </td>
        </tr>
      </table>
</template>

<script>
export default {
  props:{
    shopProducts:{
      required:true,
    }
  },
  
}
</script>

<style>

</style>