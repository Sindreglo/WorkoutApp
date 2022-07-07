<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <h1>{{ email}}</h1>

    <v-container fluid class="my-5">
      <v-btn v-on:click="newWorkout">Add Workout</v-btn>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Exercise
          </th>
          <th class="text-left">
            Reps
          </th>
          <th class="text-left">
            Weight
          </th>
          <th class="text-left">
            Date
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-on:click="test(item)"
            v-for="(item, index) in workouts"
            :key="index"
        >
          <td>{{ item.Exercise }}</td>
          <td>{{ item.Reps }}</td>
          <td>{{ item.Weight }}</td>
          <td>{{ item.Date }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import {getUser, getWorkouts} from "@/plugins/firebase";
import router from "@/router";

export default {
  name: "DashBoard",
  data() {
    return {
      email: '',
      workouts: null
    }
  },
  methods: {
    newWorkout() {
      router.push("/newworkout");
    },
    test(item) {
      console.log(item)
    }
  },
  async created() {
    this.email = getUser();
    this.workouts = await getWorkouts()
  }

}
</script>

<style scoped>

</style>
