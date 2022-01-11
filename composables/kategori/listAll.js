import { ipBackendKategori } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function listAllKategori() {
  const listAllDataKategori = async () => {
    try {
      await axios.get(`${ipBackendKategori}listAll`).then((res)=>{
        dataUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {}
  };

  return {
    listAllDataKategori,
  };
}
export default listAllKategori;
