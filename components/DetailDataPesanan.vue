<template>
  <div class="container">
    <b-spinner v-if="loading"></b-spinner>
    <b-card v-else>
      <b-table stacked   :items="items" :fields="fields"> </b-table>
    </b-card>
  </div>
</template>
<script>
import { ipBackendPesanan } from "../assets/js/ipBeckEnd";
export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      items:[],
       fields: [
        { key: "namaBarang" , thClass: 'bg-info text-light'},
        { key: "namaPemesan" , thClass: 'bg-info text-light'},
        { key: "noHPPemesan" , thClass: 'bg-info text-light'},
        { key: "NIKPemesan" , thClass: 'bg-info text-light'},
        { key: "alamatPemesan" , thClass: 'bg-info text-light'},
        { key: "komisiBarang" , thClass: 'bg-info text-light'},
        { key: "statusPesanan" , thClass: 'bg-info text-light'},
        { key: "tanggalPesan" , thClass: 'bg-info text-light'},
      ],
    };
  },
  async created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.loading = true;
      await this.$axios
        .get(`${ipBackendPesanan}detailsById/${this.id}`)
        .then((res) => {
          this.items.push(res.data.data[0])
          console.log(this.items);
        this.items[0].tanggalPesan = this.$moment(res.data.data[0].tanggalPesan).format('LL')
          this.loading = false;
        });
    },
  },
};
</script>
