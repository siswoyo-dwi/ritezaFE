import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function loginUser() {
  const getLoginUser = ref("");
  const errLoginUser = ref("");

  const setLoginUser = async (data) => {
  const res =   await axios.post(`${ipBackendUser}login`, data)
  
    try {
      getLoginUser.value = res.data.message;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("role", res.data.role);
    } catch (err) {
      errLoginUser.value = err
    }

 
    // .catch((err)=>{
    //   errLoginUser.value = err;

    // })

    // try {
    // } catch (error) {
    // }
  };

  return {
    errLoginUser,
    getLoginUser,
    setLoginUser,
  };
}
export default loginUser;
