<template>
  <div class="m-3">
    <h5>Supported Languages</h5>
    <div>
      In the language section, you will review and manage all Languages
      supported in the system.
    </div>
    <button
     v-if="hasPermissionTo('add language')"
      @click="showAddModal"
      class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
    >
      Add New Languages
    </button>
    <hr />
    <!-- Table -->
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>ISO 639-2 Code</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(lang, index) in languages" :key="lang.id">
        <td>{{ index + 1 }}</td>
        <td>{{ lang.name }}</td>
        <td>{{ lang.code }}</td>
        <td>
          <span
           v-if="hasPermissionTo('edit language')"
           class="me-2" @click="showEditModal(lang)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span 
           v-if="hasPermissionTo('delete language')"
          @click="showDeleteModal(lang)" role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
  </div>
  <!-- add languages -->
  <base-modal
    :modalState="isAddModalVisible"
    title="Language"
    @close="closeAddModal"
    btnLabel="Save"
    :isLoading="isLoading"
    @submit="addNewLanguage"
  >
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.language.name.$error }">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model.trim="language.name"
          @blur="v$.language.name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.language.name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.language.code.$error }">
        <label for="code" class="form-label">ISO 639-2 Code</label>
        <input
          type="text"
          class="form-control"
          id="code"
          v-model.trim="language.code"
          @blur="v$.language.code.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.language.code.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
    </form>
  </base-modal>

  <!-- delete base modal -->
  <base-modal
    :modalState="isDeleteModalVisible"
    btnLabel="Delete"
    :isLoading="isLoading"
    title="Delete Image"
    @close="closeDeleteModal"
    @submit="deleteLanguage"
  >
    <p>
      Do u want to delete? <br />
      {{ languageForDelete?.name }}
    </p>
  </base-modal>

  <!--to show delete image is failed  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="false"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      isAddModalVisible: false,
      isDeleteModalVisible: false,
      languageForDelete: {},
      alertMessage: "",

      isLoading: false,
      languages: [],
      language: {
        name: "",
        code: "",
      },
      // alert
      isAlertVisible: false,
      timeout: "",
      // to use add modal as edit depend on the condition and #forUpdate to
      //chage the action which should be performed
      forUpdate: false,
    };
  },
  computed:{
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    hasPermissionTo(act) {
      let index = this.user?.role?.permissions.findIndex(
        (per) => per.name.toLowerCase() === act.toLowerCase()
      );
      if (!isNaN(index) && index !== -1) return true;
      return false;
    },
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
    resetFieldEmpity() {
      (this.language.name = ""), (this.language.code = "");
    },
    showDeleteModal({ ...lang }) {
      this.languageForDelete = lang;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    showEditModal({ ...lang }) {
      this.forUpdate = true;
      this.language = lang;
      this.isAddModalVisible = true;
    },
    closeAddModal() {
      this.v$.$reset();
      this.resetFieldEmpity();
      this.isAddModalVisible = false;
    },
    showAddModal() {
      this.isAddModalVisible = true;
    },
    async updateLanguage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.put(
            `/api/languages/${this.language.id}`,
            this.language
          );
          if (response.status === 200) {
            const editedIndex = this.languages.findIndex((language) => {
              return this.language.id === language.id;
            });
            this.languages[editedIndex] = response.data;
            ///
          } else throw "";
        } catch (e) {
          this.alertMessage = "Faild to update language";
          this.isAlertVisible = true;
          this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
          this.forUpdate = false;
        }
      }
    },
    async addNewLanguage() {
      if (this.forUpdate) {
        this.updateLanguage();
        return;
      }

      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post(
            "/api/languages",
            this.language
          );
          if (response.status === 201) {
            this.languages.push(response.data);
          } else throw "";
        } catch (e) {
          this.isAlertVisible = true;
          this.alertMessage = "Faild to add a new language";
          this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
        }
      }
    },
    async deleteLanguage() {
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/languages/${this.languageForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.languages.findIndex((language) => {
            return language.id === this.languageForDelete.id;
          });
          this.languages.splice(deletedIndex, 1);
        }
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to delete a new language";
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
      }
    },
    async fetchLanguages() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/languages`);
        if (response.status === 200) {
          this.languages = response.data;
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchLanguages();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      language: {
        name: {
          required: helpers.withMessage("Language name is required", required),
          max: helpers.withMessage(
            "Name should not be greater than 50 characters",
            maxLength(50)
          ),
        },
        code: {
          required: helpers.withMessage("Language code is required", required),
          max: helpers.withMessage(
            "Code should not be greater than 5",
            maxLength(5)
          ),
        },
      },
    };
  },
};
</script>
