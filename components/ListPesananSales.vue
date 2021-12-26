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

      <b-table
        bordered
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
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
import { BIcon, BIconPencil } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconPencil,
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
      dataBarang: "",
      value1: null,
      value2: null,
      sales: null,
      salesId: null,
      pemesan: null,
      produk: null,
      produkId: null,
      id:localStorage.getItem('id'),
      loading: false,
      ipBackendPesanan: ipBackendPesanan,
      fields: [
        { key: "nama" , thClass: 'bg-info text-light'},
        { key: "pesanan" , thClass: 'bg-info text-light'},
        { key: "noHP" , thClass: 'bg-info text-light'},
        { key: "NIK" , thClass: 'bg-info text-light'},
        { key: "tanggal" , thClass: 'bg-info text-light'},
        { key: "komisi" , thClass: 'bg-info text-light'},
        { key: "harga" , thClass: 'bg-info text-light'},
        { key: "status" , thClass: 'bg-info text-light'},
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

    this.loading = false;
  },
  methods: {
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

      await this.$axios.get(`${ipBackendPesanan}listByUserId/${this.id}`).then((list) => {
        if (list.data.data.length > 0) {
          console.log(list.data.data);

          for (let i = 0; i < list.data.data.length; i++) {
            this.options2.push(list.data.data[i].namaPemesan);
            this.items.push({
              id: list.data.data[i].pesananId,
              nomor: i + 1,
              sales: list.data.data[i].username,
              pesanan: list.data.data[i].namaBarang,
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
        tanggalAwal: this.$moment(this.value1),
        tanggalAkhir: this.$moment(this.value2),
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
            this.salesId = this.dataSales[i].id;
          }
        }
      }
    },
    async produk(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log(this.dataBarang);
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
