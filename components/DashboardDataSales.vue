<template>
  <div class="container">
    <b-spinner
      class="d-flex justify-content-center align-items-center"
      v-if="loading"
      label="Loading..."
    ></b-spinner>
    <div v-else class="d-flex justify-content-center align-items-center">
      <div>
        <b-row>
          <b-row>
            <b-col class="col-10 my-3">
              <b-form-input v-model="link" id="myInput"> </b-form-input>
            </b-col>
            <b-col class="col-2 my-3">
              <b-button variant="primary" @click="copy()">Copy</b-button>
            </b-col>
          </b-row>
          <b-col class="col-3 my-3"></b-col>

          <div class="col-6 my-3">
            <b-col
              ><b-card bg-variant="info" text-variant="white" title="Pesanan">
                <b-card-text> Total Pesanan {{ sales }}</b-card-text>
                <b-card-text
                  >List Pesanan
                  <b-icon icon="chevron-double-right"></b-icon>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col class="col-3 my-3"></b-col>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ipBackendBarang, ipBackendUser } from "../assets/js/ipBeckEnd";
import { BIcon, BIconChevronDoubleRight } from "bootstrap-vue";
export default {
  data() {
    return {
      loading: false,
      sales: null,
      barang: null,
      link: null,
    };
  },
  components: {
    BIcon,
    BIconChevronDoubleRight,
  },

  async created() {
    this.loading = true;
    await this.getTotalSales();
    await this.getTotalBarang();
    await this.getLink();
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
    async getLink() {
      await this.$axios.get(`${ipBackendUser}getLink`).then((link) => {
        if (link.data.message !== "anda belum login") {
          this.link =
            `http://localhost:3000/` +
            link.data.data.slice(22, link.data.data.length - 1);
          this.loading = false;
        } else {
          this.$router.push({ path: "/" });
        }
      });
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
}
</style>
