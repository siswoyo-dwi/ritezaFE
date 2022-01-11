import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function listAllUser() {
  const getListAllUser = ref({});
  const errListAllUser = ref({});
  const setListAllUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendUser}listAll`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getListAllUser.value = res.data.data;
          console.log(res);
        });
    } catch (error) {
      errListAllUser.value = error;
    }
  };

  return {
    errListAllUser,
    getListAllUser,
    setListAllUser,
  };
}
export default listAllUser;
