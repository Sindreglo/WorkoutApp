<template>
  <div>
    <p v-for="(exercise,index) in exercises" :key="index"> {{ exercise.name }} </p>
    <div id="table">
      <b-table striped hover :items="workouts">
      </b-table>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";
import storageService from "@/services/storageService";
export default {
  name: "HomePage",
  data() {
    return {
      exercises: {},
      workouts: {}
    }
  },
  created() {
    if (storageService.getToken() === null) {
      this.$router.push("/login")
    }
    apiService.getExercises().then((response) => {
      console.log(response);
      this.exercises = response.data;
    })
    apiService.getWorkouts().then((response) => {
      console.log(response.data);
      this.workouts = response.data;
    })
  }
}
</script>

<style scoped>
</style>
