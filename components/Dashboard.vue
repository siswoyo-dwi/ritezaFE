<template>
  <div class="container-fluid">
    <b-spinner
      class="container-fluid d-flex justify-content-center align-items-center"
      v-if="loading"
      label="Loading..."
    ></b-spinner>
    <div v-else>
      <p class="pl-5">DASHBOARD</p>
      <hr />
      <div>
        <b-row>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col>
              <b-card bg-variant="info" text-variant="white" title="Sales">
                <b-card-text> Jumlah sales {{ sales }}</b-card-text>
                <b-card-text
                  >List Sales <b-icon icon="chevron-double-right"></b-icon
                ></b-card-text>
              </b-card>
            </b-col>
          </div>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col
              ><b-card bg-variant="info" text-variant="white" title="Kategori">
                <b-card-text> Total Kategori {{ sales }}</b-card-text>
                <b-card-text
                  >List Kategori <b-icon icon="chevron-double-right"></b-icon
                ></b-card-text>
              </b-card>
            </b-col>
          </div>
          <div class="col-lg-4 col-md-6 my-3 col-sm-12">
            <b-col
              ><b-card
                bg-variant="info"
                text-variant="white"
                title="Sub Kategori"
              >
                <b-card-text> Total Sub Kategori {{ sales }}</b-card-text>
                <b-card-text
                  >List Sub Kategori
                  <b-icon icon="chevron-double-right"></b-icon>
                </b-card-text>
              </b-card>
            </b-col>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ipBackendUser } from "../assets/js/ipBeckEnd";
import { BIcon, BIconChevronDoubleRight } from "bootstrap-vue";
export default {
  data() {
    return {
      loading: false,
      sales: null,
    };
  },
  components: {
    BIcon,
    BIconChevronDoubleRight,
  },

  async created() {
    this.id = localStorage.getItem("id");
    this.loading = true;
    if (this.id) {
      await this.$axios.get(`${ipBackendUser}listAll`).then((list) => {
        if (list.data.message !== "anda belum login") {
          this.sales = list.data.data.length;
          this.loading = false;
        } else {
          this.$router.push({ path: "/" });
        }
      });
    }
  },
};
</script>
<style scoped></style>
