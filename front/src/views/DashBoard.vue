<template>
  <div class="dashboard">
    <v-snackbar
        v-model="add"
        top
        color="primary"
        timeout="3000"
    >
      New workout has been registered.

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="add = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="update"
        top
        color="primary"
        timeout="3000"
    >
      Workout has been updated.

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="update = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="remove"
        top
        color="primary"
        timeout="3000"
    >
      Workout has been removed.
      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="remove = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>



    <v-progress-linear
        v-if="loading"
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="primary"
    ></v-progress-linear>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" md="3" order-lg="last" order-md="last">
              <div class="status-container">
                <div class="stats-1 rounded-lg primary white--text">
                  <div class="text-subtitle-1">Sets</div>
                  <h2>{{ setSum }}</h2>
                </div>
                <div class="stats-2 rounded-lg secondary white--text">
                  <div class="text-subtitle-1">Weights</div>
                  <h2>{{ weightSum }}</h2>
                </div>
                <div class="stats-3 rounded-lg third white--text">
                  <div class="text-subtitle-1">Reps</div>
                  <h2>{{ repSum }}</h2>
                </div>
              </div>
          </v-col>
          <v-col cols="12" md="9" order-lg="first" order-md="first">
            <v-card
                color="component"
                tile
                elevation="0"
                class="mb-5 rounded-lg"
            >

              <!-- Graph -->
              <v-container>
                <v-row align="center">
                  <v-col
                      class="d-flex"
                      cols="6"
                      sm="4"
                      color="primary"
                  >
                    <v-select
                        background-color="component"
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
        </v-row>

        <!-- List -->
        <v-card
            tile
            elevation="0"
            color="component"
            class="rounded-lg"
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
                    background-color="component"
                    :items="byExercise"
                    v-model="byExerciseSeleted"
                    label="Solo field"
                    @change="getWorkouts"
                    solo
                    dense
                ></v-select>
              </v-col>
              <v-col cols="4" md="3" xs="3">
                <v-select
                    background-color="component"
                    :items="byOptions"
                    v-model="byOptionsSelected"
                    @change="getWorkouts"
                    label="Solo field"
                    solo
                    dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card color="component" elevation="0" tile class="pa-3" v-for="(workout,index) in workouts" :key="index">
            <v-row class="project" v-on:click="editDialog(workout)">
              <v-col cols="4" md="4" xs="4">
                <div class="caption grey--text">Exercise</div>
                <div>{{ workout.Exercise }}</div>
              </v-col>
              <v-col cols="4" md="4" xs="4">
                <div class="caption grey--text">Date</div>
                <div>{{ formattedDate(workout.Date) }}</div>
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
                    :loading="buttons.deleteBtn"
                    @click="deleteWorkout"
                >
                  Delete
                </v-btn>
                <v-btn
                    dark
                    text
                    :loading="buttons.updateBtn"
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
                    :loading="buttons.addBtn"
                    @click="addWorkout"
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
  db, getUser, getWorkoutsFromExercise,
} from "@/plugins/firebase";
import storageService from "@/services/storageService";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'


