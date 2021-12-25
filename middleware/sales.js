export default function (context) {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!user) {
      context.redirect("/");
    } else if (role == 'admin') {
      context.redirect("/dashboard");
    }
  }
  