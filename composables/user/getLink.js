import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function getLinkUser() {
  const getGetLinkUser = ref({});
  const errGetLinkUser = ref({});

  const setGetLinkUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${ipBackendUser}getLink`, {
        headers: {
          token: token,
        },
      }).then((res)=>{
        getGetLinkUser.value = res.data.data
      })
    } catch (error) {
      errGetLinkUser.value = error
    }
  };

  return {
    errGetLinkUser,
    getGetLinkUser,
    setGetLinkUser,
  };
}
export default getLinkUser;
