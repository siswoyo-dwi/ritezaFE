export default function ({ $axios, $auth, redirect, store }) {
   const token = localStorage.getItem('token')
    $axios.onRequest((config) => {
        config.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': token,
        }
    })
    
        // $axios.onError((error) => {
        //     if (error.response.status === 500) {
        //         redirect('/')
        //     }
        // })
    }
    