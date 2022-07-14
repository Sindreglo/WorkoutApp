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
                :items="items"
                label="Outlined style"
                dense
                solo
            ></v-select>
          </v-col>

          <v-col
              class="d-flex"
              cols="12"
              sm="2"
          >
            <v-select
                :items="items"
                label="Solo field"
                dense
                solo
            ></v-select>
          </v-col>
        </v-row>

        <LineChartGenerator
            :chart-options="chartOptions"
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
      </v-container>

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
              Weight
            </th>
            <th class="text-left">
              Reps
            </th>
            <th class="text-left">
              Date
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-on:click="editDialog(item)"
              v-for="(item, index) in workouts"
              :key="index"
          >
            <td>{{ item.Exercise }}</td>
            <td>{{ item.Weight }}</td>
            <td>{{ item.Reps }}</td>
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
    </div>
  </div>
</template>

<script>
import {
  addWorkout,
  deleteWorkout,
  getSelectedExercise,
  getExercises,
  getUser,
  getWorkouts,
  getWorkoutsFromExercise
} from "@/plugins/firebase";
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
  name: "DashBoard",
  components: { LineChartGenerator },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: true,

      email: '',
      workouts: null,

      dialog: false,
      editDialig: false,

      exercises: [],

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

      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Data',
            borderColor: "rgb(24,118,209)",
            data: [],
            tension: 0.3
          }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
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
      await addWorkout(this.newWorkout.exercise, this.newWorkout.reps, this.newWorkout.weight, this.newWorkout.date);
      await getSelectedExercise(this.newWorkout.exercise);
      if (!this.exercises.includes(this.newWorkout.exercise)) {
        this.exercises.push(this.newWorkout.exercise);
      }

      this.workouts = await getWorkouts();
      this.newWorkout.exercise = null;
      this.newWorkout.weight = null;
      this.newWorkout.reps = null;
      this.newWorkout.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    },
    async editThisWorkout() {
      await deleteWorkout(this.editWorkout.id);
      await addWorkout(this.editWorkout.exercise, this.editWorkout.reps, this.editWorkout.weight, this.editWorkout.date);
      this.workouts = await getWorkouts();
      this.editDialig = false;
    },
    async deleteWorkout() {
      await deleteWorkout(this.editWorkout.id);
      this.workouts = await getWorkouts();
      this.editDialig = false;
    },
    async exerciseByWeight() {
      const chartWorkouts = await getWorkoutsFromExercise("Squats");

      for (let i = 0; i < chartWorkouts.length; i++) {
        this.chartData.labels[i] = chartWorkouts[i].Date;
        this.chartData.datasets[0].data[i] = chartWorkouts[i].Weight;
      }
      console.log(this.chartData.labels[0]);
      console.log(this.chartData.datasets[0].data[0]);
    }
  },
  async created() {
    this.email = getUser();
    this.workouts = await getWorkouts();
    const exerciseList = await getExercises();
    for (let i = 0; i < exerciseList.length; i++) {
      this.exercises[i] = exerciseList[i].exercise;
    }

    await this.exerciseByWeight();

    this.loading = false;
  }

}
</script>

<style scoped>
</style>
