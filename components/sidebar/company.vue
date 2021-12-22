<template>
  <div id="navbarCompany">
    <b-navbar variant="secondary">
      <div id="company" class="px-3 py-2">Riteza</div>
    </b-navbar>
  </div>
</template>
<script>
import { BIcon, BIconJustify, BIconLayers, BIconPerson } from "bootstrap-vue";
export default {
  components: {
    BIcon,
    BIconJustify,
    BIconLayers,
    BIconPerson,
  },
};
</script>
<style>
.headerSidebar {
  background: blue;
}
#titleSidebar div {
  font-size: 30px;
  font-weight: 700;
}
#company {
  font-size: 20px;
}
#navbarCompany{
      border-bottom: 5px solid black;

}
</style>
