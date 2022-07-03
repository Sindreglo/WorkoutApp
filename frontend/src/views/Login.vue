
<template>
  <div id="container">
    <b-form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="data.username"
            type="text"
            placeholder="Enter username"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="data.password"
            type="text"
            placeholder="Enter password"
            required
        ></b-form-input>
      </b-form-group>

      <button class="loginButton w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </b-form>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import storageService from "@/services/storageService";
import store from "@/store";
export default {
  name: "LoginPage",
  data() {
    return {
      data: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      await apiService.login(this.data.username, this.data.password)
          .then((response) => {
            console.log(response.data.access_token);
            if (response.data !== "Access denied, wrong credentials....") {
              storageService.setToken(response.data.access_token);
              storageService.setUser(this.username);
              store.dispatch('setAuth',true);
              this.$router.push("/");
            }
          })
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10vh;
  width: 330px;
  padding: 15px;
}
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loginButton {
  margin-top: 30px;
}
</style>
