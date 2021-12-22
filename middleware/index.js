export default function(context){
   const user =  localStorage.getItem("token")
   if(!user){
       context.redirect('/')
    // this.$router.push({ path: "/" });
   }
}