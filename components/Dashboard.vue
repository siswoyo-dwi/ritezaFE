<template>
  <div class="container-fluid">
    <b-spinner
      class="container-fluid d-flex justify-content-center align-items-center"
      v-if="loading"
      label="Loading..."
    ></b-spinner>
    <div v-else>
      <p class="pl-5">DASHBOARD</p>
      <hr />
      <div>
        <b-row>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col>
              <b-card
                class="cardDashboard"
                bg-variant="info"
                text-variant="white"
                title="Sales"
                ><b-icon icon="person" class="icon-dashboard"></b-icon>
                <b-card-text class="display-4">{{ sales }} </b-card-text>
                <NuxtLink class="navbarLayoutDefault" to="/listsales">
                  <b-card-text>
                    List Sales
                    <b-icon icon="chevron-double-right"></b-icon></b-card-text
                ></NuxtLink>
              </b-card>
            </b-col>
          </div>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col
              ><b-card
                class="cardDashboard"
                bg-variant="success"
                text-variant="white"
                title="Kategori"
              >
                <b-icon icon="layers" class="icon-dashboard"></b-icon>
                <b-card-text class="display-4">{{ barang }}</b-card-text>
                <NuxtLink to="/listdatabarang" class="navbarLayoutDefault">
                  <b-card-text
                    >List Kategori
                    <b-icon icon="chevron-double-right"></b-icon></b-card-text
                ></NuxtLink>
              </b-card>
            </b-col>
          </div>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col
              ><b-card
                class="cardDashboard"
                bg-variant="danger"
                text-variant="white"
                title="Pesanan"
              >
                <b-icon icon="cart4" class="icon-dashboard"></b-icon>
                <b-card-text class="display-4">{{ pesanan }}</b-card-text>
                <NuxtLink to="/listpesanan" class="navbarLayoutDefault">
                  <b-card-text
                    >List Pesanan
                    <b-icon icon="chevron-double-right"></b-icon>
                  </b-card-text>
                </NuxtLink>
              </b-card>
            </b-col>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ipBackendBarang,
  ipBackendUser,
  ipBackendPesanan,
} from "../assets/js/ipBeckEnd";
import {
  BIcon,
  BIconChevronDoubleRight,
  BIconPerson,
  BIconLayers,
  BIconCart4,
} from "bootstrap-vue";
export default {
  data() {
    return {
      loading: false,
      sales: null,
      barang: null,
      pesanan: null,
      link: null,
    };
  },
  components: {
    BIcon,
    BIconChevronDoubleRight,
    BIconPerson,
    BIconLayers,
    BIconCart4,
  },

  async created() {
    this.loading = true;
    await this.getTotalSales();
    await this.getPesanan();
    await this.getTotalBarang();
    this.loading = false;
  },
  methods: {
    async copy() {
      /* Get the text field */
      const copyText = document.getElementById("myInput");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value);

      /* Alert the copied text */
      alert("Copied");
    },
    async getTotalSales() {
      this.id = localStorage.getItem("id");
      this.loading = true;
      if (this.id) {
        await this.$axios.get(`${ipBackendUser}listAll`).then((list) => {
          if (list.data.message !== "anda belum login") {
            this.sales = list.data.data.length;
            this.loading = false;
          } else {
            this.$router.push({ path: "/" });
          }
        });
      }
    },
    async getPesanan() {
      this.loading = true;

      await this.$axios.post(`${ipBackendPesanan}list`).then((list) => {
        console.log(list);
        if (list.data.message !== "anda belum login") {
          this.pesanan = list.data.data.length;
          this.loading = false;
        } else {
          this.$router.push({ path: "/" });
        }
      });
      this.loading = false;
    },
    async getTotalBarang() {
      this.id = localStorage.getItem("id");
      this.loading = true;
      if (this.id) {
        await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
          if (list.data.message !== "anda belum login") {
            this.barang = list.data.data.length;
            this.loading = false;
          } else {
            this.$router.push({ path: "/" });
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.navbarLayoutDefault {
  text-decoration: none;
  color: white;
}
.cardDashboard {
  width: 18rem;
}
.icon-dashboard {
  position: absolute;
  z-index: 0;
  right: 20px;
  opacity: 0.4;
  font-size: 100px;
}
</style>
