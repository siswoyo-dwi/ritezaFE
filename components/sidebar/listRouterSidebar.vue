<template>
  <div variant="secondary">
    <b-nav vertical id="list">
      <NuxtLink style="text-decoration: none" to="/banner">
        <b-button block class="sidebarr d-flex justify-content-start" size="sm"
          ><b-icon class="ml-3" icon="layers"></b-icon>
          <div class="ml-3">Banner</div>
        </b-button></NuxtLink
      >
      <NuxtLink style="text-decoration: none" to="/registerkategori">
        <b-button block class="d-flex justify-content-start" size="sm"
          ><b-icon class="ml-3" icon="layers"></b-icon>
          <div class="ml-3">Kategori</div></b-button
        ></NuxtLink
      >
      <b-button block class="d-flex justify-content-start" size="sm"
        ><b-icon class="ml-3" icon="layers"></b-icon>
        <div class="ml-3">Sub Kategori</div></b-button
      >
      <b-button block class="d-flex justify-content-start" size="sm"
        ><b-icon class="ml-3" icon="layers"></b-icon>
        <div class="ml-3">partner</div></b-button
      >
      <b-button block class="d-flex justify-content-start" size="sm"
        ><b-icon class="ml-3" icon="person"></b-icon>
        <div class="ml-3">User</div></b-button
      >
      <NuxtLink to="/sales" style="text-decoration: none">
        <b-button block class="d-flex justify-content-start" size="sm"
          ><b-icon class="ml-3" icon="person"></b-icon>
          <div class="ml-3">Sales</div></b-button
        >
      </NuxtLink>
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
</style>
