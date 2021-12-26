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

          <b-table
            bordered
            :items="items"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            class="mt-5"
          >
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ipBackendPesanan,
  ipBackendUser,
  ipBackendBarang,
} from "../assets/js/ipBeckEnd";
import { BIcon, BIconChevronDoubleRight } from "bootstrap-vue";
export default {
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      loading: false,
      pesanan: null,
      barang: null,
      link: null,
      id: localStorage.getItem("id"),
      perPage: 10,
      currentPage: 1,
      dataSales: "",
      dataBarang: "",
      value1: null,
      value2: null,
      sales: null,
      salesId: null,
      pemesan: null,
      produk: null,
      produkId: null,
      id: localStorage.getItem("id"),
      loading: false,
      ipBackendPesanan: ipBackendPesanan,
      fields: [
        { key: "nomor", thClass: "bg-info text-light" },
        { key: "nama", thClass: "bg-info text-light" },
        { key: "pesanan", thClass: "bg-info text-light" },
        { key: "noHP", thClass: "bg-info text-light" },
        { key: "NIK", thClass: "bg-info text-light" },
        { key: "tanggal", thClass: "bg-info text-light" },
        { key: "komisi", thClass: "bg-info text-light" },
        { key: "harga", thClass: "bg-info text-light" },
        { key: "status", thClass: "bg-info text-light" },
      ],
      items: [],
      options1: [],
      options2: [],
      options3: [],
      profil:"",
    };
  },
  components: {
    BIcon,
    BIconChevronDoubleRight,
  },

  async created() {
    this.loading = true;
    await this.getPesanan();
    await this.getLink();
    await this.getDataBarang();
    await this.getProfil();
    this.loading = false;
  },
  methods: {
    async getProfil() {
      this.loading = true;

      await this.$axios.get(`${ipBackendUser}profil`).then((list) => {
        this.profil = list.data.data[0];
      });
    },
    async getDataBarang() {
      this.loading = true;

      await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
        this.dataBarang = list.data.data;
        for (let i = 0; i < this.dataBarang.length; i++) {
          this.options3.push(this.dataBarang[i].namaBarang);
        }
      });

      this.loading = false;
    },

    async getPesanan() {
      this.loading = true;

      await this.$axios
        .get(`${ipBackendPesanan}listByUserId/${this.id}`)
        .then((list) => {
          if (list.data.message !== "anda belum login") {
            this.pesanan = list.data.data.length;
            if (list.data.data.length > 0) {
              for (let i = 0; i < list.data.data.length; i++) {
                this.options2.push(list.data.data[i].namaPemesan);
                this.items.push({
                  id: list.data.data[i].pesananId,
                  nomor: i + 1,
                  nama: list.data.data[i].namaPemesan,
                  alamat: list.data.data[i].alamatPemesan,
                  pesanan: list.data.data[i].namaBarang,
                  noHP: list.data.data[i].noHPPemesan,
                  NIK: list.data.data[i].NIKPemesan,
                  tanggal: this.$moment(list.data.data[i].tanggalPesan).format(
                    "LL"
                  ),
                  komisi: list.data.data[i].komisiPesanan,
                  harga: list.data.data[i].hargaBarang,
                  status: list.data.data[i].statusPesanan,
                });
              }
            }

            this.loading = false;
          } else {
            this.$router.push({ path: "/" });
          }
        });
      this.loading = false;
    },
    async submit() {
      this.loading = true;
      this.items = [];
      const data = {
        tanggalAwal: this.$moment(this.value1),
        tanggalAkhir: this.$moment(this.value2),
        namaPemesan: this.pemesan,
        userId: this.salesId,
        masterBarangId: this.produkId,
      };
      await this.$axios.post(`${ipBackendPesanan}list`, data).then((list) => {
        if (list.data.data.length > 0) {
          for (let i = 0; i < list.data.data.length; i++) {
            this.items.push({
              id: list.data.data[i].pesananId,
              nomor: i + 1,
              nama: list.data.data[i].namaPemesan,
              alamat: list.data.data[i].alamatPemesan,
              noHP: list.data.data[i].noHPPemesan,
              NIK: list.data.data[i].NIKPemesan,
              tanggal: this.$moment(list.data.data[i].tanggalPesan).format(
                "LL"
              ),
              komisi: list.data.data[i].komisiPesanan,
              harga: list.data.data[i].hargaBarang,
              status: list.data.data[i].statusPesanan,
            });
          }
        }
        this.loading = false;
      });
    },
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
    async getLink() {
      await this.$axios.get(`${ipBackendUser}getLink`).then((link) => {
        if (link.data.message !== "anda belum login") {
          this.link =
            `http://localhost:3000/` +
            link.data.data.slice(22, link.data.data.length);
          this.loading = false;
        } else {
          this.$router.push({ path: "/" });
        }
      });
    },
  },
  watch: {
    async sales(newValue, oldValue) {
      if (newValue !== oldValue) {
        for (let i = 0; i < this.dataSales.length; i++) {
          if (this.dataSales[i].username == this.sales) {
            this.salesId = this.dataSales[i].id;
          }
        }
      }
    },
    async produk(newValue, oldValue) {
      if (newValue !== oldValue) {
        for (let i = 0; i < this.dataBarang.length; i++) {
          if (this.dataBarang[i].namaBarang == this.produk) {
            this.produkId = this.dataBarang[i].masterBarangId;
          }
        }
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
.button {
  margin-top: 32px;
}
</style>
