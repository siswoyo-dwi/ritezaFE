import { ipBackendKategori } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function deleteKategori() {
  const deleteDataKategori = async (data) => {
    try {
      await axios.post(`${ipBackendKategori}delete`,data).then((res)=>{
        dataUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {}
  };

  return {
    deleteDataKategori,
  };
}
export default deleteKategori;
