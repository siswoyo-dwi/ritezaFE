<template>
  <div class="container mt-5">
    <b-form @submit="onSubmit()">
      <b-form-input v-model="namaKategori"> </b-form-input>
      <b-button
        type="submit"
        v-if="loading"
        disable
        variant="primary"
        class="mt-3"
        >Submit</b-button
      >
      <b-button type="submit" v-else variant="primary" class="mt-3"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { ipBackendKategori } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      namaKategori: "",
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      await this.$axios
        .post(`${ipBackendKategori}register`, {
          namaKategori: this.namaKategori,
        })
        .then((res) => {
          this.namaKategori = "";
          this.loading = false;

          alert(res.data.message);
          this.$router.push("/dashboard");
        });
    },
  },
};
</script>
