import { Link, useLocation } from "react-router-dom";

export default function PendingApproval(){
    const { state } = useLocation();
    const message = state?.message||"Message missing";
    return(
        <div><h1>{message}</h1>
        </div>

    )
}