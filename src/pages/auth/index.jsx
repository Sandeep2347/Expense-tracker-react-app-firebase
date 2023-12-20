import {auth , provider} from  "../../config/firebase-config"
import {signInWithPopup} from "firebase/auth"
import {useNavigate,Navigate} from 'react-router-dom'
import { useGetUserInfo } from "../../hooks/useGetUserInfo" 
import { useEffect } from "react"
import "./style.css"
export const Auth = () =>{
    const navigate=useNavigate();
    const {isAuth}=useGetUserInfo()
    const signInWithGoogle= async ()=>{
        const results = await signInWithPopup(auth,provider)
        const authinfo={
            userID:results.user.uid,
            name:results.user.displayName,
            profilePhoto:results.user.photoURL,
            isAuth:true,
        }
        localStorage.setItem("auth",JSON.stringify(authinfo));
        navigate("/expense-tracker")
    }
    if(isAuth)
    {
        return <Navigate to="/expense-tracker"/>;
    }
    

    return <div className="login-page">
        <p>Signin with google to continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>Signin with google</button>
         </div>
}