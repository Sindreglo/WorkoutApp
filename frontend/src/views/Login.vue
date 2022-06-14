<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input v-model="data.email" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</template>

<script>
import apiService from "@/services/apiService";
import storageService from "@/services/storageService";

export default {
  name: "LoginPage",
  data() {
    return {
      data: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      await apiService.login(this.data.email, this.data.password)
          .then((response) => {
            storageService.setToken(response.data["access_token"]);
            storageService.setUser(this.username);
            console.log(response.data);
            console.log(storageService.getToken());
            this.$router.push("/");
          })
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10vh;
}
</style>
