import { ipBackendBarang } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function registerMasterBarang() {
  const regMasterBarang = async (data) => {
    try {
      await axios.post(`${ipBackendBarang}register`,data).then((res)=>{
        dataUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {}
  };

  return {
    regMasterBarang,
  };
}
export default registerMasterBarang;
