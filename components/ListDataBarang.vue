<template>
  <div class="container">
    <b-spinner v-if="loading" label="Spinning"></b-spinner>
    <b-table
      bordered
      class="text-center"
      :per-page="perPage"
      :current-page="currentPage"
      :items="items"
      :fields="fields"
    >
      <template #cell(update)="row">
        <b-button
          size="sm"
          v-model="status"
          variant="outline-primary"
          @dblclick="update(row)"
          class="mr-2"
        >
          <b-icon icon="pencil"></b-icon>
        </b-button>
      </template>
      <template #cell(delete)="row">
        <b-button
          v-model="status"
          size="sm"
          :per-page="perPage"
          :current-page="currentPage"
          variant="outline-primary"
          @dblclick="cancel(row)"
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
import { ipBackendBarang } from "../assets/js/ipBeckEnd";
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
      perPage: 10,
      currentPage: 1,
      status: 0,
      items: [],
      loading: false,
      fields: [
        { key: "nomor", thClass: "bg-info text-light" },
        { key: "namaBarang", sortable: true, thClass: "bg-info text-light" },
        {
          key: "keteranganBarang",
          sortable: true,
          thClass: "bg-info text-light",
        },
        { key: "komisiBarang", sortable: true, thClass: "bg-info text-light" },
        { key: "update", thClass: "bg-info text-light" },
        { key: "delete", thClass: "bg-info text-light" },
      ],
    };
  },
  async created() {
    this.loading = true;
    await this.getDataBarang();
    this.loading = false;
  },
  watch: {
    async status(newValue, oldValue) {
      this.spinner = true;

      if (newValue !== oldValue) {
        await this.getDataBarang();
      }
    },
  },
  methods: {
    async getDataBarang() {
      this.loading = true;

      await this.$axios.get(`${ipBackendBarang}listAll`).then((list) => {
        if (list.data.data.length > 0) {
          this.items = list.data.data;
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].nomor = i + 1;
          }
        }

        this.loading = false;
      });
    },
    async update(index) {
      console.log(index);
      const id = index.item.masterBarangId;
      this.$router.push({ path: `update/barang/${id}` });
    },
    async cancel(index) {
      if (confirm("Apakah anda yakin menghapus barang ini ?") == true) {
        const id = index.item.id;
        await this.$axios
          .post(`${ipBackendBarang}delete`, {
            id: id,
          })
          .then((res) => {
            console.log(res.data.message);
            if (this.status == 0) {
              this.status = 1;
            } else {
              this.status = 0;
            }
          })
          .catch((err) => {
            console.log(err.data.message);
          });
      }
    },
  },
};
</script>
