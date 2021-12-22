<template>
  <div class="container-fluid" id="bg-pesanan">
    <div>
      <Head />
    </div>
    <div>
      <template>
        <b-col class="col-6">
            <Foto class="mt-3"/>
            <b-button variant="primary" block class="mt-3 button-pesanan">Pesan Sekarang</b-button>
        </b-col>
      </template>
    </div>
  </div>
</template>
<script>
import Head from "../components/pesanan/header.vue";
import Foto from "../components/pesanan/foto.vue";
export default {
  components: {
    Head,
    Foto,
  },
};
</script>
<style scoped>
#bg-pesanan {
  background: #9abffa;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
.button-pesanan{
    font-size: 4vw;
    font-weight: 600;
    border-radius: 10px;
}
</style>
