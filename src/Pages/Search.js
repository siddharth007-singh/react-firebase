import React, {useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';

import firedB from "../firebase";

function Search() {
    const[activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname==="/"){
            setActiveTab('Home');
        }
        else if(location.pathname==="/add"){
            setActiveTab('AddContact');
        }
        else if(location.pathname==="/about"){
            setActiveTab('About');
        }
    }, [location]);

    const [data, setData] = useState({});

    const useQuery  =()=>{
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let search = query.get("name");


    useEffect(()=>{
        SearchData();
    },[search]);

    const SearchData=()=>{
        firedB.child("contacts").orderByChild("name").equalTo(search).on("value",(snapshot)=>{
            if(snapshot.val()){
                const data = snapshot.val();
                setData(data);
            }
        });
    };

    return (
        <div>
            <div className="header">
               <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <a href="" className="navbar-brand">TodoList</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item active ">
                                <Link to="/">
                                    <p className={`${activeTab==="Home"? "active" : ""}`} onClick={()=>setActiveTab("Home")}>Home</p>
                                </Link>

                            </li>
                            <li class="nav-item">
                                <Link to="/add">
                                    <p className={`${activeTab==="AddContact"? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>Add Contact</p>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/about">
                                    <p className={`${activeTab==="About"? "active" : ""}`} onClick={()=>setActiveTab("About")}>About</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>


             {/* Body Section is Started */}
             <div>
             <div className="row">
                <div className="col-lg-9 mx-auto">
                    <table className="table mt-5">
                        <tr>
                            <th>Sno.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                        </tr>
                        

                        {Object.keys(data).map((id, index) =>{
                            return(
                                <tr keys={id}>
                                    <td>{index+1}</td>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].contact}</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Search;
