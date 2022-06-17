<template>
  <div class="wrapper">
    <div id="one">
      NEW WORKOUT
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
  background: darkcyan;
  grid-area: one;
}

#two {
  background: cornflowerblue;
  grid-area: two;
}

#three {
  background: yellow;
  grid-area: three;
  height: 80vh;
}

@media (min-width: 70em) {
  .wrapper {
    grid-template-areas:
  'one three three'
  'two three three'
  'two three three'
  'two three three';
  }

  #two {
    width: 30vw;
  }
}

</style>
