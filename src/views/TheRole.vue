<template>
  <div class="m-3">
    <div class="fs-5 fw-bold">Role</div>
    <p>
      In the role section, you will review and manage all roles with their
      permissions. You can view and edit role.
    </p>
    <div >
      <BaseButton v-if="hasPermissionTo('addRole')" @click="showModal" title="Add Role" />
    </div>

    <table>
      <tr>
        <th>No</th>
        <th>Role</th>
        <th>Permissions</th>
        <td></td>
      </tr>
      <tr v-for="(role, index) in roles" :key="role.id">
        <td>{{ index + 1 }}</td>
        <td class="text-capitalize">{{ role.name }}</td>
        <td>
          <button
            class="btn"
            @click="
              $router.push({
                name: 'ThePermission',
                params: { id: role.id },
                query: { role: role.name },
              })
            "
          >
            Permissions
          </button>
        </td>
        <td>
          <span
           v-if="hasPermissionTo('delete role')"
           @click="showDeleteModal(role)" role="button"><i class="fas fa-trash"></i></span>
        </td>
      </tr>
    </table>
  </div>
  <!-- delete base modal -->
  <base-modal
    :modalState="isAddModalVisible"
    btnLabel="Save"
    :isLoading="isLoading"
    title="Add Role"
    @close="closeAddModal"
    @submit="saveRole"
  >
    <div class="">
      <label for="roleName">Name</label>
      <input
        v-model="role.name"
        type="text"
        name=""
        id="roleName"
        class="form-control"
      />
    </div>
  </base-modal>
  <!-- delete base modal -->
  <base-modal
    :modalState="isDeleteModalVisible"
    btnLabel="Delete"
    :isLoading="isLoading"
    title="Delete"
    @close="closeDeleteModal"
    @submit="deleteRole"
  >
    <p>
      Do u want to delete? <br />
      {{ role?.name }}
    </p>
  </base-modal>
</template>

<script>
import apiClient from "../resources/baseUrl";
export default {
  data() {
    return {
      roles: [],
      role: { name: "" },
      isDeleteModalVisible: false,
      isAddModalVisible: false,
      isLoading: false,
      //
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
    showModal() {
      this.isAddModalVisible = true;
    },
    showDeleteModal(role) {
      this.isDeleteModalVisible = true;
      this.role= role;
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      this.role = {};
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.role={}
    },
   async deleteRole() {
       try {
        this.isLoading = true;
        const res = await apiClient.delete("api/roles/"+this.role.id);
        if (res.status === 200) {
            const deletedIndex = this.roles.findIndex((role) => {
            return role.id === this.role.id;
          });
          this.roles.splice(deletedIndex, 1);
        }
      } catch (error) {
        //
      } finally {
        this.isLoading = false;
        this.closeDeleteModal();
      }
    },
    async saveRole() {
      try {
        this.isLoading = true;
        const res = await apiClient.post("api/roles", this.role);
        if (res.status === 201) {
          this.roles.unshift(res.data);
        }
      } catch (error) {
        //
      } finally {
        this.isLoading = false;
        this.closeAddModal();
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

    // async getRolePermissions() {
    //   try {
    //     const res = await apiClient.get("api/roles/");

    //     if (res.status === 200) {
    //       this.roles = res.data;
    //     }
    //   } catch (error) {
    //     //
    //   } finally {
    //     //
    //   }
    // },
    
  },
  created() {
    this.getAllRoles();
  },
};
</script>

<style></style>
