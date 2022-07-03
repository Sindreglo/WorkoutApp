<template>
  <div id="container">
    <b-form id="form" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-1"
          label="Weight:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="form.email"
            type="number"
            placeholder="Enter weight"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Repetitions:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.name"
            type="number"
            placeholder="Enter repetitions"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Exercise:" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="form.food"
            :options="foods"
            required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import storageService from "@/services/storageService";
import apiService from "@/services/apiService";

export default {
  name: 'newWorkout',
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
    }
  },
  created() {
    if (storageService.getToken() === null) {
      this.$router.push("/login")
    }
    apiService.getExercises().then((response) => {
      console.log(response);
      this.exercises = response.data;
    })
  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form {
  width: 30vw;
}
</style>
