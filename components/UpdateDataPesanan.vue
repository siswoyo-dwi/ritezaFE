<template>
  <div class="container my-5">
    <b-spinner v-if="loading"></b-spinner>
    <div class="row d-flex justify-content-center align-items-center" v-else>
      <div class="col-md-6">
        <b-form @submit="onSubmit">
          <b-form-group v-if="statusPesanan !== 2" label="Harga Barang">
            <b-form-input
              v-model="hargaBarang"
              type="number"
              placeholder="Harga Barang"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Status Pesanan">
            <b-form-select
              v-model="statusPesanan"
              placeholder="Status Pesanan"
              :options="keterangan"
              required
            >
              <template #first>
                <b-form-select-option :value="0" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group v-if="statusPesanan == 2" label="Alasan penolakan :">
            <b-form-input
              v-model="alasanPenolakan"
              placeholder="Alasan Penolakan"
            ></b-form-input>
          </b-form-group>
          <b-form-group v-if="statusPesanan == 1" label="Bukti transfer">
            <b-form-file
              type="file"
              class="mt-5"
              enctype="multipart/form-data"
              @change="upload($event)"
              ref="file"
              :state="Boolean(file)"
              v-model="file"
              placeholder:none
            >
            </b-form-file>
          </b-form-group>

          <b-button
            type="submit"
            v-if="loading"
            disabled
            block
            variant="primary"
            >Submit</b-button
          >

          <b-button type="submit" v-else block variant="primary"
            >Submit</b-button
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipBackendPesanan } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      maxLoadingTime: 3,
      loadingTime: 0,
      pesananBaru: 0,
      loading: false,
      file: null,
      keterangan: [
        { text: "Diterima", value: 1 },
        { text: "ditolak", value: 2 },
      ],
      id: this.$route.params.id,
      hargaBarang: null,
      statusPesanan: "",
      alasanPenolakan: "",
    };
  },

  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval();

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++;
          }, 0);
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false;
        }
      }
    },
  },
  created() {
    this.$_loadingTimeInterval = null;
  },

  mounted() {
    this.startLoading();
  },

  methods: {
    async upload(event) {
      this.file = await this.$refs.file.files[0];
    },
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval);
      this.$_loadingTimeInterval = null;
    },
    startLoading() {
      this.loading = true;
      this.loadingTime = 0;
    },
    async getPesananBaru() {
      await this.$axios
        .get(`${ipBackendPesanan}jumlahByStatus/0`)
        .then((res) => {
          this.pesananBaru = res.data.data[0].count;
        });
    },
    async onSubmit(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("file1", this.file);
      const data = {
        hargaBarang: this.hargaBarang,
        statusPesanan: this.statusPesanan,
        id: this.id,
        alasanPenolakan: this.alasanPenolakan,
      };
      try {
        console.log(data);
        await this.$axios
          .post(`${ipBackendPesanan}update`, data)
        await this.$axios
          .post(`${ipBackendPesanan}update`, formData)
          .then(async (res) => {
            this.$router.push({ path: "/dashboard" });
            await this.getPesananBaru();
            this.$nuxt.$emit("eventName", this.pesananBaru);
            alert(res.data.message);
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            alert(err);
          });
      } catch (error) {
        alert(error);
      }
    },
    change() {
      if (this.showNameBox == false) {
        this.showNameBox = true;
      } else {
        this.showNameBox = false;
      }
    },
  },
};
</script>

<style></style>
