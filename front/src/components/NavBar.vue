<template>
  <nav>

    <v-app-bar flat app class="background">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="toggle_dark_mode">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-menu v-if="loggedIn === true" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="grey" v-on="on">
            <v-avatar size="30" color="accent">
              <img v-if="profilePicture != null"
                  :src="profilePicture"
                  alt="John"
              >
              <v-icon v-else class="white--text">mdi-account</v-icon>
            </v-avatar>
            <span class="ma-2">{{ profileName }}</span>
            <v-icon left>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in status" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="loggedIn === true" v-on:click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-toolbar-title class="text-uppercase white--text">
            <span class="font-weight-light">Work</span>
            <span>Out</span>
          </v-toolbar-title>
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
import store from "@/store";
export default {
  name: "NavBar",
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
        { icon: 'mdi-folder', text: 'Exercises', route: '/exercises'},
        //{ icon: 'mdi-account', text: 'Profile', route: '/profile'},

      ],
      linksOffline: [
        { icon: 'mdi-login', text: 'Login', route: '/signin'}
      ],
      add: true,
    }
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem(
          "dark_theme",
          this.$vuetify.theme.dark.toString()
      );
    }
  },
  methods: {
    async signOut() {
      await signOut();
    },
    toggle_dark_mode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  computed: {
    status() {
      let linkStatus = this.linksOffline;
      if (this.loggedIn === true) {
        linkStatus = this.links;
      }
      return linkStatus;
    },
    loggedIn() {
      return store.state.loggedIn;
    },
    profileName() {
      return store.state.loggedInDisplayName;
    },
    profilePicture() {
      return store.state.loggedInImageURL;
    },
  }
}
</script>

<style scoped>

</style>
