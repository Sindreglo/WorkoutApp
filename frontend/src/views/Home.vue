<template>
  <h1>Hello {{ name }}</h1>
  <p v-for="(role, i) in roles" :key='i' >{{ role.name }}</p>
  <p v-for="(workout, i) in workouts" :key='i' > {{ workout.exercise }} - {{ workout.weight }} - {{ workout.reps }}</p>
  <div>
    <b-form-datepicker v-model="value" locale="en"></b-form-datepicker>
    <p>Value: '{{ value }}'</p>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  name: "HomePage",
  data() {
    return {
      name: '',
      roles: {},
      workouts: {},
      value: '',
    }
  },
  created() {
    apiService.getUser().then((response) => {
      this.name = response.data.name;
      this.roles = response.data.roles;
    });
    apiService.getWorkouts().then((response) => {
      this.workouts = response.data;
      console.log(this.workouts);
    })
  }
}
</script>

<style scoped>
b-form-datepicker {
  width: 200px;
  height: 200px;
}
</style>
