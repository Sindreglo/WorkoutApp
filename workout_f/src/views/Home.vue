<template>
  <div class="wrapper">
    <div id="one">
      <p>Add Workout</p>
      <div>
        <b-form inline id="test">
          <b-form-select v-model="selected" :options="options" class="form-inputs" id="inline-form-input-exercise" placeholder="Exercise">
            <template #first>
              <b-form-select-option :value="null" disabled>Exercise</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-input
              type="number"
              class="form-inputs"
              id="inline-form-input-name"
              placeholder="Weight"
          ></b-form-input>

          <b-form-input type="number" class="form-inputs"  id="inline-form-input-username" placeholder="Reps"></b-form-input>

          <b-button id="inline-form-button-submit" variant="primary">Save</b-button>
        </b-form>
      </div>
    </div>
    <div id="two">
      WORKOUT LOG
      <p v-for="(workout, i) in workouts" :key='i' > {{ workout.exercise }} - {{ workout.weight }} - {{ workout.reps }}</p>
    </div>
    <div id="three">
      GRAPHS
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt excepturi fuga nam perspiciatis praesentium quam sed suscipit veritatis voluptates! Beatae distinctio et facere inventore minus quas vel velit veritatis! Accusantium eveniet ex facere fugiat modi non nostrum tenetur voluptate. Aperiam explicabo illo iste iusto minima ratione sint? Alias amet assumenda autem commodi consequuntur corporis cum cumque debitis error eveniet fugiat incidunt inventore ipsum magnam maiores molestias nam nihil nulla officiis possimus quam quibusdam, quod ratione tempore tenetur velit voluptatum. A accusantium architecto at beatae eligendi illum, nihil nisi perferendis.
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  name: "HomePage",
  data() {
    return {
      name: '',
      roles: {},
      workouts: {},
      value: '',
      selected: null,
      options: [
        { text: 'Benchpress' },
        { text: 'Squats' },
        { text: 'Deadlift' },
        { text: 'Pullups' },
        { text: 'Dips' },
      ]
    }
  },
  created() {
    apiService.getUser().then((response) => {
      this.name = response.data.name;
      this.roles = response.data.roles;
    });
    apiService.getWorkouts().then((response) => {
      this.workouts = response.data;
      console.log(this.workouts);
    })
  }
}
</script>

<style scoped>
.wrapper {
  padding: 20px;
  display: grid;
  gap: 1.5rem;
  grid-template-areas:
  'one'
  'two'
  'three';
}

#one {
  background: white;
  border-radius: 15px;
  grid-area: one;
}

#two {
  background: white;
  border-radius: 15px;
  grid-area: two;
}

#three {
  background: white;
  border-radius: 15px;
  grid-area: three;
  height: 80vh;
}

@media (min-width: 70em) {
  .wrapper {
    grid-template-rows: 1fr 5fr;
    grid-template-areas:
  'one three three'
  'two three three';
  }

  #two {
    width: 30vw;
  }
}

p {
  margin: 5px;
  text-align: left;
}

#test {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.form-inputs {
}

#inline-form-input-exercise {
  width: 100px;
  height: 32px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

#inline-form-input-name {
  font-size: 12px;
  width: 80px;
}

#inline-form-input-username {
  font-size: 12px;
  width: 80px;
}

#inline-form-button-submit {
  margin: 5px;
}

</style>
