<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <b-card class="cardLogin">
      <p class="d-flex justify-content-center">Riteza change password</p>
      <div @submit="onSubmit">
        <form>
          <div class="my-3">
            <b-form-group
              id="input-group-2"
              v-model="form.cek"
              label="Your Password:"
              label-for="input-2"
            >
              <b-form-input
                type="password"
                v-model="form.passwordBaru"
                placeholder="Enter Password"
                required
                v-if="this.form.cek.length == 0"
              ></b-form-input>
              <b-form-input
                v-model="form.passwordBaru"
                placeholder="Enter Password"
                required
                v-else
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              v-model="form.cek"
              label="Your Password:"
              label-for="input-2"
            >
              <b-form-input
                type="password"
                v-model="form.konfirmasi"
                placeholder="konfirmasi password"
                required
                v-if="this.form.cek.length == 0"
              ></b-form-input>
              <b-form-input
                v-model="form.konfirmasi"
                placeholder="konfirmasi password"
                required
                v-else
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="my-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="form.cek"
              value="yes"
              id="check"
            />
            <label class="form-check-label" for="exampleCheck1"
              >show password</label
            >
          </div>
          <b-button
            type="submit"
            v-if="loading"
            disabled
            variant="primary"
            block
            >Submit</b-button
          >
          <b-button type="submit" v-else variant="primary" block
            >Submit</b-button
          >
        </form>
      </div>
    </b-card>
  </div>
</template>
<script>
import { ipBackendUser } from "../assets/js/ipBeckEnd";

export default {
  data() {
    return {
      form: {
        passwordBaru: "",
        konfirmasi: "",
        cek: [],
      },
      id: this.$route.params.id,
      loading: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      if (this.form.passwordBaru === this.form.konfirmasi) {
        let data = {
          passwordBaru: this.form.passwordBaru,
          id: this.id,
        };
        await this.$axios
          .post(`${ipBackendUser}changePasswordByAdmin`, data)
          .then((res) => {
            this.loading = false;
            this.$router.push("/dashboard");
            alert(res.data.message);
          })
          .catch((error) => {
            this.loading = false;

            this.errors = error.response.data.errors;
          });
      } else {
        this.loading = false;

        alert("password baru belum sesuai");
      }
    },
  },
};
</script>
<style>
.cardLogin {
  width: 50vw;
}
.cardLogin p {
  font-size: 30px;
  font-weight: 900;
  color: gray;
}
</style>
