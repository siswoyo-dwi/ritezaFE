import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function listPesananByUserId() {
  const getListPesananByUserId = ref({});
  const reslistPesananByUserId = ref("");
  const setListPesananByUserId = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendPesanan}listByUserId/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getListPesananByUserId.value = res.data.data;
          reslistPesananByUserId.value = res.data.message;
          console.log(res);

        });
    } catch (error) {}
  };

  return {
    getListPesananByUserId,
    reslistPesananByUserId,
    setListPesananByUserId,
  };
}
export default listPesananByUserId;
