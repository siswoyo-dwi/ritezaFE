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
              label="Password Lama:"
              label-for="input-2"
            >
              <b-form-input
                type="password"
                v-model="form.passwordLama"
                placeholder="Enter Password"
                required
                v-if="this.form.cek.length == 0"
              ></b-form-input>
              <b-form-input
                v-model="form.passwordLama"
                placeholder="Enter Password"
                required
                v-else
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              v-model="form.cek"
              label="Password Baru:"
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
              label="Konfirmasi Password Baru"
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
          <b-button type="submit" v-if="loading" disabled variant="primary" block>Submit</b-button>
          <b-button type="submit" v-else variant="primary" block>Submit</b-button>
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
        passwordLama: "",
        passwordBaru: "",
        konfirmasi: "",
        cek: [],
      },
      id: localStorage.getItem("id"),
      profil: "",
      loading: false,
    };
  },
  created() {
    this.getProfil();
  },
  methods: {
    async getProfil() {
      this.loading = true;

      await this.$axios.get(`${ipBackendUser}profil`).then((list) => {
        this.profil = list.data.data[0].username;
        console.log(this.profil);
      });
    },
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;

      if (this.form.passwordBaru === this.form.konfirmasi) {
        let data = {
          passwordBaru: this.form.passwordBaru,
          passwordLama: this.form.passwordLama,
          id: this.id,
        };
        if (data) {
          await this.$axios
            .post(`${ipBackendUser}changePassword`, data)
            .then(async () => {
              let login = {
                username: this.profil,
                password: this.form.passwordBaru,
              };
              await this.$axios
                .post(`${ipBackendUser}login`, login)
                .then((res) => {
                  console.log(res);
                  if (res.data.token) {
                    this.loading = false;

                    localStorage.setItem("token", res.data.token);
                    alert(res.data.message);

                    this.$router.push({ path: "/" });
                  }
                });
            })
            .catch((error) => {
              this.loading = false;

              console.log(error);
            });
        }
      } else {
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
