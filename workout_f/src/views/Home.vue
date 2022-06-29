<template>
  <div class="wrapper">
    <div id="two">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h3>
              History
            </h3>
          </b-col>
          <b-col>
            <b-button id="new">
              add workout
              <b-icon icon="plus-circle-fill" aria-label="Help"></b-icon>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <div id="table">
        <b-table striped hover :items="workouts" :fields="fields">
        </b-table>
      </div>
    </div>
    <div id="three">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h3>
              Graph
            </h3>
          </b-col>
        </b-row>
      </b-container>
      <div id="graph">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt excepturi fuga nam perspiciatis praesentium quam sed suscipit veritatis voluptates! Beatae distinctio et facere inventore minus quas vel velit veritatis! Accusantium eveniet ex facere fugiat modi non nostrum tenetur voluptate. Aperiam explicabo illo iste iusto minima ratione sint? Alias amet assumenda autem commodi consequuntur corporis cum cumque debitis error eveniet fugiat incidunt inventore ipsum magnam maiores molestias nam nihil nulla officiis possimus quam quibusdam, quod ratione tempore tenetur velit voluptatum. A accusantium architecto at beatae eligendi illum, nihil nisi perferendis.
      </div>
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
      workouts: [{
        exercise: null
      }],
      fields: [
        {
          key: 'exercise',
        },
        {
          key: 'weight',
        },
        {
          key: 'reps',
        }
      ],
    }
  },
  created() {
    apiService.getUser().then((response) => {
      this.name = response.data.name;
      this.roles = response.data.roles;
    });
    apiService.getWorkouts().then((response) => {
      this.workouts = response.data;
      console.log(this.workouts.exercise);
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
  'two'
  'three';
}

#two {
  grid-area: two;
  margin-bottom: 40px;
}

#table {
  background: white;
  border-radius: 15px;
  height: 100%;
}

#graph {
  background: white;
  border-radius: 15px;
  height: 100%;
}

#three {
  grid-area: three;
  height: 80vh;
  width: 100%;
}

@media (min-width: 70em) {
  .wrapper {
    grid-template-rows: 1fr 5fr;
    grid-template-areas:
  'two three three'
  'two three three';
  }

  #two {
    width: 30vw;
    margin-bottom: 0;
  }
}

p {
  margin: 5px;
  text-align: left;
}

h3 {
  text-align: left;
  font-size: 20px;
  margin-bottom: 1em;
}

#new {
  color: black;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  float: right;
}

</style>
