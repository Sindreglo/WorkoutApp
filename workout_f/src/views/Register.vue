<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>

    <div class="form-floating">
      <input v-model="data.name" type="text" class="form-control" id="floatingName" placeholder="Name Example" required>
      <label for="floatingName">Name</label>
    </div>

    <div class="form-floating">
      <input v-model="data.email" type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" required>
      <label for="floatingEmail">Email address</label>
    </div>
    <div class="form-floating">
      <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      data: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    submit() {
      console.log("SUBMIT")
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10vh;
}
</style>
