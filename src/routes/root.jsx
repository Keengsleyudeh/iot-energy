import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Root(){
    const navigator = useNavigate();
    const auth = getAuth();
    const location = useLocation();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(location.pathname === "/auth/signup" || location.pathname === "/auth/signin" || location.pathname === "/"){
                    navigator("/dashboard");
                }
            } else {
                if(location.pathname === "/auth/signup" || location.pathname === "/auth/signin") return ;
                navigator("/auth/signin")
            }
        });
    }, [])

    return (
        <>
            <style>
                
            </style>
            < Outlet />
        </>
    )

    
}