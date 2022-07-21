<template>
  <div class="m-3">
    <h5>Employee</h5>
    <div>
      In the employee section, you will review and manage all solar product
      employees.
    </div>
    <button
     v-if="hasPermissionTo('add employee')"
      @click="showAddModal"
      class="btn ms-auto d-flex justify-self-end btn-bg-primary text-light"
    >
      Add New employee
    </button>
    <hr />
    <div class="d-flex p-2 justify-content-end selection-bar">
      <!-- <div class="position-relative w-50 me-2">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="searchEmployees"
          class="form-control rounded-pill pe-5"
          placeholder="Search by name"
          aria-label="Recipient's username"
          aria-describedby="basic-add"
        />
        <span
          @click="searchEmployees"
          role="button"
          class="position-absolute end-0 top-0 p-2 me-2"
          ><i class="fas fa-search"></i
        ></span>
      </div> -->

      <div>
        <button @click="downloadCSV()" class="btn border">Export</button>
      </div>
    </div>
    <!-- Table -->
    <table class="mt-2">
      <tr>
        <th>No</th>
        <th>Full name</th>
        <th>Phone number</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
        <th><span class="sr-only">Action</span></th>
      </tr>
      <tr v-for="(employee, index) in employees" :key="employee.id">
        <td>{{ pageNo * perPage - perPage + index + 1 }}</td>
        <td class="text-capitalize">
          {{ employee.first_name + " " + employee.last_name }}
        </td>
        <td>{{ employee.phone_numbers?.[0] }}</td>
        <td>
          <span>{{ employee.email }}</span>
        </td>
        <td>{{ employee.role?.name }}</td>
        <td>{{ employee.is_active === 1 ? "Active" : "Inactive" }}</td>
        <td>
          <!-- <span class="me-2" @click="showEditModal(employee)" role="button"
            ><i class="far fa-edit"></i
          ></span>
          <span  role="button"
            ><i class="fas fa-trash"></i
          ></span> -->
          <div class="dropdown">
            <a
              class="dropdown-toggl text-dark"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a
                 v-if="hasPermissionTo('edit employee')"
                  class="dropdown-item"
                  @click="showEditModal(employee)"
                  role="button"
                  >Edit</a
                >
              </li>
              <li>
                <a
                 v-if="hasPermissionTo('edit employee')"
                  class="dropdown-item"
                  @click="showChangeStatusModal(employee)"
                  role="button"
                  >Change Status</a
                >
              </li>
              <li>
                <a
                v-if="hasPermissionTo('edit employee')"
                  class="dropdown-item"
                  @click="showChangeRoleModal(employee)"
                  role="button"
                  >Change Role</a
                >
              </li>
              <li>
                <a
                 v-if="hasPermissionTo('delete employee')"
                  class="dropdown-item"
                  @click="showDeleteModal(employee)"
                  role="button"
                  >Delete</a
                >
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </table>
    <div v-if="!employees.length" class="mt-2 text-center">No record</div>

    <!-- pagination -->
    <!-- <div class="d-flex justify-content-end mt-2 mb-3 me-2">
      <div class="me-3">
        <select
          @change="handlePerPage()"
          v-model="perPage"
          class="form-select"
          aria-label="perPage"
        >
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <paginate
        :page-count="totalPage"
        :click-handler="fetchByPageNo"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'d-flex nav page-item'"
      >
      </paginate>
    </div> -->
  </div>

  <!-- add employees -->
  <base-modal
    :modalState="isAddModalVisible"
    title="Employee"
    @close="closeAddModal"
    btnLabel="Save"
    :isLoading="isLoading"
    @submit="addNewEmployee"
  >
    <form @submit.prevent>
      <div class="mb-1" :class="{ warining: v$.employee.first_name.$error }">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model.trim="employee.first_name"
          @blur="v$.employee.first_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.employee.first_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>
      <div class="mb-1" :class="{ warining: v$.employee.last_name.$error }">
        <label for="last_name" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          v-model.trim="employee.last_name"
          @blur="v$.employee.last_name.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.employee.last_name.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-1" :class="{ warining: v$.employee.phone_number.$error }">
        <label for="phone_number" class="form-label">Phone Number</label>
        <input
          type="text"
          class="form-control"
          id="phone_number"
          v-model.trim="employee.phone_number"
          @blur="v$.employee.phone_number.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.employee.phone_number.$errors"
          :key="index"
        >
          {{ error.$message + ", " }}</span
        >
      </div>

      <div class="mb-1" :class="{ warining: v$.employee.email.$error }">
        <label for="email" class="form-label">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model.trim="employee.email"
          @blur="v$.employee.email.$touch"
        />
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.employee.email.$errors"
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
    title="Delete employee"
    @close="closeDeleteModal"
    @submit="deleteEmployee"
  >
    <p>
      Do u want to delete? <br />
      <strong>{{
        employeeForDelete?.first_name + " " + employeeForDelete?.last_name
      }}</strong>
    </p>
  </base-modal>

  <!-- change status base modal -->
  <base-modal
    :modalState="isChangeStatusModalVisible"
    btnLabel="Change"
    :isLoading="isLoading"
    title="Change Status"
    @close="closeChangeStatusModal"
    @submit="changeStatus"
  >
    <div>
      <div>Choose employee status</div>
      <select
        id="changeStatus"
        v-model="employeeForChangeStatus.is_active"
        class="form-control"
      >
        <option :disabled="employeeForChangeStatus.is_active == 0" :value="0">
          Inactive
        </option>
        <option :value="1" :disabled="employeeForChangeStatus.is_active == 1">
          Active
        </option>
      </select>
    </div>
  </base-modal>

  <!-- change role base modal -->
  <base-modal
    :modalState="isChangeRoleModalVisible"
    btnLabel="Change"
    :isLoading="isLoading"
    title="Change Role"
    @close="closeChangeRoleModal"
    @submit="changeRole"
  >
    <div>
      <div>Choose employee role</div>
      <select
        id="changeStatus"
        v-model="employeeForChangeRole.roleId"
        class="form-control text-capitalize"
      >
        <option
          v-for="role in roles"
          :key="role.id"
          :value="role.id"
          class="text-capitalize"
        >
          {{ role.name }}
        </option>
      </select>
    </div>
  </base-modal>

  <!--  -->
  <the-alert
    :isVisible="isAlertVisible"
    :message="alertMessage"
    :isSucceed="isRequestSucceed"
  />
