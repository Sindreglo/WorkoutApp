<template>
  <div id="app">
    <NavBar2/>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar2 from "@/components/Nav2";
export default {
  components: {NavBar2}
}
</script>

<style>

#app {
  text-align: center;
  align-items: center;
  padding-bottom: 40px;
  background-color: #e2e0e0;
  min-height: 100vh;
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
