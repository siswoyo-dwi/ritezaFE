<template>
  <b-card class="cardLogin">
    <p class="d-flex justify-content-center">Riteza Register</p>
    <div @submit="onSubmit">
      <form>
        <div class="my-3">
          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              v-model="form.username"
              placeholder="Enter username"
              maxlength="16"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="my-3">
          <b-form-group
            id="input-group-2"
            v-model="form.cek"
            label="Your Password:"
            label-for="input-2"
          >
            <b-form-input
              type="password"
              v-model="form.password"
              placeholder="Enter Password"
              required
              v-if="this.form.cek.length == 0"
            ></b-form-input>
            <b-form-input
              v-model="form.password"
              placeholder="Enter Password"
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
        <b-button type="submit" v-if="loading" disabled variant="primary" block
          >Submit</b-button
        >
        <b-button type="submit" v-else variant="primary" block>Submit</b-button>
      </form>
    </div>
  </b-card>
</template>
<script>
import { ipBackendUser } from "../../assets/js/ipBeckEnd";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        cek: [],
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.form.username !== "" && this.form.password !== "") {
        this.loading = true;
        let data = {
          username: this.form.username,
          password: this.form.password,
          role: "sales",
        };
        await this.$axios
          .post(`${ipBackendUser}register`, data)
          .then((res) => {
            alert(res.data.message);
            this.loading = false;

            this.$router.push("/dashboard");
          })
          .catch((error) => {
            this.loading = false;

            this.errors = error.response.data.errors;
          });
      } else {
        alert("mohon lengkapi data");
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
