<script>
// import { ipBackendPesanan } from "../assets/js/ipBeckEnd";
// export default {
//   data() {
//     return {
//       keterangan: [
//         { text: "Diterima", value: 1 },
//         { text: "ditolak", value: 2 },
//       ],
//       id: this.$route.params.id,
//       hargaBarang: null,
//       statusPesanan: "",
//     };
//   },
//   methods: {
//     async onSubmit() {
//       let data = {
//         hargaBarang: this.hargaBarang,
//         statusPesanan: this.statusPesanan,
//         id: this.id,
//       };
//       await this.$axios
//         .post(`${ipBackendPesanan}update`, data)
//         .then((res) => {
//           this.$router.push("/dashboard");
//           alert(res.data.message);
//         })
//         .catch((error) => {
//           this.errors = error.response.data.errors;
//         });
//     },
//     async cek() {
//       const data = {
//         hargaBarang: this.hargaBarang,
//         statusPesanan: this.statusPesanan,
//         id: this.id,
//       };
//       if (data) {
//         await this.$axios
//           .post(`${ipBackendPesanan}update`, data)
//           .then((res) => {
//             alert(res.data.message);
//           })
//           .catch((err) => {
//             console.log(err);
//             alert("update  gagal");
//           });
//       }
//     },
//   },
// };
</script>
<template>
  <div class="container my-5">
    <div v-if="loading">
      <div class="d-flex align-items-center mb-3">
        <b-progress class="w-100" :max="maxLoadingTime" height="1.5rem">
          <b-progress-bar
            :value="loadingTime"
            :label="`${((loadingTime / maxLoadingTime) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>

        <b-button class="ml-3" @click="startLoading()">Reload</b-button>
      </div>

      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <b-skeleton width="85%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton width="70%"></b-skeleton>
          </b-card>
        </template>
      </b-skeleton-wrapper>
    </div>
    <div class="row d-flex justify-content-center align-items-center" v-else>
      <div class="col-md-6">
        <b-form @submit="onSubmit">
          <b-form-group label="Harga Barang">
            <b-form-input
              v-model="hargaBarang"
              type="number"
              placeholder="Harga Barang"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="statusPesanan">
            <b-form-select
              v-model="statusPesanan"
              placeholder="Status Pesanan"
              :options="keterangan"
              required
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
          <b-button type="submit" block variant="primary">Submit</b-button>
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

      loading: false,
      keterangan: [
        { text: "Diterima", value: 1 },
        { text: "ditolak", value: 2 },
      ],
      id: this.$route.params.id,
      hargaBarang: null,
      statusPesanan: "",
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
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval);
      this.$_loadingTimeInterval = null;
    },
    startLoading() {
      this.loading = true;
      this.loadingTime = 0;
    },

    async onSubmit(event) {
      event.preventDefault();

      const data = {
        hargaBarang: this.hargaBarang,
        statusPesanan: this.statusPesanan,
        id: this.id,
      };
      try {
        await this.$axios
          .post(`${ipBackendPesanan}update`, data)
          .then((res) => {
            alert(res.data.message);
            this.$router.push({ path: "/dashboard" });
          })
          .catch((error) => {
            console.log(error);
            alert("update gagal");
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
