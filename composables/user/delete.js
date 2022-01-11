import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import axios from "axios";
function deleteUserId() {
  const resDeleteUser = ref("");
  const errDeleteUser = ref("");

  const deleteUser = async (data) => {
    const token = localStorage.getItem("token");

    try {
      await axios
        .post(`${ipBackendUser}delete`, data, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          resDelete.value = res.data.message;
          console.log(res);

        });
    } catch (error) {
      errDeleteUser.value = error
    }
  };

  return {
    errDeleteUser,
    resDeleteUser,
    deleteUser,
  };
}
export default deleteUserId;
