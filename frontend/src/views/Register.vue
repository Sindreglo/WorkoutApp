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
import {reactive} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "RegisterPage",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: '',
    });

    const router = useRouter();

    const submit = async () => {
      await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      await router.push("/login");
    }

    return {
      data,
      submit,
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10vh;
}
</style>
