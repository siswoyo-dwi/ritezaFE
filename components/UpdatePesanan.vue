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

      <b-button type="submit" block variant="primary">Submit</b-button>
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
    };
  },
  methods: {
    async onSubmit() {
      const data = {
        hargaBarang: this.hargaBarang,
        statusPesanan: this.statusPesanan,
        id: this.id,
      };
      if (data) {
        await this.$axios
          .post(`${ipBackendPesanan}update`, data)
          .then((res) => {
            this.$router.push({ path: "/dashboard" });
            alert(res.data.message);
          })
          .catch((err) => {
            console.log(err);
            alert("update  gagal");
          });
      }
    },
  },
};
</script>
