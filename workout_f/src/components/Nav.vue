<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      // class="collapse navbar-collapse"
      <div id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link active">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
          <li class="nav-item">
            <router-link v-on:click="logout" to="/login" class="nav-link active">logout</router-link>
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
  name: "NavBar",
  data() {
    return {
      token: storageService.getToken(),
    }
  },
  methods: {
    async logout() {
      storageService.clearToken();
      await store.dispatch('setAuth',false);
      //this.$router.push({ path: "/" });
    },
  },
  computed: {
    auth() {
      return store.state.authenticated;
    }
  }
}
</script>
