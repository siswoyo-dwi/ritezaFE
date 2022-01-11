import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function changePasswordUserByAdmin() {
  const resChangePasswordUserByAdmin = ref("");
  const errChangePasswordUserByAdmin = ref("");

  const setChangePasswordUserByAdmin = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendUser}changePasswordByAdmin/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          resChangePasswordUserByAdmin.value = res.data.data;
          console.log(res);

        });
    } catch (error) {
      errChangePasswordUserByAdmin.value = error
    }
  };

  return {
    errChangePasswordUserByAdmin,
    resChangePasswordUserByAdmin,
    setChangePasswordUserByAdmin,
  };
}
export default changePasswordUserByAdmin;
