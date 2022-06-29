<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="isAuthorizationPage">
          <li class="nav-item">
            <router-link v-on:click="logout" to="/login" class="nav-link active">logout</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link active">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import storageService from "@/services/storageService";
import store from "@/store";

export default {
  name: "NavBar2",
  data() {
    return {
      token: storageService.getToken(),
    }
  },
  methods: {
    async logout() {
      storageService.clearToken();
      await store.dispatch('setAuth',false);
    },
  },
  computed: {
    auth() {
      return store.state.authenticated;
    },
    isAuthorizationPage() {
      return (
          this.$route.path === "/" ||
          this.$route.name === "Home"
      );
    },
  }
}
</script>

<style scoped>

</style>
