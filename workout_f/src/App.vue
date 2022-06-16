<template>
  <div id="app">
    <NavBar />
    <main class="form-signin w-100 m-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/Nav";
export default {
  components: {NavBar}
}
</script>

<style>

#app {
  text-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100vh;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
