<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  name: "HomePage",
  data() {
    return {
      message: '',
    }
  },
  created() {
    apiService.getHello().then((response) => {
      this.message = response.data;
    })
  }
}
</script>

<style scoped>

</style>
