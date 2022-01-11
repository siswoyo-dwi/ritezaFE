<template>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="row">
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
                  v-model="username"
                  placeholder="Enter username"
                  maxlength="16"
                  required
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="my-3">
              <b-form-group
                id="input-group-2"
                label="Your Password:"
                label-for="input-2"
              >
                <b-form-input
                  type="password"
                  v-model="password"
                  placeholder="Enter Password"
                  required
                  v-if="cek == 0"
                ></b-form-input>
                <b-form-input
                  v-model="password"
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
                v-model="cek"
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
import { defineComponent, ref } from "@nuxtjs/composition-api";
// import { ipBackendUser } from "../assets/js/ipBeckEnd";
// import axios from "axios";
import login from "../composables/user/login";

export default defineComponent({
  setup() {
    const { errLoginUser, getLoginUser, setLoginUser } = login();
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const cek = ref(0);

    const cekStatus = () => {
      cek.value = cek.value + 1;
    };
    const onSubmit = async () => {
      loading.value = true;
      const data = {
        username: username.value,
        password: password.value,
      };
      await setLoginUser(data);
      try {
        loading.value = false;
        alert(getLoginUser.value);
      } catch (error) {
        alert(errLoginUser);
        loading.value = false;
      }
      loading.value = false;
    };
    return {
      username,
      password,
      cek,
      loading,
      cekStatus,
      onSubmit,
      errLoginUser,
      getLoginUser,
    };
  },
});
</script>
