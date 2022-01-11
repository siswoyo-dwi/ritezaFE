export default function ({ $axios, $auth, redirect, store }) {
  const token = localStorage.getItem("token");
  if (token) {
    $axios.onRequest((config) => {
      config.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: token,
      };
    });
  } else {
    $axios.onRequest((config) => {
      config.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    });
  }

  // $axios.onError((error) => {
  //     if (error.response.status === 500) {
  //         redirect('/')
  //     }
  // })
}
