import React, {useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import fireDb from "../firebase";
import './Home.css';


const View = () => {
    const[activeTab, setActiveTab] = useState("Home");
    
    const [user, setUser]  = useState({});
    const {id} = useParams();

    //Calling Single data from firebase
    useEffect(()=>{
        fireDb
        .child(`contacts/${id}`)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists()){
                setUser({...snapshot.val()});
            }
            else{
                setUser({});
            }
        })
    }, [id]);

    console.log("user", user);
    return (
        <div>
            <div className="header">
               <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <a className="navbar-brand">TodoList</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <Link to="/">
                                    <p className={`${activeTab==="Home"? "active" : ""}`} onClick={()=>setActiveTab("Home")}>Home</p>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/add">
                                    <p className={`${activeTab==="AddContact"? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>Add Contact</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about">
                                    <p className={`${activeTab==="About"? "active" : ""}`} onClick={()=>setActiveTab("About")}>About</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto mt-5">
                    <table className="table mt-5">
                        <tr>
                            <th>Name</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr className="mt-3">
                            <th>email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td>{user.contact}</td>
                        </tr>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;
