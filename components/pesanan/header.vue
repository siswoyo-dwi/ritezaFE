<template>
  <div>
    <b-card id="head-pesanan">
      <div
        id="text-header"
        class="d-flex justify-content-center align-items-center"
      >
        <div class="circle mt-5"></div>
        <div class="ml-3 mt-5">Terimakasih telah mengunjungi website kami</div>
      </div>
    </b-card>
    
  </div>
</template>
<script>
import Foto from "./foto.vue";
export default {
    components:{
        Foto,
    }
}
</script>
<style scoped>
#head-pesanan {
  width: 100vw;
  height: 25vh;
  background: white;
  padding: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;
}
#text-header {
  color: #0058f8;
  font-weight: 600;
  font-size: 4vw;
}
.circle {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #0058f8;
}
</style>
