<template>
  <DetailPage title="Product Detail">
    <div class="container-fluid overflow-hidden mt-2">
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="bg-white p-3 rounded">
            <div><span class="fw-bold me-2">Name:</span>{{ product.name }}</div>
            <div>
              <span class="fw-bold me-2">Brand:</span>{{ product.brand }}
            </div>
            <div>
              <span class="fw-bold me-2">Price:</span
              >{{ "ETB " + product.price }}
            </div>
            <div><span class="fw-bold me-2">Qty:</span>{{ product.qty }}</div>
            <div>
              <span class="fw-bold me-2">Maximum Current Power:</span
              >{{ product.maximum_current_power }}
            </div>
            <div>
              <span class="fw-bold me-2">Maximum Supply Voltage:</span
              >{{ product.maximum_supply_voltage }}
            </div>
            <div>
              <div class="my-3">
                <img
                  :src="selectedImg"
                  v-if="selectedImg"
                  width="300"
                  height="300"
                  alt="img"
                  class="d-block mx-auto"
                />
                <div
                  v-else
                  style="width: 300px; height: 300px; background-color: #f1f1f1;"
                  class="d-block mx-auto"
                ></div>
              </div>

              <div class="">
                <img
                  class="mx-2"
                  role="button"
                  width="50"
                  @mouseenter="setPreview(img.path)"
                  height="50"
                  v-for="img in product.images"
                  :key="img.id"
                  :src="img.path"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-white p-3 rounded">
            <div><span class="fw-bold me-2">Description:</span>{{ product.description }}</div>
            <div class=" mt-2"><span class="fw-bold me-2">Product Detail:</span><span v-html="product.detail"></span></div>
          </div>
        </div>
      </div>
    </div>
  </DetailPage>
</template>

<script>
import apiClient from "../resources/baseUrl";

export default {
  data() {
    return {
      product: "",
      selectedImg: null,
    };
  },
  methods: {
    setPreview(img) {
      this.selectedImg = img;
    },
    async productDetail() {
      // alert(query)
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/products/${this.$route.params.id}`
        );
        if (response.status === 200) {
          this.product = response.data.data;
          this.selectedImg = this.product?.images?.[0]?.path;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.productDetail();
  },
};
</script>

<style></style>
