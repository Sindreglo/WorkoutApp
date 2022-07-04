<template>
  <div class="about">
    <form @submit.prevent="signUp">
      <input type="text" v-model="email">
      <input type="password" v-model="password">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { signUp} from "@/plugins/firebase";

export default {
  name: "SignUp",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signUp() {
      await signUp(this.email, this.password);
    }
  }
}
</script>

<style scoped>

</style>
