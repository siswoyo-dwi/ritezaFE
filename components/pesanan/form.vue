<template>
  <div>
    <b-row style="margin: 0"
      ><b-col class="col-6">
        <b-row class="mt-3 font-weight text-primary"
          ><b-col> <p>Nama</p> </b-col
          ><b-col> <p class="text-right">:</p> </b-col></b-row
        >
        <b-row class="mt-3 font-weight text-primary"
          ><b-col> <p>Alamat</p> </b-col
          ><b-col> <p class="text-right">:</p> </b-col></b-row
        >
        <b-row class="mt-3 font-weight text-primary"
          ><b-col> <p>NIK</p> </b-col
          ><b-col> <p class="text-right">:</p> </b-col></b-row
        >
        <b-row class="mt-3 font-weight text-primary"
          ><b-col> <p>No. Handphone</p> </b-col
          ><b-col> <p class="text-right">:</p> </b-col></b-row
        >
        <b-row class="mt-3 font-weight text-primary"
          ><b-col> <p>Pesanan</p> </b-col
          ><b-col> <p class="text-right">:</p> </b-col></b-row
        >
      </b-col>
      <b-col class="col-6">
        <b-form>
          <b-form-input
            class="formInput mt-4"
            size="sm"
            v-model="form.nama"
            required
          ></b-form-input>
          <b-form-input
            class="formInput mt-4"
            size="sm"
            v-model="form.alamat"
            required
          ></b-form-input
          ><b-form-input
            class="formInput mt-4"
            size="sm"
            v-model="form.nik"
            required
          ></b-form-input
          ><b-form-input
            class="formInput mt-4"
            size="sm"
            v-model="form.noHp"
            required
          ></b-form-input>
          <b-row style="margin: 0">
            <b-col class="col-10" style="margin: 0; padding: 0">
              <b-form-input
                class="formInput mt-4"
                size="sm"
                v-model="form.pesanan"
                required
              ></b-form-input>
            </b-col>
            <b-col class="col-2 pl-2" style="margin: 23px 0 0 0">
              <b-form-select
                v-model="form.pesanan"
                :options="options"
                size="sm"
              ></b-form-select>
            </b-col>
          </b-row>
        </b-form> </b-col
    ></b-row>
  </div>
</template>

<script>
import { BIcon, BIconTriangleFill } from "bootstrap-vue";
import { ipBackendBarang } from "../../assets/js/ipBeckEnd";

export default {
  components: {
    BIcon,
    BIconTriangleFill,
  },
  data() {
    return {
      form: {
        nama: "",
        alamat: "",
        nik: "",
        noHp: "",
        pesanan: "",
      },
      lists: "",
      options: [],
    };
  },
  async created() {
    this.loading = true;
    await this.getDataBarang();
    this.loading = false;
  },
  watch: {
    async pesanan(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log(newValue, oldValue);
      }
    },
  },
  methods: {
    async getDataBarang() {
      this.loading = true;

      await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
        //   console.log(list);
        this.lists = list.data.data;
        for (let i = 0; i < this.lists.length; i++) {
          console.log(this.lists[i].namaBarang);
          this.options.push(this.lists[i].namaBarang);
        }
      });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.formInput {
  border-radius: 50px;
}
.button-input {
  margin-top: 24px;
}
.icontriangle {
  transform: rotate(180deg);
}
.font-weight {
  font-weight: 900;
  font-size: 17px;
}
</style>
