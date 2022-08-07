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
        <v-row>
          <v-col
              cols="12"
              sm="12"
              md="8"
          >
            <v-row>
              <v-col
                  cols="12"
                  sm="12"
                  md="12"
              >
                <v-card
                    class="pa-2"
                    tile
                    elevation="0"
                >
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
              </v-col>
              <v-col
                  cols="6"
                  sm="6"
                  md="6"
              >
                <v-card
                    class="pa-2 boxComponent"
                    tile
                    elevation="0"
                >

                </v-card>
              </v-col>
              <v-col
                  cols="6"
                  sm="6"
                  md="6"
              >
                <v-card
                    class="boxComponent"
                    tile
                    elevation="0"
                >

                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col
              cols="12"
              sm="12"
              md="4"
          >
            <v-card
                tile
                elevation="0"
            >
              <v-card-title class="primary white--text">
                <span class="text-h8">User Activity</span>

                <v-spacer></v-spacer>
                <v-btn
                    dark
                    color="primary"
                    v-on:click="myWorkouts"
                    elevation="0">View All</v-btn>

                <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                    v-on:click="dialog=true"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>

              </v-card-title>

              <v-card elevation="0" tile class=" pa-1 pl-4" v-for="(workout,index) in workouts.slice(0,8)" :key="index" :style="getColor(workout.Exercise)" v-on:click="editDialog(workout)">
                <div>
                  <div>{{ workout.Exercise }}</div>
                  <v-row>
                    <v-col>
                      <div class="caption grey--text ma-0">Weight</div>
                      <div>{{ workout.Weight }}</div>
                    </v-col>
                    <v-col>
                      <div class="caption grey--text ma-0">Reps</div>
                      <div>{{ workout.Reps }}</div>
                    </v-col><v-col>
                    <div class="caption grey--text ma-0">Date</div>
                    <div>{{ workout.Date }}</div>
                  </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

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
  getWorkoutsFromExercise
} from "@/plugins/firebase";
import router from "@/router";
import store from "@/store";

export default {
  name: "DashBoard2",
  components: { VueApexCharts },
  props: ['login'],
  data() {
    return {
      loading: true,

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
      }, /** {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      }*/],
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
    },
    myWorkouts() {
      router.push({name: 'workouts'})
    },
  },
  async created() {
    this.workouts = await getWorkouts();
    this.exerciseList = await getExercises();

    if(this.exerciseList.length > 0) {
      for (let i = 0; i < this.exerciseList.length; i++) {
        this.exercises[i] = this.exerciseList[i].exercise;
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

.boxComponent {
  min-height: 187px;
}
</style>
