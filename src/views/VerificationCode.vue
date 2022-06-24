    <template>
 <div class="col-md-3 mx-auto border rounded-1 px-3 pt-3 mt-5">
    <h4 class="mt-2 text-center">Enter security code</h4>

 <!-- forgot password form -->
    <form  class="pt-1" @submit.prevent="verifyEmail">
      <div class="mb-2" :class="{ warining: v$.token.$error }">
        <label for="#name" class="form-label">Please check your email for a message with your code.
             Your code is 6 numbers long.</label>
        <input
          class="form-control"
          v-model="token"
          id="name"
          type="text"
          aria-label=".form-control-lg"
          @blur="v$.token.$touch"
        />
       
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.token.$errors"
          :key="index"
          >{{ error.$message + ", " }}
        </span>
      </div>
                    <span>We sent your code to:
                      alemteb1010@gmail.com
                   </span>
      <div class="d-grid gap-2">
        <button class="btn btn-bg-primary text-white" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Submit Code</span>
          </span>
           <span v-else>Submit Code</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
        <p class="text-center">{{ forgotSuccessMessage }}</p>
      </div>
    </form>

    <div class="mb-2 d-flex justify-content-end">
      <a
        role="button"
        @click="toggleFormType"
        class="nav-link d-inline"
        >Didn't get a code?</a>
        
    </div>
 </div>
 
</template>
<script>
 import { required ,helpers } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import apiClient from "../resources/baseUrl";
export default {
  data() {
    return {
      v$: useValidate(),
      token: "",
      forgotSuccessMessage: "",
      isPasswordVisible: false,
      isLoading: false,
      notify: "",
    };
  },

  validations() {
    return {
      token: {
          required: helpers.withMessage("Email can't be empty", required),
      },
    };
  },

  methods:{
   async verifyEmail() {
       this.notify = "";
      this.forgotSuccessMessage = "";
      this.v$.token.$validate();
      if (!this.v$.token.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post("/api/verify/"+this.token, {
            email: this.token,
          });
          if (response.status == 200) {
            this.$router.push({name:'NewPassword'})
            this.forgotSuccessMessage =
              "We have sent verfication link. Check your inbox please!";
          }
        } catch (e) {
          this.notify = "Failed";
        } finally {
          this.isLoading = false;
        }
      }
    },

  },
  }
</script>

