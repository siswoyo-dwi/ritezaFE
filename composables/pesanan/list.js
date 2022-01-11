import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function listPesanan() {
  const getListPesanan = ref({});
  const resListPesanan = ref("");
  const setListPesanan = async (data) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    try {
      await axios
        .post(`${ipBackendPesanan}list`,data, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getListPesanan.value = res.data.data;
          resListPesanan.value = res.data.message;
          console.log(res);

        });
    } catch (error) {}
  };

  return {
    getListPesanan,
    resListPesanan,
    setListPesanan,
  };
}
export default listPesanan;
