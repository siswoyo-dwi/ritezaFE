<template>
    <div variant="secondary" >
         <b-nav vertical id="list"  >
          <b-button class="sidebarr d-flex justify-content-start" size="sm"  :class="{active : muncul}"
            ><b-icon class="ml-3" icon="layers"></b-icon>
            <div class="ml-3" >Banner</div>
          </b-button>
          <b-button class="d-flex justify-content-start" size="sm"
            ><b-icon class="ml-3" icon="layers"></b-icon>
            <div class="ml-3">Kategori</div></b-button
          >
          <b-button class="d-flex justify-content-start" size="sm"
            ><b-icon class="ml-3" icon="layers"></b-icon>
            <div class="ml-3">Sub Kategori</div></b-button
          >
          <b-button class="d-flex justify-content-start" size="sm"
            ><b-icon class="ml-3" icon="layers"></b-icon>
            <div class="ml-3">partner</div></b-button
          >
          <b-button class="d-flex justify-content-start" size="sm"
            ><b-icon class="ml-3" icon="person"></b-icon>
            <div class="ml-3">User</div></b-button
          >
        </b-nav>
    </div>
</template>
<script>
import { BIcon, BIconJustify, BIconLayers, BIconPerson } from "bootstrap-vue";

export default {
  props:['muncul'],
  components: {
    BIcon,
    BIconJustify,
    BIconLayers,
    BIconPerson,
  },
  watch:{
    muncul:function(val){
      console.log(val)
    }
  }
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

/* .sidebarr{
  background-color: chartreuse;
  color:red;
}
.sidebarr .active{
  margin-top: 100px;
  padding-top: auto;
} */
</style>
