<template>
  <div class="container">
    <b-spinner v-if="loading"></b-spinner>
    <div v-else>
      <b-row class="my-5">
        <b-col>
          <label>Tanggal awal</label>
          <b-input-group>
            <b-form-input
              v-model="value1"
              size="sm"
              type="text"
              placeholder="YYYY-MM-DD"
            ></b-form-input>
            <b-form-datepicker
              v-model="value1"
              size="sm"
              button-only
              button-variant="primary"
            ></b-form-datepicker>
          </b-input-group>
        </b-col>
        <b-col>
          <label>Tanggal akhir</label>
          <b-input-group>
            <b-form-input
              v-model="value2"
              type="text"
              size="sm"
              placeholder="YYYY-MM-DD"
            ></b-form-input>
            <b-form-datepicker
              v-model="value2"
              size="sm"
              button-only
              button-variant="primary"
            ></b-form-datepicker>
          </b-input-group>
        </b-col>
        <b-col>
          <label>Sales</label>

          <b-form-select
            v-model="sales"
            :options="options1"
            size="sm"
          ></b-form-select>
        </b-col>
        <b-col>
          <label>Pemesan</label>

          <b-form-select
            v-model="Pemesan"
            :options="options2"
            size="sm"
          ></b-form-select>
        </b-col>
        <b-col>
          <label>Produk</label>

          <b-form-select
            v-model="produk"
            :options="options3"
            size="sm"
          ></b-form-select>
        </b-col>
        <b-col>
          <b-button
            size="sm"
            class="button"
            type="submit"
            variant="primary"
            @click="submit()"
            >Search</b-button
          >
        </b-col>
      </b-row>

      <b-table striped hover :items="items" :fields="fields">
        <template #cell(update)="row">
          <b-button
            size="sm"
            variant="outline-primary"
            @dblclick="update(row)"
            class="mr-2"
          >
            <b-icon icon="pencil"></b-icon>
          </b-button>
        </template>
        <!-- <template #cell(ditolak)="row">
        <b-button
          size="sm"
          v-model="status"
          variant="outline-primary"
          @dblclick="ditolak(row)"
          class="mr-2"
        >
          <b-icon icon="pencil"></b-icon>
        </b-button>
      </template> -->
      </b-table>
    </div>
  </div>
</template>
<script>
import {
  ipBackendPesanan,
  ipBackendUser,
  ipBackendBarang,
} from "../assets/js/ipBeckEnd";
import { BIcon, BIconPencil } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconPencil,
  },
  data() {
    return {
      dataSales: "",
      dataBarang: "",
      value1: null,
      value2: null,
      sales: null,
      salesId:null,
      Pemesan: null,
      produk: null,
      produkId: null,

      loading: false,
      ipBackendPesanan: ipBackendPesanan,
      fields: [
        { key: "nama" },
        { key: "alamat" },
        { key: "noHP" },
        { key: "NIK" },
        { key: "tanggal" },
        { key: "komisi" },
        { key: "harga" },
        { key: "status" },
        { key: "update" },
      ],
      items: [],
      options1: [],
      options2: [],
      options3: [],
    };
  },
  async created() {
    this.loading = true;
    await this.getPesanan();
    await this.getDataBarang();
    await this.getDataSales();

    this.loading = false;
  },
  methods: {
    async getDataSales() {
      this.loading = true;
      await this.$axios.get(`${ipBackendUser}listAll`).then((list) => {
        this.dataSales = list.data.data;
        for (let i = 0; i < this.dataSales.length; i++) {
          this.options1.push(this.dataSales[i].username);
        }
        this.loading = false;
      });
    },
    async getDataBarang() {
      this.loading = true;

      await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
        this.dataBarang = list.data.data;
        const array = [];
        for (let i = 0; i < this.dataBarang.length; i++) {
          array.push(this.dataBarang[i].keteranganBarang);
          this.options3.push(this.dataBarang[i].namaBarang);
        }
        this.options2 = [...new Set(array)];
      });

      this.loading = false;
    },
    async getPesanan() {
      this.loading = true;

      await this.$axios.post(`${ipBackendPesanan}list`).then((list) => {
        if (list.data.data.length > 0) {
          console.log(list.data.data);

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
    async update(index) {
      const id = index.item.id;
      this.$router.push({ path: `/update/pesanan/${id}` });
    },
    async submit() {
      this.loading = true;
      this.items = [];
      const data = {
        tanggalAwal: this.value1,
        tanggalAkhir: this.value2,
        namaPemesan: this.pemesan,
        userId: this.salesId,
        masterBarangId: this.produkId,
      };
      await this.$axios.post(`${ipBackendPesanan}list`, data).then((list) => {
        console.log(data);
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
  },
  watch: {
    async sales(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log(newValue, oldValue);
        for (let i = 0; i < this.dataSales.length; i++) {
          if (this.dataSales[i].username == this.sales) {
            this.salesId= this.dataSales[i].id;
          }
        }
      }
    },
    async produk(newValue, oldValue) {
      if (newValue !== oldValue) {
        for (let i = 0; i < this.dataBarang.length; i++) {
          if (this.dataBarang[i].namaBarang == this.produk) {
            this.produkId = this.dataBarang[i].id;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.button {
  margin-top: 32px;
}
</style>
