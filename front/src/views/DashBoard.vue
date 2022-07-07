<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <h1>{{ email}}</h1>

    <v-container fluid class="my-5">
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            Add Workout
          </v-btn>
        </template>

        <v-card>
          <v-toolbar
              dark
              color="primary"
          >
            <v-btn
                icon
                dark
                @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New Workout</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  dark
                  text
                  @click="addNew"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <v-combobox
                  :items="exercises"
                  v-model="newWorkout.exercise"
                  label="Exercise"
                  outlined
              ></v-combobox>
              <v-text-field
                  label="Weight"
                  v-model="newWorkout.weight"
                  type="number"
                  placeholder="Enter weight"
                  outlined
              ></v-text-field>
              <v-text-field
                  label="Repetitions"
                  type="number"
                  v-model="newWorkout.reps"
                  placeholder="Enter repetitions"
                  outlined
              ></v-text-field>
              <v-row justify="center">
                <v-date-picker v-model="newWorkout.date"></v-date-picker>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-dialog>
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
    <v-container fluid class="my-5">
      <v-dialog
          v-model="editDialig"
          width="500"
      >
        <v-card>
          <v-toolbar
              dark
              color="primary"
          >
            <v-btn
                icon
                dark
                @click="editDialig = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Workout</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  dark
                  text
                  @click="deleteWorkout"
              >
                Delete
              </v-btn>
              <v-btn
                  dark
                  text
                  @click="editW"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <v-combobox
                  :items="exercises"
                  v-model="editWorkout.exercise"
                  label="Exercise"
                  outlined
              ></v-combobox>
              <v-text-field
                  label="Weight"
                  v-model="editWorkout.weight"
                  type="number"
                  placeholder="Enter weight"
                  outlined
              ></v-text-field>
              <v-text-field
                  label="Repetitions"
                  type="number"
                  v-model="editWorkout.reps"
                  placeholder="Enter repetitions"
                  outlined
              ></v-text-field>
              <v-row justify="center">
                <v-date-picker v-model="editWorkout.date"></v-date-picker>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import {addWorkout, getUser, getWorkouts} from "@/plugins/firebase";
import {v4 as uuid4} from "uuid";

export default {
  name: "DashBoard",
  data() {
    return {
      email: '',
      workouts: null,

      dialog: false,
      editDialig: false,

      exercises: ['Benchpress', 'Squats', 'Deadlift', 'Dips', 'Pullups'],

      newWorkout: {
        exercise: null,
        weight: null,
        reps: null,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },

      editWorkout: {
        exercise: null,
        weight: null,
        reps: null,
        date: null,
        id: null,
      },
    }
  },
  methods: {
    test(item) {
      this.editWorkout.exercise = item.Exercise;
      this.editWorkout.reps = item.Reps;
      this.editWorkout.weight = item.Reps;
      this.editWorkout.date = item.Date;
      this.editWorkout.id = item.id;
      this.editDialig = true;
    },
    async addNew() {
      this.dialog = false;
      await addWorkout(uuid4(),this.newWorkout.exercise, this.newWorkout.reps, this.newWorkout.weight, this.newWorkout.date);
      this.workouts = await getWorkouts();
    },
    editW() {

    },
    deleteWorkout() {

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
