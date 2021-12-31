<template>
  <div class="container">
    <b-spinner v-if="loading" label="Spinning"></b-spinner>
    <b-table bordered class="text-center" :items="items" :fields="fields">
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
      <template #cell(ganti_PW)="row">
        <b-button
          v-model="status"
          size="sm"
          :per-page="perPage"
          :current-page="currentPage"
          variant="outline-primary"
          @dblclick="goTo(row)"
          class="mr-2"
        >
          <b-icon icon="pencil"></b-icon>
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
import { ipBackendUser } from "../assets/js/ipBeckEnd";
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
        { key: "no", thClass: "bg-info text-light" },
        { key: "username", sortable: false, thClass: "bg-info text-light" },
        { key: "noHp", sortable: false, thClass: "bg-info text-light" },
        { key: "jenisKelamin", sortable: false, thClass: "bg-info text-light" },
        { key: "update", thClass: "bg-info text-light" },
        { key: "delete", thClass: "bg-info text-light" },
        { key: "ganti_PW", thClass: "bg-info text-light" },
      ],
    };
  },
  async created() {
    this.loading = true;
    await this.getDataSales();
    this.loading = false;
  },
  watch: {
    async status(newValue, oldValue) {
      this.spinner = true;

      if (newValue !== oldValue) {
        await this.getDataSales();
      }
    },
  },
  methods: {
    async getDataSales() {
      this.loading = true;
      this.items = [];
      await this.$axios.get(`${ipBackendUser}listAll`).then((list) => {
        if (list.data.data.length > 0) {
          for (let i = 0; i < list.data.data.length; i++) {
            if (list.data.data[i].role == "sales") {
              this.items.push(list.data.data[i])
            }
          }
          for (let i = 0; i < this.items.length; i++) {
              this.items[i].no = i+1
            console.log(this.items[i]);
          }
        } else {
        }
        this.loading = false;
      });
    },
    async update(index) {
      console.log(index);
      const id = index.item.id;
      this.$router.push(`update/sales/${id}`);
    },
    async goTo(index) {
      console.log(index);
      const id = index.item.id;
      this.$router.push(`update/password/${id}`);
    },
    async cancel(index) {
      console.log(index);
      if (confirm("Apakah anda yakin menghapus sales ini ?") == true) {
        const id = index.item.id;
        await this.$axios
          .post(`${ipBackendUser}delete`, {
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
