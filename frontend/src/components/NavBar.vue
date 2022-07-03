<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-bind:class=" { 'navbarOpen': show }">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" @click.stop="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" v-bind:class="{ 'show': show }">
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
  </nav>
</template>

<script>
import storageService from "@/services/storageService";
import store from "@/store";

export default {
  name: "NavBar",
  data() {
    return {
      show: false,
      token: storageService.getToken(),
    }
  },
  methods: {
    toggleNavbar() {
      this.show = !this.show
    },
    async logout() {
      storageService.clearToken();
      await store.dispatch('setAuth',false);
    },
  },
  computed: {
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
