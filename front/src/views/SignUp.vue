<template>
  <div>
    <form @submit.prevent="signUp">
      <v-card width="500" class="mx-auto mt-9" color="component">
        <v-card-title>Register new user</v-card-title>
        <v-card-text>
          <v-text-field type="text" prepend-icon="mdi-account" label="Username" v-model="username"></v-text-field>
          <v-text-field type="email" prepend-icon="mdi-account" label="Email" v-model="email"></v-text-field>
          <v-text-field :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword =! showPassword"
                        label="Password" v-model="password"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" v-on:click="signUp">Register</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { signUp} from "@/plugins/firebase";

export default {
  name: "SignUp",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    async signUp() {
      await signUp(this.username, this.email, this.password);
    }
  }
}
</script>

<style scoped>

</style>
