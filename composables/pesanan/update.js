import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function updatePesanan() {
  const getUpdatePesanan = ref({});
  const resUpdatePesanan = ref("");
  const setUpdatePesanan = async (data) => {
    const token = localStorage.getItem("token");

    try {
      await axios
        .post(`${ipBackendPesanan}update`, data, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getUpdatePesanan.value = res.data.data;
          resUpdatePesanan.value = res.data.message;
          console.log(res);
        });
    } catch (error) {}
  };

  return {
    getUpdatePesanan,
    resUpdatePesanan,
    setUpdatePesanan,
  };
}
export default updatePesanan;
