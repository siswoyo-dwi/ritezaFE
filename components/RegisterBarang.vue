<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Nama Barang :">
        <b-form-input
          v-model="form.namaBarang"
          placeholder="Nama Barang"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="kategori Barang :">
        <b-form-select
          v-model="kategoriId"
          :options="kategoriBarang"
          size="sm"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Komisi Barang :">
        <b-form-input
          v-model="form.komisiBarang"
          placeholder="Komisi Barang"
          description="**dalam %"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Keterangan Barang :">
        <b-form-input
          v-model="form.keteranganBarang"
          placeholder="Keterangan Barang"
        ></b-form-input>
      </b-form-group>
      <b-button
        class="mt-3"
        v-if="loading"
        type="submit"
        variant="primary"
        block
        >Submit</b-button
      >
      <b-button class="mt-3" v-else type="submit" variant="primary" block
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { ipBackendBarang, ipBackendKategori } from "../assets/js/ipBeckEnd";

export default {
  data() {
    return {
      form: {
        namaBarang: "",
        komisiBarang: "",
        kategoriBarangId: "",
        keteranganBarang: "",
        file1: null,
        tanggal: "",
      },
      loading: false,
      kategoriBarang: [],
      kategori: [],
      kategoriId: "",
    };
  },
  async created() {
    this.loading = true;
    await this.getKategoriBarang();
    this.loading = false;
  },

  watch: {
    kategoriId(newValue, oldValue) {
      if (newValue !== oldValue) {
        for (let i = 0; i < this.kategori.length; i++) {
          if (this.kategoriId == this.kategori[i].namaKategori) {
            this.form.kategoriBarangId = this.kategori[i].id;
          }
        }
      }
    },
  },
  methods: {
    async getKategoriBarang() {
      await this.$axios.get(`${ipBackendKategori}listAll`).then((list) => {
        this.kategori = list.data.data;
        for (let i = 0; i < list.data.data.length; i++) {
          this.kategoriBarang.push(list.data.data[i].namaKategori);
        }
      });
    },
    async upload(event) {
      this.form.file1 = await this.$refs.file.files[0];
    },
    async onSubmit(event) {
      event.preventDefault();
      if (
        this.form.kategoriBarangId != "" &&
        this.form.namaBarang != "" &&
        this.form.komisiBarang != "" &&
        this.form.keteranganBarang != ""
      ) {
        this.loading = true;
        let formData = new FormData();
        formData.append("file1", this.form.file1);
        formData.append("kategoriBarangId", this.form.kategoriBarangId);
        formData.append("namaBarang", this.form.namaBarang);
        formData.append("komisiBarang", this.form.komisiBarang);
        formData.append("keteranganBarang", this.form.keteranganBarang);
        try {
          await this.$axios
            .post(`${ipBackendBarang}register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res);
              this.form.file1 = "";
              this.form.kategoriBarangId = "";
              this.form.namaBarang = "";
              this.form.komisiBarang = "";
              this.form.keteranganBarang = "";
              alert(res.data.message);
              this.loading = false;

              this.$router.push("/dashboard");
            })
            .catch((err) => {
              this.loading = false;

             alert(err.data.message);
            });
        } catch (error) {
          this.loading = false;
        }
      }else{
        alert('mohon lengkapi data')
      }
    },
  },
};
</script>
