<template>
  <div>
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
        <v-container>
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
                      @click="deleteExercise"
                  >
                    Delete
                  </v-btn>
                  <v-btn
                      dark
                      text
                      @click="saveExercise"
                  >
                    Save
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card>
                <v-card-text>
                  <v-row justify="center">
                    <h3>Pick a color for your exercise</h3>
                  </v-row>
                  <v-row justify="center" class="mb-7">
                    <v-color-picker
                        v-model="editItem.editColor"
                        dot-size="40"
                        width="80%"
                        hide-canvas
                        hide-inputs
                        hide-sliders
                        mode="hexa"
                        show-swatches
                        swatches-max-height="150"
                    ></v-color-picker>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card>
          </v-dialog>
        </v-container>

        <v-card color="component" tile class="pa-3" v-for="(exercise,index) in exercises" :key="index">
          <v-row class="project" :style="getColor(exercise)" v-on:click="editDialog(exercise)">
            <v-col cols="6" md="6">
              <div class="caption grey--text">Exercise</div>
              <div>{{ exercise.exercise }}</div>
            </v-col>
            <v-col cols="6" md="6">
              <div class="caption grey--text">Max Weight</div>
              <div>{{ exercise.maxWeight }}</div>
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
import {getUser, db} from "@/plugins/firebase";
import storageService from "@/services/storageService";

  export default {
  name: "ExerciseView",
    data() {
      return {
        loading: true,

        exercises: [],
        editDialig: false,
        editItem: {
          editName: null,
          editId: null,
          editColor: null,
        },
      }
    },
    methods: {
      editDialog(item) {
        this.editItem.editName = item.exercise;
        this.editItem.editId = item.id;
        this.editItem.editColor = item.color;
        this.editDialig = true;
      },
      async getExercises() {
        this.exercises = [];
        await db.collection('users').doc(storageService.getToken()).collection('Exercises').orderBy("maxWeight", "desc")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.exercises.push({
                  ...doc.data(),
                  id: doc.id,
                })
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        this.loading = false;
      },
      async deleteExercise() {
        try {
          await db.collection('users').doc(storageService.getToken()).collection('Exercises').doc(this.editItem.editId).delete().then(this.remove=true);
        } catch (err) {
          console.log(err);
          console.log("ERROR")
        }
        await this.getExercises();
        this.editDialig = false;
      },
      async saveExercise() {
        const ex = {
          color: this.editItem.editColor,
        }
        await db.collection('users').doc(storageService.getToken()).collection('Exercises').doc(this.editItem.editId)
            .update(ex).then(this.update=true);
        await this.getExercises();
        this.editDialig = false;

      },
      getColor(exercise) {
        return "border-left: 5px solid "+ exercise.color;
      }
    },
    async created() {
      await getUser();
      await this.getExercises();
      await getUser();
    }
}
</script>

<style scoped>

</style>
