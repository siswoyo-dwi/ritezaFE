import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function registerUser() {
  const  getRegisterUser = ref({})
  const errRegisterUser = ref({})
  const regUser = async (data) => {
    try {
      await axios.post(`${ipBackendUser}register`,data).then((res)=>{
        getRegisterUser.value = res.data.data
        console.log(res);

      })
    } catch (error) {
      errRegisterUser.value = error
    }
  };

  return {
    errRegisterUser,
    getRegisterUser,
    regUser,
  };
}
export default registerUser;
