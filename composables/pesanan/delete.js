import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function deletePesanan() {
  const getDeletePesanan = ref({});
  const resDeletePesanan = ref("");
  const setDeletePesanan = async (data) => {
    const token = localStorage.getItem("token");

    try {
      await axios
        .post(`${ipBackendPesanan}delete`, data, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getDeletePesanan.value = res.data.data;
          resDeletePesanan.value = res.data.message;
          console.log(res);
        });
    } catch (error) {}
  };

  return {
    getDeletePesanan,
    resDeletePesanan,
    setDeletePesanan,
  };
}
export default deletePesanan;
