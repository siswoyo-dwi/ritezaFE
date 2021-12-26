<template>
  <div class="container-fluid" id="bg-pesanan">
    <div>
      <b-card id="head-pesanan">
        <div
          id="text-header"
          class="d-flex justify-content-center align-items-center"
        >
          <div class="circle mt-5"></div>
          <div class="ml-3 mt-5">
            Terimakasih telah mengunjungi website kami
          </div>
        </div>
      </b-card>
    </div>
    <div>
      <template>
        <b-row style="margin: 0">
          <b-col class="col-lg-6 col-sm-12">
            <b-img
              v-if="pic"
              class="foto mt-3"
              fluid
              :src="`${ipBackend}` + pic"
            />
            <b-img
              v-else
              class="foto mt-3"
              fluid
              :src="`https://www.freeiconspng.com/uploads/laptop-png-33.png`"
            />
            <b-button
              v-if="!loading"
              variant="primary"
              block
              class="mt-3 button-pesanan"
              @click="submit()"
              >Pesan Sekarang</b-button
            >
            <b-button
              v-else
              variant="primary"
              disabled
              block
              class="mt-3 button-pesanan"
              @click="submit()"
              >Pesan Sekarang</b-button
            >
          </b-col>
          <b-col class="col-lg-6 col-sm-12">
            <table class="font-weight text-primary">
              <tr>
                <td class="formPesanan">Nama</td>
                <td class="text-right">:</td>
                <td class="formInputLength pl-3">
                  <b-form-input
                    class="formInput mt-4"
                    size="sm"
                    v-model="namaPemesan"
                    required
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="formPesanan">Alamat</td>
                <td class="text-right">:</td>
                <td class="formInputLength pl-3">
                  <b-form-input
                    class="formInput mt-4"
                    size="sm"
                    v-model="alamatPemesan"
                    required
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="formPesanan">NIK</td>
                <td class="text-right">:</td>
                <td class="formInputLength pl-3">
                  <b-form-input
                    class="formInput mt-4"
                    size="sm"
                    v-model="NIKPemesan"
                    required
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="formPesanan">No. Handphone</td>
                <td class="text-right">:</td>
                <td class="formInputLength pl-3">
                  <b-form-input
                    class="formInput mt-4"
                    size="sm"
                    v-model="noHPPemesan"
                    required
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="formPesanan">Pesanan</td>
                <td class="text-right">:</td>
                <td class="formInputLength pl-3">
                  <b-row>
                    <b-col class="col-6" v-if="kategoriProduk">
                      <b-form-select
                        v-model="pesanan"
                        :options="barang"
                        size="sm"
                        class="formInput mt-4"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Silahkan Pilih Produk --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-col>
                    <b-col class="col-6" v-else>
                      <b-form-select
                        v-model="pesanan"
                        :options="barang"
                        size="sm"
                        class="formInput mt-4"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Silahkan Pilih Produk --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-col>
                    <b-col class="col-6">
                      <b-form-select
                        v-model="kategoriProduk"
                        :options="kategori"
                        size="sm"
                        class="formInput mt-4"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Silahkan Pilih Kategori --</b-form-select-option
                          >
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </template>
    </div>
  </div>
