<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <h1>{{ email}}</h1>

    <v-container fluid class="my-5">
      <v-btn v-on:click="newWorkout">Add Workout</v-btn>
    </v-container>
  </div>
</template>

<script>
import {getUser, getData} from "@/plugins/firebase";
import router from "@/router";

export default {
  name: "DashBoard",
  data() {
    return {
      email: '',
    }
  },
  methods: {
    newWorkout() {
      router.push("/newworkout");
    }
  },
  async created() {
    this.email = getUser();
    console.log(getData())
  }

}
</script>

<style scoped>

</style>
