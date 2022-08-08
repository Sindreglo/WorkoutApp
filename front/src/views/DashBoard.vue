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
      <v-container>
        <v-card
            tile
            elevation="0"
            class="mb-5 rounded-lg"
        >

          <!-- Graph -->
          <v-container>
            <v-row align="center">
              <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                  color="primary"
              >
                <v-select
                    :items="exercises"
                    v-model="selectedExercise"
                    v-on:change="workoutGraph(selectedExercise)"
                    label="No exercises"
                    dense
                    solo
                ></v-select>
              </v-col>
            </v-row>
            <VueApexCharts type="area" height="350" :options="chartOptions" :series="series"></VueApexCharts>
          </v-container>
        </v-card>

        <!-- List -->
        <v-card
            tile
            elevation="0"
        >
          <v-card-title>
            <span class="text-h8">User Activity</span>
            <v-spacer></v-spacer>

            <v-btn
                class="mx-2"
                fab
                small
                dark
                color="primary"
                v-on:click="dialog=true"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>

          </v-card-title>

          <v-card-actions>
            <v-row>
              <v-col cols="8" md="3" xs="6">
                <v-select
                    :items="byExercise"
                    v-model="byExerciseSeleted"
                    label="Solo field"
                    @change="Workouts"
                    solo
                    dense
                ></v-select>
              </v-col>
              <v-col cols="4" md="3" xs="3">
                <v-select
                    :items="byOptions"
                    v-model="byOptionsSelected"
                    @change="Workouts"
                    label="Solo field"
                    solo
                    dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card elevation="0" tile class="pa-3" v-for="(workout,index) in workouts" :key="index">
            <v-row class="project" v-on:click="editDialog(workout)">
              <v-col cols="4" md="4" xs="4">
                <div class="caption grey--text">Exercise</div>
                <div>{{ workout.Exercise }}</div>
              </v-col>
              <v-col cols="4" md="4" xs="4">
                <div class="caption grey--text">Date</div>
                <div>{{ workout.Date }}</div>
              </v-col>
              <v-col cols="2" md="2" xs="2">
                <div class="caption grey--text">Weight</div>
                <div>{{ workout.Weight }}</div>
              </v-col>
              <v-col cols="2" md="2" xs="2">
                <div class="caption grey--text">Reps</div>
                <div>{{ workout.Reps }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
          </v-card>
        </v-card>

      </v-container>

      <!-- EditDialog -->
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

      <!-- NewDialog -->
      <v-container>
        <v-dialog
            v-model="dialog"
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
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  getAddExercise, getExercises,
  getWorkouts,
  getWorkoutsBy,
  getWorkoutsFromExercise
} from "@/plugins/firebase";
import store from "@/store";

export default {
  name: "DashBoard2",
  components: { VueApexCharts },
  props: ['login'],
  data() {
    return {
      loading: true,
      byExercise: ['All Exercises'],
      byExerciseSeleted: 'All Exercises',
      byOptions: ['Date', 'Weight', 'Reps'],
      byOptionsSelected: 'Date',

      email: '',
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

      series: [{
        name: 'Weight',
        data: []
      }, {
        name: 'Reps',
        data: []
      }],
      chartOptions: {
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
    async Workouts() {
      this.workouts = await getWorkoutsBy(this.byExerciseSeleted, this.byOptionsSelected);
    },
    editDialog(item) {
      this.editWorkout.exercise = item.Exercise;
      this.editWorkout.reps = item.Reps;
      this.editWorkout.weight = item.Weight;
      this.editWorkout.date = item.Date;
      this.editWorkout.id = item.id;
      this.editDialig = true;
    },
    async addNew() {
      if (this.newWorkout.reps === null) {
        this.newWorkout.reps = 0;
      }
      if (this.newWorkout.weight === null) {
        this.newWorkout.weight = 0;
      }

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
      if (this.editWorkout.reps === "") {
        this.editWorkout.reps = 0;
      }
      if (this.editWorkout.weight === "") {
        this.editWorkout.weight = 0;
      }
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
      this.series[1].data = [];
      this.chartOptions.xaxis.categories = [];

      for (let i = 0; i < chartWorkouts.length; i++) {
        this.series[0].data[i] = chartWorkouts[i].Weight;
        this.chartOptions.xaxis.categories[i] = chartWorkouts[i].Date;
      }
      for (let i = 0; i < chartWorkouts.length; i++) {
        this.series[1].data[i] = chartWorkouts[i].Reps;
        this.chartOptions.xaxis.categories[i] = chartWorkouts[i].Date;
      }
    },
  },
  async created() {
    this.exerciseList = await getExercises();
    await this.Workouts();
    console.log(this.workouts + "???");

    if(this.exerciseList.length > 0) {
      for (let i = 0; i < this.exerciseList.length; i++) {
        this.exercises[i] = this.exerciseList[i].exercise;
        this.byExercise.push(this.exerciseList[i].exercise);
      }

      this.selectedExercise = this.exercises[0];
      await this.workoutGraph(this.exercises[0]);
    }

    if (this.login === 'loggingIn') {
      this.$toast("Successfully logged in as " + store.state.loggedInDisplayName, {
        timeout: 2000,
      });
    }

    this.loading = false;
  }
}
</script>

<style scoped>
</style>
