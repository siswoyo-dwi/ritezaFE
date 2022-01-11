import { ipBackendBarang } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function deleteMasterBarang() {
  const getDeleteMasterBarang = ref("");
  const errDeleteMasterBarang = ref("");

  const delMasterBarang = async (data) => {
    try {
      await axios.post(`${ipBackendBarang}delete`, data).then((res) => {
        getDeleteMasterBarang.value = res.data.data;
        console.log(res);
      });
    } catch (error) {
      errDeleteMasterBarang.value = error;
    }
  };

  return {
    getDeleteMasterBarang,
    errDeleteMasterBarang,
    delMasterBarang,
  };
}
export default deleteMasterBarang;
