import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function updateUser() {
  const getUpdateUserData = ref({});
  const errUpdateUserData = ref({});
  const setUpdateUserData = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${ipBackendUser}update`,data, {
        headers: {
          token: token,
        },
      }).then((res)=>{
        getUpdateUserData.value = res.data.data
        console.log(res);

      })
    } catch (error) {
      errUpdateUserData.value = error
    }
  };

  return {
    errUpdateUserData,
    getUpdateUserData,
    setUpdateUserData,
  };
}
export default updateUser;
