import { ipBackendKategori } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function updateKategori() {
  const upDataKategori = ref({});

  const updateDataKategori = async (data) => {
    try {
      await axios.post(`${ipBackendKategori}update`, data).then((res) => {
        upDataKategori.value = res.data.data;
        console.log(res);
      });
    } catch (error) {}
  };

  return {
    upDataKategori,
    updateDataKategori,
  };
}
export default updateKategori;
