<template>
  <div class="container mt-5">
    <b-form @submit="onSubmit()">
      <b-form-input v-model="namaKategori"> </b-form-input>
      <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import { ipBackendKategori } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      namaKategori: "",
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.namaKategori);
      await this.$axios
        .post(`${ipBackendKategori}register`, {
          namaKategori: this.namaKategori,
        })
        .then((res) => {
          this.namaKategori = "";
          alert(res.data.message);
          this.$router.push("/dashboard");
        });
    },
  },
};
</script>
