<template>
  <div>
    <form @submit.prevent="signIn">
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Add Workout</v-card-title>
        <v-card-text>
          <v-combobox
              :items="exercises"
              v-model="selectedExercise"
              label="Exercise"
              outlined
          ></v-combobox>
          <v-text-field
              label="Weight"
              v-model="weight"
              type="number"
              placeholder="Enter weight"
              outlined
          ></v-text-field>
          <v-text-field
              label="Repetitions"
              type="number"
              v-model="reps"
              placeholder="Enter repetitions"
              outlined
          ></v-text-field>
          <v-row justify="center">
            <v-date-picker v-model="picker"></v-date-picker>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" v-on:click="addNew">Add</v-btn>
          <v-btn color="error" type="submit">Dismiss</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { newWorkout, getExercises } from "@/plugins/firebase";

export default {
  name: "newWorkout",
  data() {
    return {
      selectedExercise: null,
      weight: null,
      reps: null,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      exercises: ['Benchpress', 'Squats', 'Deadlift', 'Dips', 'Pullups'],
    }
  },
  methods: {
    async addNew() {
      await newWorkout(this.selectedExercise);
      await getExercises();
    }
  }
}
</script>

<style scoped>

</style>
