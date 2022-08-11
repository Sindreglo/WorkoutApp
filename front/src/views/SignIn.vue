<template>
  <v-container>
    <h2 class="text-center">Welcome to
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Work</span>
        <span>Out</span>
      </v-toolbar-title></h2>
    <div class="mr-5 mb-5" id="firebaseui-auth-container"></div>
    <h2 class="text-center">About</h2>
    <p class="text-center">
      Track the best sets of your favorite exercises
      <br>
      and see your progress over time.
    </p>
    <v-card
        class="mx-auto mt-9"
        max-width="600"
        elevation="0">
      <v-carousel
          cycle
          height="350"
          hide-delimiter-background
          show-arrows-on-hover
      >
        <v-carousel-item
            reverse-transition="fade-transition"
            transition="fade-transition"
        >
          <v-img
          src='@/assets/graph.png'
          ></v-img>
        </v-carousel-item>
        <v-carousel-item
            reverse-transition="fade-transition"
            transition="fade-transition"
        >
          <v-img
              src='@/assets/exercises.png'
          ></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>
</template>

<script>
import {db, firebaseApp} from "@/plugins/firebase";
import firebase from 'firebase/compat/app';
import router from "@/router";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import storageService from "@/services/storageService";

export default {
  name: "SignIn",
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          db.collection('users').doc(firebaseApp.auth().currentUser.uid).set({
            email: authResult.user.email,
            displayName: authResult.user.displayName,
          }).then(() => {
            storageService.setToken(authResult.user.uid);
            router.push({name: 'dashboard', params: {login: 'loggingIn'}});
          })

          return false;
        }
      }

    }

    ui.start('#firebaseui-auth-container', uiConfig);
  },
}
</script>

<style scoped>

</style>
