import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function profilUser() {
  const getProfilUser = ref({});
  const errProfilUser = ref({});

  const setProfilUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendUser}profil`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          getProfilUser.value = res.data.data;
          console.log(res);
        });
    } catch (error) {
      errProfilUser.value = error;
    }
  };

  return {
    errProfilUser,
    getProfilUser,
    setProfilUser,
  };
}
export default profilUser;
