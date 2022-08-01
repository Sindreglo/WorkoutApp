<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Work</span>
        <span>Out</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu v-if="loggedIn === true" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="grey" v-on="on">
            <v-avatar size="30" color="accent">
              <v-icon class="white--text">mdi-account</v-icon>
            </v-avatar>
            <span class="ma-2">{{ profileName }}</span>
            <v-icon left>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in status" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="loggedIn === true">Sign Out</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="56" color="accent">
            <v-icon class="white--text">mdi-account</v-icon>
          </v-avatar>
          <p>{{ name }}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in status" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn === true" v-on:click="signOut">
          <v-list-item-action>
            <v-icon class="white--text">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">Sign Out</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import { signOut } from "@/plugins/firebase";
import storageService from "@/services/storageService";
export default {
  name: "NavBar",
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
        { icon: 'mdi-view-dashboard', text: 'Dashboard2', route: '/dashboard2'},
        { icon: 'mdi-folder', text: 'Exercises', route: '/exercises'},
        //{ icon: 'mdi-account', text: 'Profile', route: '/profile'},

      ],
      linksOffline: [
        { icon: 'mdi-login', text: 'Login', route: '/signin'}
      ],
      name: '',
    }
  },
  methods: {
    async signOut() {
      await signOut();
    },
    setName(name) {
      this.name = name
    },
  },
  computed: {
    status() {
      let linkStatus = this.linksOffline;
      if (storageService.getToken() !== null) {
        linkStatus = this.links;
      }
      return linkStatus;
    },
    loggedIn() {
      return storageService.getToken() !== null;
    },
    profileName() {
      return storageService.getUser();
    }
  }
}
</script>

<style scoped>

</style>
