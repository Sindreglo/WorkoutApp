<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Work</span>
        <span>Out</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="grey" v-on="on">
            <v-icon left>mdi-menu-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="56" color="accent">
            <span class="white--text text-h6">{{ loggedIn }}</span>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import { signOut } from "@/plugins/firebase";
export default {
  name: "NavBar",
  data() {
    return {
      loggedIn: false,
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
        { icon: 'mdi-folder', text: 'My Workouts', route: '/projects'},
        { icon: 'mdi-account', text: 'Profile', route: '/profile'},
      ]
    }
  },
  methods: {
    async signOut() {
      await signOut();
    }
  }
}
</script>

<style scoped>

</style>