export default {
  name: "DashBoard2",
  components: { VueApexCharts },
  props: ['login'],
  data() {
    return {
      // snackbars
      add: false,
      update: false,
      remove: false,

      // Buttons
      buttons: {
        deleteBtn: false,
        updateBtn: false,
        addBtn: false,
      },


      loading: true, // Loading bar
      byExerciseSeleted: 'All Exercises',
      byOptions: ['Date', 'Weight', 'Reps'],
      byOptionsSelected: 'Date',

      workouts: [], // List of Workouts

      dialog: false, //New Workout Dialog
      editDialig: false, // Edit Workout Dialog

      exercises: [],
      exerciseList: [],
      byExercise: ['All Exercises'],
      selectedExercise: null,

      // Chart options
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
          },
        },
        theme: {
          mode: 'component',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          theme: 'component',
          x: {
            format: 'dd/MM/yy'
          },
        },
      },

      // New Workout
      newWorkout: {
        exercise: null,
        weight: null,
        reps: null,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      // Edit Workout
      editWorkout: {
        exercise: null,
        weight: null,
        reps: null,
        date: null,
        id: null,
      },

      setSum: 0,
      weightSum: 0,
      repSum: 0,
    }
  },
  methods: {
    async getExercises() {
      await db.collection('users').doc(storageService.getToken()).collection('Exercises')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.exerciseList.push({
                ...doc.data(),
                id: doc.id,
              })
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      this.exercises = [];
      if(this.exerciseList.length > 0) {
        for (let i = 0; i < this.exerciseList.length; i++) {
          this.exercises[i] = this.exerciseList[i].exercise;
          this.byExercise.push(this.exerciseList[i].exercise);
        }
        this.selectedExercise = this.exercises[0];
        await this.workoutGraph(this.exercises[0]);
      }
    },
    async addExercise() {
      let exercises = [];
      await db.collection('users').doc(storageService.getToken()).collection('Exercises').where('exercise', '==', this.newWorkout.exercise)
          .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          exercises.push({
            ...doc.data()
          })
        });
      })
      if (exercises.length === 0) {
        const ex = {
          exercise: this.newWorkout.exercise,
          color: '#00000000',
          maxWeight: Number(this.newWorkout.weight),
        }
        await db.collection('users').doc(storageService.getToken()).collection('Exercises').add(ex);
      }
      await this.getExercises();
    },
    async getWorkouts() {
      if (this.byExerciseSeleted === 'All Exercises') {
        await db.collection('users').doc(storageService.getToken()).collection('Workouts').orderBy(this.byOptionsSelected, "desc")
            .get()
            .then((querySnapshot) => {
              this.loading = false;
              this.workouts = [];
              querySnapshot.forEach((doc) => {
                this.workouts.push({
                  ...doc.data(),
                  id: doc.id,
                })
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
      } else {
        await db.collection('users').doc(storageService.getToken()).collection('Workouts').orderBy(this.byOptionsSelected, "desc").where("Exercise", "==", this.byExerciseSeleted)
            .get()
            .then((querySnapshot) => {
              this.loading = false;
              this.workouts = [];
              querySnapshot.forEach((doc) => {
                this.workouts.push({
                  ...doc.data(),
                  id: doc.id,
                })
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
      }
      this.workoutInfo();
    },
    editDialog(item) {
      this.editWorkout.exercise = item.Exercise;
      this.editWorkout.reps = item.Reps;
      this.editWorkout.weight = item.Weight;
      this.editWorkout.date = item.Date;
      this.editWorkout.id = item.id;
      this.editDialig = true;
    },
    async addWorkout() {
      this.buttons.addBtn = true;
      if (this.newWorkout.reps === null) {
        this.newWorkout.reps = 0;
      }
      if (this.newWorkout.weight === null) {
        this.newWorkout.weight = 0;
      }

      const wo = {
        Reps: Number(this.newWorkout.reps),
        Weight: Number(this.newWorkout.weight),
        Exercise: this.newWorkout.exercise,
        Date: this.newWorkout.date,
      }

      await db.collection('users').doc(storageService.getToken()).collection('Workouts').add(wo);
      await this.addExercise();
      await this.getWorkouts();

      for (const exercise of this.exerciseList) {
        if (exercise.exercise === this.newWorkout.exercise) {
          if (exercise.maxWeight < this.newWorkout.weight) {
            const ex = {
              maxWeight: Number(this.newWorkout.weight),
            }
            await db.collection('users').doc(storageService.getToken()).collection('Exercises').doc(exercise.id)
                .update(ex);
          }
        }
      }

      this.newWorkout.exercise = null;
      this.newWorkout.weight = null;
      this.newWorkout.reps = null;
      this.newWorkout.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.dialog = false;
      this.buttons.addBtn = false;
      this.add=true
    },
    async editThisWorkout() {
      this.buttons.updateBtn = true;
      if (this.editWorkout.reps === "") {
        this.editWorkout.reps = 0;
      }
      if (this.editWorkout.weight === "") {
        this.editWorkout.weight = 0;
      }
      const wo = {
        Reps: Number(this.editWorkout.reps),
        Weight: Number(this.editWorkout.weight),
        Exercise: this.editWorkout.exercise,
        Date: this.editWorkout.date,
      }

      await db.collection('users').doc(storageService.getToken()).collection('Workouts').doc(this.editWorkout.id).update(wo);
      await this.getWorkouts();

      for (const exercise of this.exerciseList) {
        if (exercise.exercise === this.editWorkout.exercise) {
          if (exercise.maxWeight < this.editWorkout.weight) {
            const ex = {
              maxWeight: Number(this.editWorkout.weight),
            }
            await db.collection('users').doc(storageService.getToken()).collection('Exercises').doc(exercise.id)
                .update(ex);
          }
        }
      }

      this.editWorkout = [];
      this.editDialig = false;
      this.buttons.updateBtn = false;
      this.update=true
    },
    async deleteWorkout() {
      this.buttons.deleteBtn = true;
      try {
        await db.collection('users').doc(storageService.getToken()).collection('Workouts').doc(this.editWorkout.id).delete().then;
      } catch (err) {
        console.log(err);
        console.log("ERROR")
      }
      await this.getWorkouts();
      this.editDialig = false;
      this.buttons.deleteBtn = false;
      this.remove=true;
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
        theme: {
          mode: 'component',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          },
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
          theme: 'background',
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
    workoutInfo() {

      this.setSum = 0;
      this.weightSum = 0;
      this.repSum = 0;

      for (let i = 0; i < this.workouts.length; i++) {
        this.setSum += 1;
        this.weightSum += this.workouts[i].Weight * this.workouts[i].Reps;
        this.repSum += this.workouts[i].Reps;
      }
      console.log(this.setSum);
      console.log(this.weightSum);
      console.log(this.repSum);
    },
    formattedDate(date){
      return date ? format(parseISO(date), 'do MMM yy') : ''
    },
  },
  async created() {
    await getUser();
    await this.getExercises();
    await this.getWorkouts();
    await getUser();
  }
}
</script>

<style scoped>
.status-container {
  height: 70px;
  display: grid;
  gap: .8rem;
  grid-template-areas:
  'one two three';
  grid-auto-columns: minmax(0, 1fr);
}
.stats-1 {
  padding: 10px;
  grid-area: one;
  font-size: 15px;
}
.stats-2 {
  padding: 10px;
  grid-area: two;
  font-size: 15px;
}
.stats-3 {
  padding: 10px;
  grid-area: three;
  font-size: 15px;
}

@media (min-width: 60em) {
  .status-container {
    height: 454px;
    grid-template-areas:
  'one'
  'two'
  'three';
  }
}

</style>
