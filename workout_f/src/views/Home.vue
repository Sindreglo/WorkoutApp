<template>
  <div id="wrapper">
    <div id="left">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi asperiores beatae dolores esse harum, nulla omnis, perspiciatis quam quasi quisquam rem sunt suscipit tempora unde veniam, voluptas! Maiores, quidem?
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dignissimos doloremque error et ipsa nihil odio quae quia quisquam quod, totam, vitae voluptatem voluptatibus? A ad aut beatae blanditiis culpa eligendi, esse fuga in, molestiae quia quidem, quis reiciendis sapiente!
      </div>
    </div>
    <div id="right">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cumque eos est fuga nemo nobis numquam optio placeat similique ut. Accusamus, at atque aut dolores eaque inventore ipsa nam nesciunt provident quaerat recusandae, temporibus. Ad aperiam earum facilis inventore sequi voluptatibus. Aliquam animi architecto aspernatur distinctio, dolorem dolores eos esse, et fugiat fugit id itaque maiores obcaecati porro quisquam reiciendis sed voluptate voluptatem? Nam necessitatibus nostrum veniam vitae! Ab deserunt dicta est excepturi id, minima. Debitis deleniti dolorum eius expedita inventore nostrum repellat sed tempore temporibus vero. Dicta dolorem, doloremque libero nostrum placeat voluptas. A autem corporis explicabo impedit iusto neque non obcaecati optio possimus, quam reiciendis repudiandae saepe sequi. Architecto culpa ea excepturi maiores necessitatibus obcaecati odio porro rerum sint voluptas? A facere inventore itaque magnam odio officia omnis placeat quam quasi rerum? Ad alias aliquam aliquid amet, architecto culpa dicta dignissimos dolorum eaque eligendi exercitationem hic id ipsa ipsum itaque iure iusto maxime mollitia nam natus nemo nesciunt, odit officiis placeat possimus quibusdam repellendus sapiente sequi temporibus tenetur vel veritatis voluptas voluptatem. Autem cum cumque, error, eum, exercitationem explicabo fuga fugit inventore minima modi mollitia nihil nobis optio quia saepe sed veritatis voluptate voluptatibus. Doloremque minus possimus reprehenderit!
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
#wrapper {
  margin: 1em;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1em;
}

#wrapper > div > div{
  background: gray;
  padding: 1em;
}

#left {
  display: grid;
  grid-row-gap: 1em;
}


</style>
