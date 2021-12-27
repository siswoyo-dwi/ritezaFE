<template>
  <div class="container">
    <b-form @submit="onSubmit()" class="mt-5">
      <b-row>
        <b-col>
          <b-form-group label="Harga Barang">
            <b-form-input
              v-model="hargaBarang"
              type="number"
              placeholder="Harga Barang"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="statusPesanan">
            <b-form-select
              v-model="statusPesanan"
              placeholder="Status Pesanan"
              :options="keterangan"
              required
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" v-if="loading" disabled block variant="primary"
        >Submit</b-button
      >

      <b-button
        type="submit"
        @click="$nuxt.$emit('eventName', pesananBaru)"
        v-else
        block
        variant="primary"
      >
        <!-- Submit -->
        <div>Submit</div>
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { ipBackendPesanan } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      keterangan: [
        { text: "Diterima", value: 1 },
        { text: "ditolak", value: 2 },
      ],
      id: this.$route.params.id,
      hargaBarang: null,
      statusPesanan: "",
      loading: false,
      pesananBaru: 0,
    };
  },
  methods: {
    async getPesananBaru() {
      await this.$axios
        .get(`${ipBackendPesanan}jumlahByStatus/0`)
        .then((res) => {
          this.pesananBaru = res.data.data[0].count;
        });
    },
    async onSubmit() {
      this.loading = true;
      const data = {
        hargaBarang: this.hargaBarang,
        statusPesanan: this.statusPesanan,
        id: this.id,
      };
      if (data) {
        await this.$axios
          .post(`${ipBackendPesanan}update`, data)
          .then(async(res) => {
            console.log('222');
            this.$router.push({ path: "/dashboard" });
            await this.getPesananBaru();
            this.$nuxt.$emit("eventName", this.pesananBaru);
            console.log(this.pesananBaru,'hai');
            alert(res.data.message);
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            alert(err.data.message);
          });
      }
    },
  },
};
</script>