</template>
<script>
import {
  ipBackendBarang,
  ipBackend,
  ipBackendPesanan,
  ipBackendKategori,
} from "../assets/js/ipBeckEnd";
import { BIcon, BIconTriangleFill } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconTriangleFill,
  },
  data() {
    return {
      namaPemesan: "",
      alamatPemesan: "",
      noHPPemesan: "",
      NIKPemesan: "",
      tanggalPesan: "",
      komisiPesanan: "",
      masterBarangId: "",
      userId: this.$route.params.id,
      pesanan: "",
      lists: "",
      pic: "",
      ipBackend: ipBackend,
      loading: false,
      options: [],
      barang: [],
      kategoriProduk: "",
      kategoriId: "",
      kategori: [],
      listKategori: "",
      listPesanan: [],
      pesanan: "",
      pesananId: "",
    };
  },
  async created() {
    this.loading = true;
    // await this.getDataBarang();
    await this.getKategori();
    this.loading = false;
  },
  watch: {
    async kategoriProduk(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.barang = [];
        this.loading = true;
        for (let i = 0; i < this.listKategori.length; i++) {
          if (this.listKategori[i].namaKategori === this.kategoriProduk) {
            this.kategoriId = this.listKategori[i].id;
          }
        }
        await this.$axios
          .get(`${ipBackendBarang}listByKategori/${this.kategoriId}`)
          .then((res) => {
            this.listPesanan = res.data.data;
            for (let i = 0; i < this.listPesanan.length; i++) {
              this.barang.push(this.listPesanan[i].namaBarang);
            }
          });
        this.loading = false;
      }
    },
    async pesanan(newValue, oldValue) {
      if (newValue !== oldValue) {
        for (let i = 0; i < this.listPesanan.length; i++) {
          console.log(this.listPesanan[i]);
          if (this.listPesanan[i].namaBarang == this.pesanan) {
            this.pic = this.listPesanan[i].gambarBarang;
            this.tanggalPesan = this.$moment(new Date());
            this.komisiPesanan = this.listPesanan[i].komisiBarang;
            this.masterBarangId = this.listPesanan[i].masterBarangId;
            console.log(
              this.tanggalPesan,
              this.komisiPesanan,
              this.masterBarangId
            );
          }
        }
      }
    },
  },
  methods: {
    async getKategori() {
      this.loading = true;
      await this.$axios.get(`${ipBackendKategori}listAll`).then((list) => {
        this.listKategori = list.data.data;
        for (let i = 0; i < this.listKategori.length; i++) {
          this.kategori.push(this.listKategori[i].namaKategori);
        }
      });
      this.loading = false;
    },
    async getDataBarang() {
      this.loading = true;

      await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
        this.lists = list.data.data;
        for (let i = 0; i < this.lists.length; i++) {
          this.options.push(this.lists[i].namaBarang);
        }
      });
      this.loading = false;
    },
    async submit() {
      const data = {
        namaPemesan: this.namaPemesan,
        alamatPemesan: this.alamatPemesan,
        noHPPemesan: this.noHPPemesan,
        NIKPemesan: this.NIKPemesan,
        tanggalPesan: this.tanggalPesan,
        komisiPesanan: this.komisiPesanan,
        masterBarangId: this.masterBarangId,
        userId: this.userId,
      };
      if (
        this.namaPemesan !== "" &&
        this.alamatPemesan !== "" &&
        this.noHPPemesan !== "" &&
        this.NIKPemesan !== "" &&
        this.kategoriProduk !== "" &&
        this.pesanan !== ""
      ) {
        this.loading = true;
        console.log(data);
        await this.$axios
          .post(`${ipBackendPesanan}order/${this.userId}`, data)
          .then((list) => {
            this.pic="";
            this.namaPemesan = "";
            this.alamatPemesan = "";
            this.noHPPemesan = "";
            this.NIKPemesan = "";
            this.tanggalPesan = "";
            this.komisiPesanan = "";
            this.masterBarangId = "";
            this.userId = "";
            alert("terima kasih telah melakukan pesanan \nanda akan di hubungi oleh administari kami");
          });
        this.loading = false;
      } else {
        alert("Mohon lengkapi data");
      }
    },
  },
};
</script>
<style scoped>
#bg-pesanan {
  height: 135vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
.container-fluid {
  background-color: lightblue;
}
.button-pesanan {
  font-size: 4vw;
  font-weight: 600;
  border-radius: 10px;
}
.formInput {
  border-radius: 50px;
}
.button-input {
  margin-top: 24px;
}
.icontriangle {
  transform: rotate(180deg);
}
.font-weight {
  font-weight: 900;
  font-size: 20px;
}
.foto {
  width: 48vw;
  height: 40vh;
  border-radius: 10px;
}
#head-pesanan {
  width: 100vw;
  height: 25vh;
  background: white;
  padding: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;
}
#text-header {
  color: #0058f8;
  font-weight: 600;
  font-size: 4vw;
}
.circle {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #0058f8;
}
td {
  vertical-align: 0px;
}
.formPesanan {
  width: 200px;
}
.formInputLength {
  width: 500px;
}
</style>
