<template>
  <div class="container">
    <b-sidebar
      bg-variant="secondary"
      class="headerSidebar"
      no-header
      id="sidebar-1"
      shadow
    >
      <template #default="{ hide }">
        <div
          @click="
            geser();
            hide();
          "
        >
          <b-navbar
            variant="info"
            id="titleSidebar"
            class="d-flex justify-content-center"
          >
            <div>Backoffice</div>
          </b-navbar>
          <Company />
          <ListRouterSidebar />
        </div>
      </template>
    </b-sidebar>

    <div class="test" :class="{ active: isActive }">
      <b-navbar class="navbarLayoutDefault">
        <b-icon icon="justify" @click="geser" v-b-toggle.sidebar-1></b-icon>
        <b-icon icon="person-circle" class="ml-5" id="iconPerson"></b-icon>
        <NuxtLink class="navbarLayoutDefault ml-5" to="/"
          ><b-navbar-brand class="ml-2">Hi,</b-navbar-brand></NuxtLink
        >
        <NuxtLink class="navbarLayoutDefault ml-5" to="updateprofile"
          >Update Profile
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-5" to="register"
          >Register Sales
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-5" to="registerbarang"
          >Register Barang
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-5" to="updatebarang"
          >Update Barang
        </NuxtLink>
      </b-navbar>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import ListRouterSidebar from "../components/sidebar/listRouterSidebar.vue";
import Company from "../components/sidebar/company.vue";
import {
  BIcon,
  BIconJustify,
  BIconLayers,
  BIconPersonCircle,
} from "bootstrap-vue";
export default {
  components: {
    Company,
    ListRouterSidebar,
    BIcon,
    BIconJustify,
    BIconLayers,
    BIconPersonCircle,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    geser() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
};
</script>
<style>
/* .headerSidebar {
  background: blue;
  color: aqua;
} */
#titleSidebar div {
  font-size: 30px;
  font-weight: 700;
}
#company {
  font-size: 20px;
}
#iconPerson {
  font-size: 30px;
}
.navbarLayoutDefault {
  text-decoration: none;
}
.test.active {
  margin-left: 200px;
  transition: 500ms;
}
</style>
