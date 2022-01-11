import { ipBackendKategori } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function detailsByIdKategori() {
  const detailsByIdDataKategori = async (id) => {
    try {
      await axios.get(`${ipBackendKategori}detailsById/${id}`).then((res)=>{
        dataUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {}
  };

  return {
    detailsByIdDataKategori,
  };
}
export default detailsByIdKategori;
