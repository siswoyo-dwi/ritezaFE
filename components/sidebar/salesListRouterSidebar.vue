<template>
  <div variant="secondary">
    <b-nav vertical id="list">
      <NuxtLink to="/dashboardsalesid" class="navbarLayoutDefault"
        ><b-button class="sidebarr d-flex justify-content-start" size="sm"
          ><b-icon class="ml-3" icon="layers"></b-icon>
          <div class="ml-3">Get Link</div>
        </b-button></NuxtLink
      >
      <NuxtLink to="/salesupdateprofile" class="navbarLayoutDefault">
        <b-button class="d-flex justify-content-start" size="sm"
          ><b-icon class="ml-3" icon="person"></b-icon>
          <div class="ml-3">Update Profile</div></b-button
        ></NuxtLink
      >
    </b-nav>
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
.navbarLayoutDefault {
  text-decoration: none;
}
</style>
