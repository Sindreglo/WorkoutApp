<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <v-main class="grey lighten-4">
      <router-view class="mx-4 mb-4"/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: { NavBar },
};
</script>
