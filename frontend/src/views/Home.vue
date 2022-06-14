<template>
  <h1>Hello {{ name }}</h1>
  <p v-for="(role, i) in roles" :key='i' >{{ role.name }}</p>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  name: "HomePage",
  data() {
    return {
      name: '',
      roles: {}
    }
  },
  created() {
    apiService.test().then((response) => {
      this.name = response.data.name;
      this.roles = response.data.roles;
    })
  }
}
</script>

<style scoped>

</style>
