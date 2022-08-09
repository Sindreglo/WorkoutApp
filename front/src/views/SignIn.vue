<template>
  <div>
    <form @submit.prevent="signIn">
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field type="email" prepend-icon="mdi-account" label="Email" v-model="email"></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword =! showPassword"
                        label="Password" v-model="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" rounded type="submit">Login</v-btn>
          <v-btn color="transparent" elevation="0" v-on:click="signUp">Register new</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn width="100%" rounded color="primary" v-on:click="signInWithGoogle">
            Sign in with Google</v-btn>

          <v-btn
              color="#4284F3"
              dark
          >
            <v-icon
                right
                dark
            >
              mdi-google
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import {signIn, signInGoogle} from "@/plugins/firebase";
import router from "@/router";

export default {
  name: "SignIn",
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    async signIn() {
      await signIn(this.email, this.password);
    },
    signUp() {
      router.push("/signup");
    },
    signInWithGoogle() {
      signInGoogle();
    },
  }
}
</script>

<style scoped>

</style>
