<template>
    <!-- image view components -->
  <base-card>
    <div class="row g-4 p-3">
      <div
        v-for="img in product.images"
        :key="img.id"
        class="col-lg-3 col-sm-6 position-relative img-content"
      >
        <img :src="img.path" alt="" width="200" height="200" class="rounded" />
        <div class="position-absolute img-overly start-0 top-0">
          <span
            role="button"
            @click="showDeleteModal(img)"
            class="position-absolute star cross ms-5"
            ><i class="fas fa-times fw-bold fs-5"></i
          ></span>
        </div>
      </div>
      <div v-if="!product.images?.length" class="mt-2 text-center">
        Images isn't uploaded yet!
      </div>
    </div>
  </base-card>

    <!-- delete base modal -->
  <base-modal :modalState="isDeleteModalVisible" @close="closeDeleteModal">
    <strong class="mt-0 fs-5">Delete</strong>
    <p>Do u want to delete?</p>
    <img
      :src="imageForDelete?.path"
      width="200"
      height="200"
      class="d-block mx-auto"
      alt="Selected image"
    />
    <base-button
      class="mt-3"
      title="Delete"
      :isLoading="isLoading"
      loadingTitle="Deleting"
      @submit="deleteImage"
    />
  </base-modal>
  <!--to show delete image is failed  -->
  <the-alert
    :isVisible="isAlertVisible"
    message="Faild to delete image"
    :isSucceed="false"
  />
</template>

<script>
import apiClient from '../resources/baseUrl'
export default {
  props:{
    productInfo:{
        required:true
    }
  },
  data(){
   return {
    product:{},
    imageForDelete:'',
    isDeleteModalVisible:false,
    isLoading:false,
    errorMessage:'',
    //alert
    isAlertVisible:false,
    timeout:''
   }
  },
  methods:{
     dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
    closeDeleteModal(){
      this.isDeleteModalVisible=false
    },
    showDeleteModal(img){
        this.imageForDelete=img
        this.isDeleteModalVisible=true
    },
     async deleteImage() {
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/images/${this.imageForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.product?.images?.findIndex((image) => {
            return image.id === this.imageForDelete.id;
          });
          this.product?.images?.splice(deletedIndex, 1);     
        }
      } catch (e) {
        this.isAlertVisible=true
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
        this.dismissAlert();
      }
    },
    
  },
  beforeUnmount(){
    clearTimeout(this.timeout)
  },
  created(){
    this.product = {...this.productInfo}
  },
  watch:{
    productInfo(){
      this.product ={...this.productInfo}
    }
    
  }
}
</script>

<style scoped>
.img-overly {
  display: none;
  height: 212px;
  width: 212px;
  background-color: rgba(255, 255, 255, 0.6);
}
.img-content:hover .img-overly {
  display: block;
}
.img-content{
  transition: all 1s linear;
}
.img-content:hover{
    transform: scale(1.1);
}
.img-content {
  z-index: 0;
}
.cross{
  position: absolute;
  top: 0;
  right: 0;
}
</style>