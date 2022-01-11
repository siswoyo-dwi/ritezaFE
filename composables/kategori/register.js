import { ipBackendKategori } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function register() {
  const regUser = async (data) => {
    try {
      await axios.post(`${ipBackendKategori}register`,data).then((res)=>{
        dataUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {}
  };

  return {
    regUser,
  };
}
export default register;
