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
        <v-row align="center">
          <v-col
              class="d-flex"
              cols="12"
              sm="2"
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


      






      <v-data-table
          :headers="headers"
          :items="workouts"
          sort-by="calories"
          class="elevation-1"
          @click:row="editDialog"
      >
        <template v-slot:[`item.Exercise`]="{ item }">
          <v-chip
              :color="item.color"
              dark
          >
            {{ item.Exercise }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>My Workouts</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
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
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import {
  addWorkout,
  deleteWorkout,
    editWorkout,
  getSelectedExercise,
  getExercises,
  getUser,
  getWorkouts,
  getWorkoutsFromExercise
} from "@/plugins/firebase";
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "DashBoard",
  components: { VueApexCharts },
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
          type: 'area'
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
      },

      headers: [
        {
          text: 'Exercise',
          align: 'start',
          value: 'Exercise',
        },
        { text: 'Weight', value: 'Weight' },
        { text: 'Reps', value: 'Reps' },
        { text: 'Date', value: 'Date' },
      ],


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
      this.dialog = false;

      if (!this.exercises.includes(this.newWorkout.exercise)) {
        this.exercises.push(this.newWorkout.exercise);
        await addWorkout(this.newWorkout.exercise, this.newWorkout.reps, this.newWorkout.weight, this.newWorkout.date, "#1E88E5FF");
      } else {
        for (let i = 0; i < this.exerciseList.length; i++) {
          if (this.newWorkout.exercise === this.exerciseList[i].exercise) {
            console.log(this.exerciseList[i].color);
            await addWorkout(this.newWorkout.exercise, this.newWorkout.reps, this.newWorkout.weight, this.newWorkout.date, this.exerciseList[i].color);
          }
        }
      }

      await getSelectedExercise(this.newWorkout.exercise);



      this.workouts = await getWorkouts();
      this.newWorkout.exercise = null;
      this.newWorkout.weight = null;
      this.newWorkout.reps = null;
      this.newWorkout.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
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
          type: 'area'
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
  },
  async created() {
    this.email = getUser();
    this.workouts = await getWorkouts();
    this.exerciseList = await getExercises();
    console.log(this.exerciseList);

    if(this.exerciseList.length > 0) {
      for (let i = 0; i < this.exerciseList.length; i++) {
        this.exercises[i] = this.exerciseList[i].exercise;
      }

      this.selectedExercise = this.exercises[0];
      await this.workoutGraph(this.exercises[0]);
    }

    this.loading = false;
  }

}
</script>

<style scoped>
</style>
