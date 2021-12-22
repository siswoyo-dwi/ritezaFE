export default function(context){
    const user =  localStorage.getItem("token")
    if(user){
        context.redirect('dashboard')
     // this.$router.push({ path: "/" });
    }
 }