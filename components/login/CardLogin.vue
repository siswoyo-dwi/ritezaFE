<template>
 
</template>
<script>

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        cek: [],
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        username: this.form.username,
        password: this.form.password,
      };
      const login = await axios
        .post(`${ipBackendUser}/login`, data)
        .then((res) => {
          this.loading = false;
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }

          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.showAlert();
        });
      return { login };
    },
  },
};
</script>
<style>
.cardLogin {
  width: 50vw;
}

</style>
