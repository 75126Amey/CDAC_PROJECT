import { useLocation } from "react-router-dom";
import Bookdisplay from "./Bookdisplay";
import NavbarMain from "../components/common/NavbarMain";
import Footer from "../components/common/Footer";

export default function BookRead(){
    const {state} = useLocation();
    console.log(state);
    return(
        <div>
        <NavbarMain/>
        <Bookdisplay url={state.url}/>
        <Footer/>
        </div>
    )
}