<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <h1>{{ email}}</h1>

    <v-container fluid class="my-5">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur consequatur consequuntur deleniti, dignissimos ea eligendi enim eos fugiat minus, molestiae neque numquam odio recusandae rerum saepe tempora. Earum, repellendus!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur eos ipsa ipsum omnis quas quibusdam reiciendis repudiandae unde ut! Consectetur consequuntur eum nobis officia possimus quod reiciendis suscipit! Aspernatur ex expedita ipsam iure laudantium magnam omnis praesentium quas suscipit totam.</p>
    </v-container>
  </div>
</template>

<script>
import {getUser, getData} from "@/plugins/firebase";

export default {
  name: "DashBoard",
  data() {
    return {
      email: '',
    }
  },
  async created() {
    this.email = getUser();
    console.log(getData())
  }

}
</script>

<style scoped>

</style>
