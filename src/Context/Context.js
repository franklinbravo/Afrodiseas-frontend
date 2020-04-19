import React, { useState, useEffect } from 'react'
import { auth } from "../firebase/firebaseApp";

export const Context= React.createContext();

const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [notification, setNotification] = useState({
        open:false,
        msg:''
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                const token = await user.getIdToken(true)
                console.log(token);
                await localStorage.setItem("token", JSON.stringify(token))
                setCurrentUser(user)
            }else{
                localStorage.setItem("token","")
                setCurrentUser(null)
            } 
        });
    }, [])

    return (
        <Context.Provider
            value={{
                currentUser,
                notification,
                setNotification,
                loading,
                setLoading
            }}
        >
            {children}
        </Context.Provider>
    );
}
 
export default ContextProvider;
