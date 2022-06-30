<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import storageService from "@/services/storageService";

export default {
  name: "HomePage",
  data() {
    return {
      message: '',
    }
  },
  created() {
    if (storageService.getToken() === null) {
      this.$router.push("/login")
    }
    apiService.getHello().then((response) => {
      this.message = response.data;
    })
  }
}
</script>

<style scoped>

</style>
