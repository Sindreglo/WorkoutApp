<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      // class="collapse navbar-collapse"
      <div id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link v-on:click="logout" v-if="token != null" to="/login" class="nav-link active">logout</router-link>
            <router-link v-else to="/login" class="nav-link active">login</router-link>
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

export default {
  name: "NavBar",
  data() {
    return {
      token: storageService.getToken(),
    }
  },
  methods: {
    logout() {
      storageService.clearToken();
      //this.$router.push({ path: "/" });
    },
  }
}
</script>

