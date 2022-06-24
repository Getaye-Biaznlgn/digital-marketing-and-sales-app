<template>
<DetailPage title="Product Detail">
  
  <ProductUpdateForm  :productInfo="{...product}"/>
<ProductImagePreview :productInfo="{...product}"/>
  <!-- add new Image -->
  <base-card>
    <div class="fs-5 mb-2 fw-bold">Add More Images</div>
<multiple-image-upload @saveImage="setNewImages" />
<transition>
    <div v-if="newImages.length" class="progress mt-3">
      <div
        class="progress-bar btn-add"
        role="progressbar"
        :style="{ width: uploadPercentage + '%' }"
        id="progress"
        :aria-valuenow="p"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
</transition>   
  <base-button
      class="mt-3"
      title="Upload images"
      :isLoading="isImageUploading"
      @submit="uploadNewImages"
    />
  </base-card>  
  <!-- </div> -->
</DetailPage>
<div class="bg-light-grey p-2"/>
 <!-- <span
       @click="$router.back()"
       role="button"
       class="text-dark-blue pe-2 fw-bold fs-5"
       ><i class="fas fa-arrow-left"></i>Back</span
     > -->

 <!-- alert  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import ProductUpdateForm from "../components/ProductUpdateForm.vue"
import ProductImagePreview from '../components/ProductImagePreview.vue'
import MultipleImageUpload from '../components/MultipleImageUpload.vue'
export default{
    components:{
        ProductUpdateForm,
        ProductImagePreview,
        MultipleImageUpload
    },
   data(){
    return{
       product:'',
       newImages:[],
       uploadPercentage:'',
       isImageUploading:false,
       timeout:'',
      // alert
      isAlertVisible:false,
      alertMessage:'',
      isRequestSucceed:''
    }
   },
   methods:{
    setNewImages(img){
       this.newImages=img
    },
  
     dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);},

   async uploadNewImages(){
       this.isImageUploading = true;
      var fd = new FormData();
      this.newImages.forEach((image, i) => {
        fd.append(`images[${i}]`, image);
      });
      fd.append("product_id", this.product.id);
      try {
        const response = await apiClient.post("/api/images", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
           onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
        });
        if (response.status === 200) {
          this.product.images.push(...response.data);
          this.isAlertVisible = true;
          this.alertMessage = "Images has been uploaded successfully!";
          this.isRequestSucceed = true;
          this.newImages = [];
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Failed to upload images";
        this.isRequestSucceed = false;
      } finally {
        this.isImageUploading = false;
        this.dismissAlert();
      }
    },
// product_translations
    // async fetchProductBasedOnLanguage(){
    //    try {
    //     this.$store.commit("setIsLoading", true);
    //     const response = await apiClient.get(
    //       `/api/product_translations/${this.$route.params.id}?language=${this.selectedLanguage}`
    //     );
    //     if (response.status === 200) {
    //       this.product = response.data.data;
    //     }
    //   } catch (e) {
    //     //
    //   } finally {
    //     this.$store.commit("setIsLoading", false);
    //   }
    // },
    async fetchProduct () {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/products/${this.$route.params.id}`
        );
        if (response.status === 200) {
          this.product = response.data.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
   },
 
 },
   created(){
    this.fetchProduct()
   },
   beforeUnmount(){
    clearTimeout(this.timeout)
   }
}


</script>

<style>

.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 3s ease-in;
}
.v-leave-to {
  opacity: 0;
}

</style>