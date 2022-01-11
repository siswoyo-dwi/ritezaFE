import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function detailsPesananById() {
  const getDetailsPesananById = ref({});
  const resDetailsPesananById = ref("");
  const setDetailsPesananById = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendPesanan}jumlahByStatus/${data}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getDetailsPesananById.value = res.data.data;
          resDetailsPesananById.value = res.data.message;
          console.log(res);

        });
    } catch (error) {}
  };

  return {
    getDetailsPesananById,
    resDetailsPesananById,
    setDetailsPesananById,
  };
}
export default detailsPesananById;
