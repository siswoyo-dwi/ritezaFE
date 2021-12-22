<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row ">
        <Card />
    </div>
  </div>
</template>

<script>
import Card from "./register/CardRegister.vue";
export default {
  components: {
    Card,
  },

};
</script>
<style>
.container-fluid{
  height: 90vh;
}
</style>