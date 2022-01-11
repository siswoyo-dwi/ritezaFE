import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function changePasswordUser() {
  const resChangePasswordUser = ref("");
  const errChangePasswordUser = ref("");

  const setChangePasswordUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendUser}changePassword/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          resChangePasswordUser.value = res.data.data;
          console.log(res);

        });
    } catch (error) {
      errChangePasswordUser.value = error
    }
  };

  return {
    errChangePasswordUser,
    resChangePasswordUser,
    setChangePasswordUser,
  };
}
export default changePasswordUser;
