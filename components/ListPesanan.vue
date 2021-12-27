<template>
  <div class="container">
    <Header />
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

          <b-form-select v-model="sales" :options="options1" size="sm">
            <template #first>
              <b-form-select-option :value="null">sales</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>Pemesan</label>

          <b-form-select v-model="pemesan" :options="options2" size="sm">
            <template #first>
              <b-form-select-option :value="null" disabled>
                Pemesan
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col>
          <label>Produk</label>

          <b-form-select v-model="produk" :options="options3" size="sm">
            <template #first>
              <b-form-select-option :value="null">Produk</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col>
          <label>Status</label>

          <b-form-select v-model="statusPesanan" :options="options4" size="sm">
            <template #first>
              <b-form-select-option :value="null">Status</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-button
          size="sm"
          class="button mt-5"
          type="submit"
          variant="primary"
          @click="submit()"
          block
          >Search</b-button
        >
      </b-row>
      <b-table
        class="mt-5"
        bordered
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <b-tr head-variant="dark"> </b-tr>
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
        <template #cell(detail)="row">
          <b-button
            size="sm"
            variant="outline-primary"
            @dblclick="goTo(row)"
            class="mr-2"
          >
            <b-icon icon="layers"></b-icon>
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import {
  ipBackendPesanan,
  ipBackendUser,
  ipBackendBarang,
} from "../assets/js/ipBeckEnd";
import { BIcon, BIconPencil, BIconLayers } from "bootstrap-vue";
export default {
  components: {
    BIcon,
    BIconPencil,
    BIconLayers,
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      dataSales: "",
      statusPesanan: "",
      dataBarang: "",
      value1: null,
      value2: null,
      sales: null,
      salesId: null,
      pemesan: null,
      produk: null,
      produkId: null,
      options4: [
        { value: 0, text: "Diproses" },
        { value: 1, text: "Diterima" },
        { value: 2, text: "Ditolak" },
      ],
      loading: false,
      ipBackendPesanan: ipBackendPesanan,
      fields: [
        { key: "nomor", thClass: "bg-info text-light" },
        { key: "nama", thClass: "bg-info text-light" },
        { key: "pesanan", thClass: "bg-info text-light" },
        { key: "sales", thClass: "bg-info text-light" },
        { key: "tanggal", thClass: "bg-info text-light" },
        { key: "komisi", thClass: "bg-info text-light" },
        { key: "harga", thClass: "bg-info text-light" },
        { key: "status", thClass: "bg-info text-light" },
        { key: "update", thClass: "bg-info text-light" },
        { key: "detail", thClass: "bg-info text-light" },
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
        for (let i = 0; i < this.dataBarang.length; i++) {
          this.options3.push(this.dataBarang[i].namaBarang);
        }
      });

      this.loading = false;
    },
    async getPesanan() {
      this.loading = true;

      await this.$axios.post(`${ipBackendPesanan}list`).then((list) => {
        if (list.data.data.length > 0) {
          for (let i = 0; i < list.data.data.length; i++) {
            this.options2.push(list.data.data[i].namaPemesan);
            this.items.push({
              nomor: i,
              id: list.data.data[i].pesananId,
              nomor: i + 1,
              nama: list.data.data[i].namaPemesan,
              sales: list.data.data[i].username,
              pesanan: list.data.data[i].namaBarang,
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
    async goTo(index) {
      const id = index.item.id;
      this.$router.push({ path: `/detail/${id}` });
    },
    async submit() {
      this.loading = true;
      this.items = [];
      const data = {
        tanggalAwal: this.$moment(this.value1),
        tanggalAkhir: this.$moment(this.value2),
        namaPemesan: this.pemesan,
        statusPesanan: this.statusPesanan,
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
    // async statusPesanan(newValue, oldValue) {
    //   if (newValue !== oldValue) {

    //   }
    // },
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
.button {
  margin-top: 32px;
}
</style>
