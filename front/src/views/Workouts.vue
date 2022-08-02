<template>
  <div class="dashboard">
    <v-progress-linear
        v-if="loading"
        :active="loading"
        :indeterminate="loading"
        absolute
        color="primary"
    ></v-progress-linear>
    <div v-else>
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
                    @click="editThisWorkout"
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

      <v-container class="my-5">
        <v-container>
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

        <v-card tile class="pa-3" v-for="(workout,index) in workouts" :key="index">
          <v-row class="project" :style="getColor(workout.Exercise)" v-on:click="editDialog(workout)">
            <v-col cols="12" md="6">
              <div class="caption grey--text">Exercise</div>
              <div>{{ workout.Exercise }}</div>
            </v-col>
            <v-col xs="2">
              <div class="caption grey--text">Weight</div>
              <div>{{ workout.Weight }}</div>
            </v-col>
            <v-col xs="2">
              <div class="caption grey--text">Repetitions</div>
              <div>{{ workout.Reps }}</div>
            </v-col>
            <v-col xs="2">
              <div class="caption grey--text">Date</div>
              <div>{{ workout.Date }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  getAddExercise, getExercises,
  getWorkouts,
  getWorkoutsFromExercise
} from "@/plugins/firebase";

export default {
  name: "WorkoutsList",
  data() {
    return {
      loading: true,


      workouts: null,

      dialog: false,
      editDialig: false,

      exercises: [],
      exerciseList: [],
      selectedExercise: null,

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
    editDialog(item) {
      this.editWorkout.exercise = item.Exercise;
      this.editWorkout.reps = item.Reps;
      this.editWorkout.weight = item.Weight;
      this.editWorkout.date = item.Date;
      this.editWorkout.id = item.id;
      this.editDialig = true;
    },
    async addNew() {

      await addWorkout(this.newWorkout.exercise, this.newWorkout.reps, this.newWorkout.weight, this.newWorkout.date);
      await getAddExercise(this.newWorkout.exercise);


      if (!this.exercises.includes(this.newWorkout.exercise)) {
        this.exercises.push(this.newWorkout.exercise);
      }

      this.workouts = await getWorkouts();
      this.newWorkout.exercise = null;
      this.newWorkout.weight = null;
      this.newWorkout.reps = null;
      this.newWorkout.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.dialog = false;
    },
    async editThisWorkout() {
      await editWorkout(this.editWorkout);
      this.workouts = await getWorkouts();
      this.editWorkout = [];
      this.editDialig = false;
    },
    async deleteWorkout() {
      await deleteWorkout(this.editWorkout.id);
      this.workouts = await getWorkouts();
      this.editDialig = false;
    },
    async workoutGraph(exercise) {
      const chartWorkouts = await getWorkoutsFromExercise(exercise);

      this.chartOptions = {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      }

      this.series[0].data = [];
      this.chartOptions.xaxis.categories = [];

      for (let i = 0; i < chartWorkouts.length; i++) {
        this.series[0].data[i] = chartWorkouts[i].Weight;
        this.chartOptions.xaxis.categories[i] = chartWorkouts[i].Date;
      }
    },
    getColor(exercise) {
      let color = null;

      for (let i = 0; i < this.exerciseList.length; i++) {
        if (exercise === this.exerciseList[i].exercise) {
          color = this.exerciseList[i].color;
        }
      }
      return "border-left: 5px solid "+ color;
    }
  },
  async created() {
    this.workouts = await getWorkouts();
    this.exerciseList = await getExercises();
    if(this.exerciseList.length > 0) {
      for (let i = 0; i < this.exerciseList.length; i++) {
        this.exercises[i] = this.exerciseList[i].exercise;
      }

      this.selectedExercise = this.exercises[0];
    }


    this.loading = false;
  }
}
</script>

<style scoped>

</style>