</template>

<script>
import apiClient from "../resources/baseUrl";
import useValidate from "@vuelidate/core";
// import Paginate from "vuejs-paginate-next";

import {
  required,
  helpers,
  email,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import exportFromJSON from "export-from-json";
export default {
  // components: {
  //   Paginate,
  // },
  data() {
    return {
      v$: useValidate(),
      isAddModalVisible: false,
      isDeleteModalVisible: false,

      employeeForDelete: {},
      searchQuery: "",
      isLoading: false,
      employees: [],
      employee: {
        first_name: "",
        last_name: "",
        phone_number: " ",
        email: "",
      },
      // alert
      isAlertVisible: false,
      alertMessage: "",
      isRequestSucceed: "",
      timeout: "",
      //
      // to use add modal as edit depend on the condition and #forUpdate to
      //chage the action which should be performed
      forUpdate: false,
      //paginate
      perPage: 10,
      pageNo: 1,
      totalPage: "",
      //
      isChangeStatusModalVisible: false,
      isChangeRoleModalVisible: false,
      employeeForChangeStatus: {},
      employeeForChangeRole: {},
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    hasPermissionTo(act) {
      let index = this.user?.role?.permissions.findIndex(
        (per) => per.name.toLowerCase() === act.toLowerCase()
      );
      if (!isNaN(index) && index !== -1) return true;
      return false;
    },
    downloadCSV() {
      const data = this.employees;
      const fileName = "employees";
      const exportType = exportFromJSON.types.csv;
      if (data) exportFromJSON({ data, fileName, exportType });
    },
    dismissAlert() {
      this.timeout = setTimeout(() => {
        this.isAlertVisible = false;
      }, 2000);
    },

    resetFieldEmpity() {
      this.employee = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
      };
    },
    showDeleteModal({ ...employee }) {
      this.employeeForDelete = employee;
      this.isDeleteModalVisible = true;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    showEditModal({ ...employee }) {
      this.forUpdate = true;
      this.employee = employee;
      this.employee.phone_number = employee.phone_numbers?.[0];
      this.isAddModalVisible = true;
    },
    showChangeStatusModal({ ...employee }) {
      this.employeeForChangeStatus = employee;
      this.isChangeStatusModalVisible = true;
    },
    showChangeRoleModal({ ...employee }) {
      this.employeeForChangeRole = employee;
      this.employeeForChangeRole.roleId = employee.role?.id;
      this.isChangeRoleModalVisible = true;
    },
    closeChangeRoleModal() {
      this.isChangeRoleModalVisible = false;
    },
    closeChangeStatusModal() {
      this.isChangeStatusModalVisible = false;
    },
    closeAddModal() {
      this.v$.$reset();
      this.resetFieldEmpity();
      this.isAddModalVisible = false;
    },
    showAddModal() {
      this.forUpdate = false;
      this.isAddModalVisible = true;
    },
    setAlertData(isRequestSucceed, message) {
      this.isAlertVisible = true;
      this.alertMessage = message;
      this.isRequestSucceed = isRequestSucceed;
    },
    async changeRole() {
      this.isLoading = true;
      try {
        const response = await apiClient.post(
          "/api/assign_role/" + this.employeeForChangeRole.id,
          { role_id: this.employeeForChangeRole.roleId }
        );
        if (response.status === 200) {
          let index = this.employees.findIndex(
            (employee) => employee.id === this.employeeForChangeRole.id
          );
          this.employees[index].role = {
            id: this.employeeForChangeRole.roleId,
            name: response.data,
          };
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to change user role";
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeChangeRoleModal();
      }
    },
    async changeStatus() {
      this.isLoading = true;
      try {
        const response = await apiClient.post(
          "/api/change_system_user_status/" + this.employeeForChangeStatus.id,
          { status: this.employeeForChangeStatus.is_active }
        );
        if (response.status === 200) {
          let index = this.employees.findIndex(
            (employee) => employee.id === this.employeeForChangeStatus.id
          );
          this.employees[index].is_active =
            this.employeeForChangeStatus.is_active;
          this.setAlertData(true, "User role is changed successully");
        } else throw "";
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to change user status";
        this.setAlertData(false, "Faild to change user role");
      } finally {
        this.isLoading = false;
        this.closeChangeStatusModal();
        this.dismissAlert();
      }
    },
    async getAllRoles() {
      try {
        this.$store.commit("setIsLoading", true);
        const res = await apiClient.get("api/roles");
        if (res.status === 200) {
          this.roles = res.data;
        }
      } catch (error) {
        //
      } finally {
        //
        this.$store.commit("setIsLoading", false);
      }
    },
    async updateEmployee() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.put(
            `/api/system_users/${this.employee.id}`,

            this.employee
          );
          if (response.status === 200) {
            const editedIndex = this.employees.findIndex((employee) => {
              return this.employee.id === employee.id;
            });
            this.employees[editedIndex] = { ...this.employee };
            this.employees[editedIndex].phone_numbers[0] =
              this.employee.phone_number;
            this.setAlertData(true, "employee updated successfully");
            ///
          } else throw "";
        } catch (e) {
          this.setAlertData(false, "Faild to update employee");
        } finally {
          this.isLoading = false;
          this.closeAddModal();
          this.dismissAlert();
          this.forUpdate = false;
        }
      }
    },

    async addNewEmployee() {
      if (this.forUpdate) {
        this.updateEmployee();
        return;
      }
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/system_user", {
            ...this.employee,
            phone_numbers: [this.employee.phone_number],
          });
          if (response.status === 201) {
            this.employees.push(response.data);
            this.setAlertData(true, "You have added employees successfully");
          } else throw "";
        } catch (e) {
          this.setAlertData(false, "Faild to add a new employee");
        } finally {
          this.isLoading = false;
          this.dismissAlert();
          this.closeAddModal();
        }
      }
    },
    async deleteEmployee() {
      this.isLoading = true;
      try {
        const response = await apiClient.delete(
          `/api/system_users/${this.employeeForDelete.id}`
        );
        if (response.status === 200) {
          const deletedIndex = this.employees.findIndex((employee) => {
            return employee.id === this.employeeForDelete.id;
          });
          this.employees.splice(deletedIndex, 1);
        }
      } catch (e) {
        this.isAlertVisible = true;
        this.alertMessage = "Faild to delete a employee";
        this.dismissAlert();
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
      }
    },
    async searchEmployees() {
      this.pageNo = 1;
      this.fetchEmployees();
    },
    async fetchEmployees() {
      try {
        this.$store.commit("setIsLoading", true);
        const response = await apiClient.get(
          `/api/system_users?search=${this.searchQuery}&&page=${this.pageNo}&&per_page=${this.perPage}`
        );
        if (response.status === 200) {
          this.employees = response.data.data;
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
    //paginations
    fetchByPageNo(no) {
      this.pageNo = no;
      this.fetchEmployees(this.filterString);
    },
    handlePerPage() {
      this.pageNo = 1;
      this.fetchEmployees(this.filterString);
    },
  },
  created() {
    this.fetchEmployees();
    this.getAllRoles();
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  validations() {
    return {
      employee: {
        first_name: {
          required: helpers.withMessage("First name is required", required),
        },
        last_name: {
          required: helpers.withMessage("Last name is required", required),
        },
        phone_number: {
          numeric,
          max: maxLength(10),
          required: helpers.withMessage("Phone number is required", required),
        },
        email: {
          email,
        },
      },
    };
  },
};
</script>
