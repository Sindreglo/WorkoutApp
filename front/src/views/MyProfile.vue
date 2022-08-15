<template>
  <div class="pa-3">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
              flat
          >
            <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="workouts"
              @click:event="showEvent"
              @change="updateRange"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
            >
              <v-toolbar
                  elevation="0"
                  :color="selectedEvent.color"
                  dark
              >
                <v-btn icon v-on:click="editDialog(selectedEvent)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text class="component">
                <v-row class="project">
                  <v-col cols="6" md="6">
                    <div class="caption grey--text">Weight</div>
                    <div>{{ selectedEvent.weight }}</div>
                  </v-col>
                  <v-col cols="6" md="6">
                    <div class="caption grey--text">Reps</div>
                    <div>{{ selectedEvent.reps }}</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
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
  </div>
</template>

<script>
import {db, getUser} from "@/plugins/firebase";
import storageService from "@/services/storageService";


export default {
  name: "MyProfile",data: () => ({
    focus: '',
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    workouts: [],
    exerciseList: [],
    exercises: [],



    editDialig: false,
    editWorkout: {
      exercise: null,
      weight: null,
      reps: null,
      date: null,
      id: null,
    },

    buttons: {
      deleteBtn: false,
      updateBtn: false,
      addBtn: false,
    },
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    editDialog(item) {
      this.editWorkout.exercise = item.name;
      this.editWorkout.reps = item.reps;
      this.editWorkout.weight = item.weight;
      this.editWorkout.date = item.start;
      this.editWorkout.id = item.id;
      this.editDialig = true;
    },
    async updateRange () {
      await this.getExercises();
      const workouts = [];
      await db.collection('users').doc(storageService.getToken()).collection('Workouts').orderBy('Date', "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              workouts.push({
                name: doc.data().Exercise,
                start: doc.data().Date,
                color: this.getColor(doc.data().Exercise),
                reps: doc.data().Reps,
                weight: doc.data().Weight,
                id: doc.id,
              })
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

      this.workouts = workouts;
      await getUser();
    },
    getColor(exercise) {
      let color = null;
      for (let i = 0; i < this.exerciseList.length; i++) {
        if (exercise === this.exerciseList[i].exercise) {
          color = this.exerciseList[i].color;
        }
      }
      return color;
    },
    async getExercises() {
      this.exerciseList = [];
      await db.collection('users').doc(storageService.getToken()).collection('Exercises').get()
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
      if(this.exerciseList.length > 0) {
        for (let i = 0; i < this.exerciseList.length; i++) {
          this.exercises[i] = this.exerciseList[i].exercise;
        }
      }
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

      await db.collection('users').doc(storageService.getToken()).collection('Workouts').doc(this.editWorkout.id).update(wo).then(this.update=true);
      await this.updateRange();

      for (const exercise of this.exerciseList) {
        if (exercise.exerciseList === this.editWorkout.exercise) {
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
    },
    async deleteWorkout() {
      this.buttons.deleteBtn = true;
      try {
        await db.collection('users').doc(storageService.getToken()).collection('Workouts').doc(this.editWorkout.id).delete().then(this.remove=true);
      } catch (err) {
        console.log(err);
        console.log("ERROR")
      }
      await this.updateRange();
      this.editDialig = false;
      this.buttons.deleteBtn = false;
    },
  },
  async created() {
    await getUser();
  }
}
</script>

<style scoped>

</style>
