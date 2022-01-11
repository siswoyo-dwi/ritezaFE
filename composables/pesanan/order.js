import { ipBackendPesanan } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function orderPesanan() {
  const getOrderPesanan = ref({});
  const resOrderPesanan = ref("");
  const setOrderPesanan = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendPesanan}order/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getOrderPesanan.value = res.data.data;
          resOrderPesanan.value = res.data.message;
          console.log(res);

        });
    } catch (error) {}
  };

  return {
    getOrderPesanan,
    resOrderPesanan,
    setOrderPesanan,
  };
}
export default orderPesanan;
