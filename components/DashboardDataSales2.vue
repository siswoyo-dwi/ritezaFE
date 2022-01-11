<template>
  <div class="container">
    <b-spinner v-if="loading"></b-spinner>
    <div v-else class="d-flex justify-content-center align-items-center">
      <div>
        <b-row>
          <b-row>
            <b-col class="col-10 my-3">
              <b-form-input v-model="getGetLinkUser" id="myInput"> </b-form-input>
            </b-col>
            <b-col class="col-2 my-3">
              <b-button variant="primary" @click="copy()">Copy</b-button>
            </b-col>
          </b-row>
          <p
            style="color: blue; font-weight: 800; font-size: 30px"
            class="d-flex justify-content-center align-items-center"
          >
            DAFTAR PESANAN SALES
          </p>

          <b-table
            bordered
            :items="items"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            class="mt-5"
          >
            <template #cell(status)="row">
              <b-modal
                v-model="showAlasanPenolakan"
                variant="danger"
                dismissible
                ><p>{{ row.item.alasanPenolakan }}</p>
              </b-modal>

              <div
                size="sm"
                v-if="row.item.status == 'di tolak'"
                @click="showAlasanPenolakan = true"
                variant="outline-primary"
              >
                {{ row.item.status }}
              </div>
              <div size="sm" v-else variant="outline-primary">
                {{ row.item.status }}
              </div>
            </template>

            <template #cell(bukti)="row">
              <b-modal v-model="showBuktiTransfer" variant="danger" dismissible>
                <b-img fluid :src="`${ip}${row.item.buktiTransaksi}`"> </b-img>
                <a
                  :href="`${ip}pesanan//downloadBuktiTrf/${row.item.pesananId}`"
                  download
                >
                  <b-button class="mt-2">Download</b-button>
                </a>
              </b-modal>
              <b-button
                size="sm"
                v-if="row.item.status == 'di terima'"
                variant="outline-primary"
                @click="showBuktiTransfer = true"
                class="mr-2"
              >
                <b-icon icon="layers"></b-icon>
              </b-button>
              <b-button size="sm" v-else variant="outline-primary" class="mr-2">
                <b-icon icon="layers"></b-icon>
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ipBackendPesanan, ipBackend } from "../assets/js/ipBeckEnd";
import moment from "moment";
import "moment/locale/id";
import getLink from "../composables/user/getLink";
import listPesananByUserId from "../composables/pesanan/listByUserId";
import { BIcon, BIconChevronDoubleRight } from "bootstrap-vue";
import { ref, defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const {
      getListPesananByUserId,
      reslistPesananByUserId,
      setListPesananByUserId,
    } = listPesananByUserId();
    const { errGetLinkUser, getGetLinkUser, setGetLinkUser } = getLink();
    const showBuktiTransfer = ref(false);
    const showAlasanPenolakan = ref(false);
    const ip = ref(ipBackend);
    const pesanan = ref(null);
    const barang = ref(null);
    const id = ref(localStorage.getItem("id"));
    const perPage = ref(10);
    const currentPage = ref(1);
    const dataSales = ref("");
    const dataBarang = ref("");
    const value1 = ref(null);
    const value2 = ref(null);
    const sales = ref(null);
    const salesId = ref(null);
    const pemesan = ref(null);
    const produk = ref(null);
    const produkId = ref(null);
    const ipPesanan = ref(ipBackendPesanan);
    const fields = ref([
      { key: "no", thClass: "bg-info text-light" },
      { key: "nama", thClass: "bg-info text-light" },
      { key: "pesanan", thClass: "bg-info text-light" },
      { key: "noHP", thClass: "bg-info text-light" },
      { key: "NIK", thClass: "bg-info text-light" },
      { key: "tanggal", thClass: "bg-info text-light" },
      { key: "harga", thClass: "bg-info text-light" },
      { key: "fee", thClass: "bg-info text-light" },
      { key: "status", thClass: "bg-info text-light" },
      { key: "bukti", thClass: "bg-info text-light" },
    ]);
    const items = ref([]);
    const options1 = ref([]);
    const options2 = ref([]);
    const options3 = ref([]);
    const profil = ref("");
    const loading = ref(false);
    const fetch = async () => {
      loading.value = true;
      await setGetLinkUser().then(() => {
        const id = localStorage.getItem("id");
        setListPesananByUserId(id).then(() => {
          for (let i = 0; i < getListPesananByUserId.value.length; i++) {
            const fee =
              (getListPesananByUserId.value[i].komisiPesanan *
                getListPesananByUserId.value[i].hargaBarang) /
              100;

            options2.value.push(getListPesananByUserId.value[i].namaPemesan);
            items.value.push({
              alasanPenolakan: getListPesananByUserId.value[i].alasanPenolakan,
              buktiTransaksi: getListPesananByUserId.value[i].buktiTransaksi,
              id: getListPesananByUserId.value[i].id,
              no: i + 1,
              nama: getListPesananByUserId.value[i].namaPemesan,
              alamat: getListPesananByUserId.value[i].alamatPemesan,
              pesanan: getListPesananByUserId.value[i].namaBarang,
              pesananId: getListPesananByUserId.value[i].pesananId,
              noHP: getListPesananByUserId.value[i].noHPPemesan,
              NIK: getListPesananByUserId.value[i].NIKPemesan,
              tanggal: moment(
                getListPesananByUserId.value[i].tanggalPesan
              ).format("l"),
              fee: `${
                getListPesananByUserId.value[i].komisiPesanan
              }% | Rp ${new Intl.NumberFormat(["ban", "id"]).format(fee)}`,
              harga: `Rp ${new Intl.NumberFormat(["ban", "id"]).format(
                getListPesananByUserId.value[i].hargaBarang
              )}`,
              status: getListPesananByUserId.value[i].statusPesanan,
            });
            if (getListPesananByUserId.value[i].statusPesanan == 0) {
              items.value[i].status = "di proses";
            } else if (getListPesananByUserId.value[i].statusPesanan == 1) {
              items.value[i].status = "di terima";
            } else {
              items.value[i].status = "di tolak";
            }
          }
        });
      });
      loading.value = false;
    };
    const copy = () => {
      /* Get the text field */
      const copyText = document.getElementById("myInput");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value);

      /* Alert the copied text */
      alert("Copied");
    };
    fetch();
    return {
      showBuktiTransfer,
      showAlasanPenolakan,
      ip,
      ipPesanan,
      pesanan,
      barang,
      id,
      perPage,
      currentPage,
      dataSales,
      dataBarang,
      value1,
      value2,
      sales,
      salesId,
      pemesan,
      produk,
      produkId,
      fields,
      items,
      options1,
      options2,
      options3,
      profil,
      loading,
      copy,
      getListPesananByUserId,
      reslistPesananByUserId,
      setListPesananByUserId,
      errGetLinkUser,
      getGetLinkUser,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  components: {
    BIcon,
    BIconChevronDoubleRight,
  },
});
</script>
<style scoped>
.navbarLayoutDefault {
  text-decoration: none;
  color: white;
}
.button {
  margin-top: 32px;
}
</style>
