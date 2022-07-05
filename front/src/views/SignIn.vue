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
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" v-on:click="signUp">Register</v-btn>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import {signIn} from "@/plugins/firebase";
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
    }
  }
}
</script>

<style scoped>

</style>
