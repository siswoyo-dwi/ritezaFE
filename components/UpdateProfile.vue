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
          <b-form-group label="Alamat :">
            <b-form-input
              id="form-alamat"
              label="alamat"
              laber-for="input-alamat"
              v-model="form.alamat"
              placeholder="Input alamat"
              class="mb-2"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="No Hp :">
            <b-form-input
              id="form-noHp"
              label="noHp"
              laber-for="input-noHp"
              v-model="form.noHp"
              type="number"
              placeholder="Input nomor HP"
              class="mb-2"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" v-if="loading" variant="primary" block
            >Submit</b-button
          >

          <b-button type="submit" v-else variant="primary" block
            >Submit</b-button
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipBackendUser } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      form: {
        nama: "",
        nomorKTP: "",
        alamat: "",
        noHp: "",
        jenisKelamin: "",
      },
      id: "",
      images: "",
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 3,
      file: null,
      spinner: false,
      showNameBox: false,
      options: [
        { value: "", text: "silahkan pilih" },
        { value: "Laki-laki", text: "Laki-laki" },
        { value: "Perempuan", text: "Perempuan" },
      ],
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
  async created() {
    this.loading = true;
    this.$_loadingTimeInterval = null;
    this.id = localStorage.getItem("id");
    await this.getProfile();
    this.loading = false;
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

    async getProfile() {
      this.loading = true;
      await this.$axios.get(`${ipBackendUser}profil`).then((res) => {
        this.form = res.data.data[0];
        console.log(this.form);
        this.loading = false;
      });
    },

    async onSubmit(event) {
      event.preventDefault();

      const data = {
        nama: this.form.nama,
        nomorKTP: this.form.nomorKTP,
        noHp: this.form.noHp,
        alamat: this.form.alamat,
        jenisKelamin: this.form.jenisKelamin,
        id: this.id,
      };
      try {
        await this.$axios
          .post(`${ipBackendUser}update`, data)
          .then((res) => {
            alert(res.data.message);
            this.$router.push({ path: "/" });
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
