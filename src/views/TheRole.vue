<template>
  <div class="m-3">
    <div class="fs-5 fw-bold">Role</div>
    <p>
      In the role section, you will review and manage all roles with their
      permissions. You can view and edit role.
    </p>

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
              $router.push({ name: 'ThePermission', params: { id: role.id } , query:{role:role.name}})
            "
          >
            Permissions
          </button>
        </td>
        <td>
          <span role="button"
            ><i class="fas fa-trash"></i
          ></span>
        </td>
      </tr>
    </table>
  </div>
  
  <add-modal id="roleModal" />
</template>

<script>
import { Modal } from "bootstrap";
import AddModal from "../components/AddRole.vue";
import ApiClient from "../resources/baseUrl";
export default {
  components: {
    AddModal,
  },
  data() {
    return {
      roles: "",
    };
  },

  methods: {
    async getAllRoles() {
      try {
        this.$store.commit("setIsLoading", true);
        const res = await ApiClient.get("api/roles");

        if (res.status === 200) {
          this.roles = res.data;
          console.log("allroles==" + res.data);
        }
      } catch (error) {
        console.log("jj");
      } finally {
        console.log("jj");
        this.$store.commit("setIsLoading", false);
      }
    },

    async getRolePermissions() {
      try {
        const res = await ApiClient.get("api/roles/");

        if (res.status === 200) {
          this.roles = res.data;
        }
      } catch (error) {
        console.log("jj");
      } finally {
        console.log("jj");
      }
    },
    getModal() {
      this.roleModal.show();
    },
  },
  created() {
    this.getAllRoles();
  },
  mounted() {
    // this.getAllRoles();
    this.roleModal = new Modal(document.getElementById("roleModal"));
  },
};
</script>

<style></style>
