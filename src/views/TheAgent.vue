<template>
  <div class="m-3">
    <h5>Agent</h5>
    <div>
      In the agent section, you will review and manage all agents information.
    </div>

    <hr />
    <div class="d-flex p-2 selection-bar justify-content-between">
     <div class="position-relative w-50 me-2">
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
        <th>Name</th>
        <th>Email</th>
        <th>Phone no</th>
        <th>Region</th>
        <th>City</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(agent, index) in agents" :key="agent.id">
        <td>{{ index + 1 }}</td>
        <td class="text-capitalize">
          {{ agent.first_name + " " + agent.last_name }}
        </td>
        <td>{{ agent.email }}</td>
        <td>
          <span v-if="agent.phone_numbers[0]">{{ agent.phone_numbers[0] }}</span>
          <span v-if="agent.phone_numbers[1]">{{'/'+ agent.phone_numbers[1] }}</span>
          
        </td>
        <td class="text-capitalize">{{ agent.manager_region }}</td>
        <td class="text-capitalize">{{ agent.manager_city }}</td>
        <td class="d-flex">
          <span class="me-2" @click="showEditModal(agent)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span @click="showDetailModal(agent)" role="button"
            ><i class="fas fa-eye"></i
          ></span>
        </td>
      </tr>
    </table>
  </div>
  <!-- edit agents -->
  <base-modal
    :modalState="isEditModalVisible"
    title="Agent"
    @close="closeAddModal"
    btnLabel="Save"
    :isLoading="isLoading"
    @submit="updateAgent"
  >
    <form @submit.prevent>
      <div class="mb-3" :class="{ warining: v$.agent.first_name.$error }">
        <label for="first_name" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          v-model.trim="agent.first_name"
          @blur="v$.agent.first_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.agent.first_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.agent.last_name.$error }">
        <label for="last_name" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          v-model.trim="agent.last_name"
          @blur="v$.agent.last_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.agent.last_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-3" :class="{ warining: v$.agent.email.$error }">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model.trim="agent.email"
          @blur="v$.agent.email.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.agent.email.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-3" :class="{ warining: v$.agent.phone_number1.$error }">
        <label for="phone_number1" class="form-label">Phone No 1</label>
        <input
          type="phone_number1"
          class="form-control"
          id="phone_number1"
          v-model.trim="agent.phone_number1"
          @blur="v$.agent.phone_number1.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.agent.phone_number1.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
       <div class="mb-3">
        <label for="zone" class="form-label">Phone no 2</label>
        <input
          type="text"
          class="form-control"
          id="zone"
          v-model="agent.phone_number2"
        />
      </div>
      <div class="mb-3">
        <label for="region" class="form-label">Region</label>
        <input
          type="text"
          class="form-control"
          id="region"
          v-model="agent.manager_region"
        />
      </div>
      <div class="mb-3">
        <label for="zone" class="form-label">Zone</label>
        <input
          type="text"
          class="form-control"
          id="zone"
          v-model="agent.manager_zone"
        />
      </div>

      <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <input
          type="text"
          class="form-control"
          id="city"
          v-model="agent.manager_city"
        />
      </div>

      <div class="mb-3">
        <label for="woreda" class="form-label">Woreda</label>
        <input
          type="text"
          class="form-control"
          id="woreda"
          v-model="agent.manager_woreda"
        />
      </div>

      <div class="mb-3">
        <label for="kebele" class="form-label">Kebele</label>
        <input
          type="text"
          class="form-control"
          id="kebele"
          v-model="agent.manager_kebele"
        />
      </div>

      <div class="mb-3">
        <label for="house_no" class="form-label">House no</label>
        <input
          type="text"
          class="form-control"
          id="house_no"
          v-model="agent.house_no"
        />
      </div>
    </form>
  </base-modal>

  <!-- delete base modal -->
  <base-modal :modalState="isDetailModalVisible" btnLabel="OK" :isLoading="isLoading"
   title="Agent" @close="closeDeleteModal" @submit="closeDeleteModal">
    <p>Agent detail goes here <br>
     {{agentForDetail?.first_name}}
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
import { required, helpers, email, maxLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      isEditModalVisible: false,
      isDetailModalVisible: false,
      agentForDetail: {},
      alertMessage: "",

      isLoading: false,
      agents: [],
      agent: {},
      // alert
      isAlertVisible: false,
      timeout: "",
      // to use add modal as edit depend on the condition and # to
      //chage the action which should be performed
    };
  },
  methods: {
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },
    resetFieldEmpity() {
      (this.agent.title = ""), (this.agent.description = "");
    },
    showDetailModal({ ...agent }) {
      this.agentForDetail = agent;
      this.isDetailModalVisible = true;
    },
    closeDeleteModal() {
      this.isDetailModalVisible = false;
    },
    showEditModal({ ...agent }) {
      this.agent = agent;
      this.agent.phone_number1= agent.phone_numbers[0]
      this.agent.phone_number2= agent.phone_numbers[1]
      this.isEditModalVisible = true;
    },
    closeAddModal() {
      this.v$.$reset();
      this.resetFieldEmpity();
      this.isEditModalVisible = false;
    },
    showAddModal() {
      this.isEditModalVisible = true;
    },
    async updateAgent() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        this.agent.phone_numbers[0]=this.agent.phone_number1
        this.agent.phone_numbers[1]=this.agent.phone_number2
        delete this.agent.phone_number1
        delete this.agent.phone_number2
        try {
          const response = await apiClient.put(
            `/api/managers/${this.agent.id}`,
            this.agent
          );
          if (response.status === 200) {
            const editedIndex = this.agents.findIndex((agent) => {
              return this.agent.id === agent.id;
            });
            this.agents[editedIndex] = response.data;
            ///
          } else throw "";
        } catch (e) {
          this.alertMessage = "Faild to update agent";
          this.isAlertVisible = true;
          this.dismissAlert();
        } finally {
          this.isLoading = false;
          this.closeAddModal();
        }
      }
    },
    //    async updateAgent(){
    //     this.v$.$validate();
    //     if (!this.v$.$error) {
    //       this.isLoading = true;
    //       try {
    //         const response = await apiClient.post("/api/agents", this.agent);
    //         if (response.status === 201) {
    //           this.agents.push(response.data);
    //         } else throw "";
    //       } catch (e) {
    //            this.isAlertVisible=true
    //            this.alertMessage="Faild to add a new agent"
    //            this.dismissAlert();
    //       } finally {
    //         this.isLoading = false;
    //         this.closeAddModal();
    //       }
    //     }
    //  },

    
    // async deleteAgent() {
    //   this.isLoading = true;
    //   try {
    //     const response = await apiClient.delete(
    //       `/api/agents/${this.agentForDetail.id}`
    //     );
    //     if (response.status === 200) {
    //       const deletedIndex = this.agents.findIndex((agent) => {
    //         return agent.id === this.agentForDetail.id;
    //       });
    //       this.agents.splice(deletedIndex, 1);
    //     }
    //   } catch (e) {
    //     this.isAlertVisible = true;
    //     this.alertMessage = "Faild to delete a new agent";
    //     this.dismissAlert();
    //   } finally {
    //     this.isLoading = false;
    //     this.closeDeleteModal();
    //   }
    // },
    async fetchAgents() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(`/api/managers`);
        if (response.status === 200) {
          this.agents = response.data.data;
         
        }
      } catch (e) {
        //
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  created() {
    this.fetchAgents();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      agent: {
        first_name: {
          required: helpers.withMessage("First name is required", required),
        },
        last_name: {
          required: helpers.withMessage("Last name is required", required),
        },
        email: {
          email,
          required: helpers.withMessage("Email is required", required),
        },
        phone_number1: {
          max: helpers.withMessage("Phone number is too long", maxLength),
          required: helpers.withMessage("Phone numbers is required", required),
        },
        phone_number2: {
          max: helpers.withMessage("Phone number is too long", maxLength),
        },
      },
    };
  },
};
</script>
