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
        </tr>
      </table>
      <!-- <div v-if="!shopProducts.length" class="text-center">No record</div> -->
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
