<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <v-main class="background">
      <router-view class="mx-0 mbr-4"/>
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
