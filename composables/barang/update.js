import { ipBackendBarang } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function updateMasterBarang() {
  const upDataMasterBarang = ref({});

  const regMasterBarang = async (data) => {
    try {
      await axios.post(`${ipBackendBarang}update`, data).then((res) => {
        upDataMasterBarang.value = res.data.data;
        console.log(res);
      });
    } catch (error) {}
  };

  return {
    upDataMasterBarang,
    regMasterBarang,
  };
}
export default updateMasterBarang;
