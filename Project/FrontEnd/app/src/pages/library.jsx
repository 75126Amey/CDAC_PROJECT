import { useEffect, useState } from "react";
import { getUserRole } from "../services/user";
import { useNavigate } from "react-router-dom";
import { getLibrayBooks } from "../services/customer";
import { config2 } from "../config";
import CountdownTimer from "../components/countDownTimer";
import NavbarMain from "../components/common/NavbarMain";
import Footer from "../components/common/Footer";
import '../css/library.css';

function Library(props)
{
    const[library, setLibrary] = useState([]);
    const[rest, setRest] = useState([]);

    const navigate = useNavigate();
    const onLoad = async () => {
        const response1 = await getUserRole();
        if (
          response1.status !== "success" ||
          response1.data!== "CUSTOMER"
        ) {
          navigate("/acessDenied");
        }
        const response2 = await getLibrayBooks();
        setLibrary(response2.data);
      };

      useEffect(() => {
        onLoad();
      }, []);

      const theLib =async()=>{
        try{
           
            if(library.length%4!=0)
            {
                let arr = [];

                for(let i=0; i<(4-library.length%4); i++)
                {
                    arr.push(library[0]);
                    setRest(arr);
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        theLib()
    },[library])
    return(
    <div>
      <NavbarMain/>
        <div className="px-3">
            <div className="container-fluid border border-dark bg-custom-class rounded-4 my-3 playfair-display-title" style={{backgroundColor: '#d3d3d3'}}>
                <h1 className="text-start mt-3 ms-3 playfair-display-title">Library</h1>
                <div className="row mx-3 my-3 p-3">
                    {library.map((item)=>(
                            <div className="col border border-dark bg-light rounded mx-5 my-3 p-3">
                            <img src={`${config2.url}/covers/${item.coverImage}`} alt="book logo" className="d-inline-block" style={{width:'160px', height: '240px', verticalAlign: 'center'}}
                            onClick={()=>{
                              navigate("/book/view",{state: {
                                url:item.manuscript
                              }})  
                            }}
                            />
                            <h3 className="my-2">{item.bookTitle}</h3>
                            {item.isRentable && <CountdownTimer endTime={(new Date(item.rentEndDate)).getTime()}/>}
                            </div>
                        
                        ))}
                    {rest.map((item)=>(
                            <div className="col mx-5 my-3 px-0"></div>
                        ))}
                </div>  
            </div>
        </div>
        <Footer/>
    </div>)
}

export default Library