import { ipBackendUser } from "../../assets/js/ipBeckEnd";
import { ref } from "@nuxtjs/composition-api";
import axios from "axios";
function detailsUserById() {
  const listDetailById = ref({});
  const resDetailsUserById = ref("");
  const errDetailsUserById = ref("");

  const setListDetailById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`${ipBackendUser}detailsById/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          listDetailById.value = res.data.data;
          resDetailsUserById.value = res.data.message;
          console.log(res);

        });
    } catch (error) {
      errDetailsUserById.value = error
    }
  };

  return {
    errDetailsUserById,
    listDetailById,
    resDetailsUserById,
    setListDetailById,
  };
}
export default detailsUserById;
