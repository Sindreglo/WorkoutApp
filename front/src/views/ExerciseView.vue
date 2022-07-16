<template>
  <div>
    <v-progress-linear
        v-if="loading"
        :active="loading"
        :indeterminate="loading"
        absolute
        color="primary"
    ></v-progress-linear>
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Exercise
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-on:click="editDialog(item)"
              v-for="(item, index) in exercises"
              :key="index"
          >
            <td>{{ item.exercise }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
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
              <v-text-field
                  label="Name"
                  v-model="editItem.editName"
                  type="text"
                  placeholder="Exercise"
                  outlined
              ></v-text-field>
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
  </div>
</template>

<script>
import {getExercises, editExercise, deleteExercise} from "@/plugins/firebase";

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
      async deleteExercise() {
        await deleteExercise(this.editItem.editId);
        this.exercises = await getExercises();
        this.editDialig = false;
      },
      async saveExercise() {
        await editExercise(this.editItem);
        this.exercises = await getExercises();
        this.editDialig = false;

      },
    },
    async created() {
      this.exercises = await getExercises();

      this.loading = false;
    }
}
</script>

<style scoped>

</style>
