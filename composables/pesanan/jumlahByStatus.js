import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function jumlahPesananByStatus() {
  const getJumlahPesananByStatus = ref({});
  const resJumlahPesananByStatus = ref("");
  const setJumlahPesananByStatus = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendPesanan}jumlahByStatus/${data}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getJumlahPesananByStatus.value = res.data.data;
          resJumlahPesananByStatus.value = res.data.message;
          console.log(res);

        });
    } catch (error) {}
  };

  return {
    getJumlahPesananByStatus,
    resJumlahPesananByStatus,
    setJumlahPesananByStatus,
  };
}
export default jumlahPesananByStatus;
