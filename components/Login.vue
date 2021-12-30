<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>
          This alert will dismiss after {{ dismissCountDown }} seconds... <br />
          Username / Password salah
        </p>
        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="3px"
        ></b-progress>
      </b-alert>
      <b-card class="cardLogin">
        <p class="d-flex justify-content-center">Riteza Login</p>
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
            <b-button type="submit" v-if="loading" variant="primary" block
              >Submit</b-button
            >

            <b-button type="submit" v-else variant="primary" block
              >Submit</b-button
            >
          </form>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ipBackendUser } from "../assets/js/ipBeckEnd";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
        cek: [],
      },
      id: null,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 3,
    };
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval();

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++;
          }, 300);
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false;
          this.loadingTime = 0;
        }
      }
    },
  },
  async created() {
    this.$_loadingTimeInterval = null;
  },
  mounted() {
    this.startLoading();
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
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
      this.loading = true;
      const data = {
        username: this.form.username,
        password: this.form.password,
      };
      // this.$store
      //   .dispatch("login",data )
      const login = await this.$axios
        .post(`${ipBackendUser}login`, data)
        .then((res) => {
          console.log(res.data);
          this.loading = false;
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role", res.data.role);
            this.id = localStorage.getItem("id");
            if (this.id) {
              alert("login berhasil");
              this.loading = false;
              this.$router.push({ path: "dashboard" });
            }
          } else {
            this.loading = false;
            alert(res.data.message);
          }
        })
        .catch((error) => {
          alert("login gagal");
          this.loading = false;
          this.showAlert();
        });
      return { login };
    },
  },
};
</script>
<style scoped>
.container-fluid {
  height: 90vh;
}
.cardLogin {
  width: 50vw;
}
p {
  font-weight: 900;
  font-size: 30px;
  color: gray;
}
</style>
>
