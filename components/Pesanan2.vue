<template>
  <div class="container-fluid" id="bg-pesanan" style="margin: 0; padding: 0">
    <div>
      <template>
        <b-row style="margin: 0; padding: 0">
          <b-col
            class="col-lg-6 col-sm-12 col-12 col-md-12 mb-5"
            style="margin: 0; padding: 0"
          >
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <b-carousel-slide
                caption="First slide"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="https://picsum.photos/1024/480/?image=52"
              ></b-carousel-slide>

              <!-- Slides with custom text -->
              <b-carousel-slide
                img-src="https://picsum.photos/1024/480/?image=54"
              >
                <h1>Hello world!</h1>
              </b-carousel-slide>

              <!-- Slides with image only -->
              <b-carousel-slide
                img-src="https://picsum.photos/1024/480/?image=58"
              ></b-carousel-slide>

              <!-- Slides with img slot -->
              <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template #img>
                  <img
                    class="d-block img-fluid w-100"
                    width="1024"
                    height="480"
                    src="https://picsum.photos/1024/480/?image=55"
                    alt="image slot"
                  />
                </template>
              </b-carousel-slide>

              <!-- Slide with blank fluid image to maintain slide aspect ratio -->
              <b-carousel-slide
                caption="Blank Image"
                img-blank
                img-alt="Blank image"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse eros felis, tincidunt a tincidunt eget, convallis
                  vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
            </b-carousel>
            <b-list-group-item variant="dark" class="text-center"
              >Terima kasih telah mengunjungi website kami</b-list-group-item
            >
          </b-col>
          <b-col
            class="col-lg-6 col-sm-12 col-12 col-md-12 mb-5"
            style="margin: 0; padding: 0"
          >
            <b-col></b-col>
            <b-col>
              <b-card>
                <b-list-group-item class="text-center headerInputPesanan"
                  >MASUKKAN PESANAN ANDA</b-list-group-item
                >
                <b-form-input
                  class="mt-4"
                  size="sm"
                  placeholder="Nama"
                  v-model="namaPemesan"
                  required
                ></b-form-input>
                <b-form-textarea
                  class="mt-4"
                  size="sm"
                  v-model="alamatPemesan"
                  placeholder="Alamat"
                  required
                ></b-form-textarea>

                <b-form-input
                  class="mt-4"
                  placeholder="NIK"
                  size="sm"
                  v-model="NIKPemesan"
                  required
                ></b-form-input>

                <b-form-input
                  class="mt-4"
                  size="sm"
                  placeholder="No. HP"
                  v-model="noHPPemesan"
                  required
                ></b-form-input>
                <b-list-group-item v-if="pesanan" class="mt-4" size="sm">
                  {{ pesanan }}</b-list-group-item
                >
                <b-form-input
                  v-else
                  class="mt-4"
                  size="sm"
                  placeholder="pemesan"
                  disabled
                ></b-form-input>

                <b-row>
                  <b-col class="col-6" v-if="kategoriProduk">
                    <b-form-select
                      v-model="pesanan"
                      :options="barang"
                      size="sm"
                      class="formInput mt-4 select"
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
                      class="formInput mt-4 select"
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
                      class="formInput mt-4 select"
                    >
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Silahkan Pilih Kategori --</b-form-select-option
                        >
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
                <b-button
                  v-if="!loading"
                  block
                  class="mt-3 button-pesanan"
                  @click="submit()"
                  >Konfirmasi</b-button
                >
                <b-button
                  v-else
                  disabled
                  block
                  class="mt-3 button-pesanan"
                  @click="submit()"
                  >Konfirmasi</b-button
                >
              </b-card>
            </b-col>
            <b-col></b-col>
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
            this.pic = "";
            this.namaPemesan = "";
            this.alamatPemesan = "";
            this.noHPPemesan = "";
            this.NIKPemesan = "";
            this.tanggalPesan = "";
            this.komisiPesanan = "";
            this.masterBarangId = "";
            this.userId = "";
            alert(
              "terima kasih telah melakukan pesanan \nanda akan di hubungi oleh administari kami"
            );
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
  height: 122vh;
  width: 98.7vw;
  padding: 0;
  margin: 0;
}
.container-fluid {
  background-color: #02284f;
  padding: 0;
  margin: 0;
}
.button-pesanan {
  font-size: 2vw;
  background-color: #5936d8;
  font-weight: 600;
  border-radius: 10px;
}
.formInput {
  border-radius: 50px;
  background-color: #02284f;
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
.headerInputPesanan {
  font-weight: 800;
  color: white;
  background-color: #5936d8;
}
::placeholder {
  font-weight: 800;
  opacity: 1;
}
.select option  {
  color: white;
  opacity: 1;
}
.select:valid {
  color: white;
  opacity: 1;
}
</style>
