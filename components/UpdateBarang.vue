<template>
  <div class="container">
    <b-spinner label="Spinning" v-if="loading"></b-spinner>

    <b-form @submit="onSubmit" v-else>
      <b-form-group label="Nama Barang :">
        <b-form-input
          v-model="form.namaBarang"
          placeholder="Nama Barang"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Komisi Barang :">
        <b-form-input
          v-model="form.komisiBarang"
          placeholder="Komisi Barang"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Keterangan Barang :">
        <b-form-input
          v-model="form.keteranganBarang"
          placeholder="Keterangan Barang"
        ></b-form-input>
      </b-form-group>
      <!-- <b-form-file
        v-model="form.file1"
        :state="Boolean(form.file1)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file> -->

      <b-button class="mt-3" type="submit" variant="primary" block
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { ipBackendBarang } from "../assets/js/ipBeckEnd";

export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      form: {
        namaBarang: "",
        komisiBarang: "",
        keteranganBarang: "",
        file1: null,
        tanggal: "",
      },
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      await this.$axios
        .get(`${ipBackendBarang}detailsById/${this.id}`)
        .then((res) => {
          console.log(res);
          this.form = res.data.data[0];
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    async onSubmit(event) {
      event.preventDefault();
      let formData = new FormData();
      // formData.append("file1", this.file1);
      formData.append("namaBarang", this.form.namaBarang);
      formData.append("komisiBarang", this.form.komisiBarang);
      formData.append("keteranganBarang", this.form.keteranganBarang);
      formData.append("id", this.id);

      try {
        const data = await this.$axios
          .post(`${ipBackendBarang}update`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            alert(res.data.message);
            this.form = {
              namaBarang: "",
              komisiBarang: "",
              keteranganBarang: "",
              file1: null,
              tanggal: "",
            };
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
            alert("update gagal");
          });
      } catch (error) {}
    },
  },
};
</script>
