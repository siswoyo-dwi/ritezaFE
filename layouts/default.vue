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
        <NuxtLink class="navbarLayoutDefault ml-3" to="/">
          <b-icon
            icon="person-circle"
            variant="primary"
            class="ml-3"
            id="iconPerson"
          ></b-icon>
        </NuxtLink>

        <h6>
          <b-badge variant="danger">{{ pesananBaru }}</b-badge>
        </h6>
        <NuxtLink class="navbarLayoutDefault ml-5" to="/register">
          <div>Register Sales</div>
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-3" to="/listsales"
          ><div>List Sales</div>
        </NuxtLink>

        <NuxtLink class="navbarLayoutDefault ml-3" to="/registerbarang"
          ><div>Barang/Jasa</div>
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-3" to="/listdatabarang"
          ><div>List Barang</div>
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-3" to="/registerkategori"
          ><div>Register Kategori</div>
        </NuxtLink>
        <NuxtLink class="navbarLayoutDefault ml-3" to="/listpesanan"
          ><div>List Pesanan</div>
        </NuxtLink>

        <NuxtLink class="navbarLayoutDefault ml-3" to="/"
          ><div @click="logout()">Logout</div>
        </NuxtLink>
      </b-navbar>
      <Nuxt @eventname="add()" />
    </div>
  </div>
</template>
<script>
import ListRouterSidebar from "../components/sidebar/listRouterSidebar.vue";
import { ipBackendPesanan } from "../assets/js/ipBeckEnd";
import Company from "../components/sidebar/company.vue";
import {
  BIcon,
  BIconJustify,
  BIconLayers,
  BIconPersonCircle,
  BIconBellFill,
} from "bootstrap-vue";
export default {
  components: {
    Company,
    ListRouterSidebar,
    BIcon,
    BIconJustify,
    BIconLayers,
    BIconPersonCircle,
    BIconBellFill,
  },
  data() {
    return {
      isActive: false,
      pesananBaru: "",
      status: 0,
    };
  },
  created() {
    this.getPesananBaru();
    this.$nuxt.$on("eventName", ($event) => this.add($event));
  },
  methods: {
    async getPesananBaru() {
      await this.$axios
        .get(`${ipBackendPesanan}jumlahByStatus/0`)
        .then((res) => {
          this.pesananBaru = res.data.data[0].count;
        });
    },
    logout() {
      localStorage.clear();
    },
    add(e) {
      setTimeout(this.status++, 1000);
      console.log('hai',e);
    },
    geser() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
  watch: {
    status(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getPesananBaru();
      }
    },
  },
};
</script>
<style>
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
.iconHeader {
  margin-left: 50px;
  font-size: 30px;
}
.badge {
  position: absolute;
  top: 20px;
}
</style>
