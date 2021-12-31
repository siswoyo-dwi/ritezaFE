<template>
  <div class="container mt-5">
    <b-form @submit="onSubmit()">
      <b-form-input v-model="namaKategori"> </b-form-input>
      <b-button
        type="submit"
        v-if="loading"
        disable
        variant="primary"
        class="mt-3"
        >Submit</b-button
      >
      <b-button type="submit" v-else variant="primary" class="mt-3"
        >Submit</b-button
      >
    </b-form>
    <b-table
      bordered
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      class="mt-5"
    >
      <template #cell(delete)="row">
        <b-button
          size="sm"
          @click="cancel(row)"
          variant="outline-primary"
          class="mr-2"
        >
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>
<script>
import { ipBackendKategori } from "../assets/js/ipBeckEnd";
import { BIcon, BIconPencil, BIconTrash } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconPencil,
    BIconTrash,
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      status: 0,
      namaKategori: "",
      loading: false,
      items: [],
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "no", thClass: "bg-info text-light" },
        { key: "namaKategori", thClass: "bg-info text-light" },
        { key: "delete", thClass: "bg-info text-light" },
      ],
    };
  },
  created() {
    this.getKategori();
  },
  watch: {
    async status(newValue, oldValue) {
      this.spinner = true;

      if (newValue !== oldValue) {
        await this.getKategori();
      }
    },
  },
  methods: {
    async cancel(index) {
      console.log(index);
      if (confirm("Apakah anda yakin menghapus kategori ini ?") == true) {
        const id = index.item.id;
        await this.$axios
          .post(`${ipBackendKategori}delete`, {
            id: id,
          })
          .then((res) => {
                        console.log(this.status);

            if (this.status == 0) {
              this.status = 1;
            } else {
              this.status = 0;
            }
            console.log(this.status);
            alert(res.data.message);
            
          })
          .catch((err) => {
            alert(err);
              if (this.status == 0) {
              this.status = 1;
            } else {
              this.status = 0;
            }
          });
      }
    },
    async getKategori() {
      this.loading = true;
      this.items = []
      await this.$axios.get(`${ipBackendKategori}listAll`).then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.items.push({
            namaKategori: res.data.data[i].namaKategori,
            no: i + 1,
            id: res.data.data[i].id,
          });
        }
        this.loading = false;
      });
    },
    async onSubmit() {
      this.loading = true;
      await this.$axios
        .post(`${ipBackendKategori}register`, {
          namaKategori: this.namaKategori,
        })
        .then((res) => {
          if (this.status == 0) {
            this.status = 1;
          } else {
            this.status = 0;
          }
          this.namaKategori = "";
          this.loading = false;

          alert(res.data.message);
          this.$router.push("/dashboard");
        });
    },
  },
};
</script>
