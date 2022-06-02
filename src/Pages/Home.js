import React, {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import fireDb from "../firebase";
import './Home.css';


const Home = () => {
    const[activeTab, setActiveTab] = useState("Home");
    const [data, setdata] = useState({});
    const [search , setSearch] = useState("");
    const location = useLocation();
    const history = useNavigate();

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

    //Get All the datta
    useEffect(()=>{
        fireDb.child("contacts").on("value", (snapshot)=>{
            if(snapshot.val()!==null){
                setdata({...snapshot.val()});
            }
            else{
                setdata({});
            }
        });

        //CleanUp function
        return()=>{
            setdata({});
        }
    },[]);


    const onDelete = (id)=>{
        if(window.confirm("Are you sure that you Want to delete")){
            fireDb.child(`contacts/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }
                else{
                    toast.success("Deleted Successfully");
                }
            });
        }
        <ToastContainer/>
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        history(`/search?name=${search}`);
        setSearch("");
    }

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
                            <li class="nav-item">
                                <form onSubmit={handleSubmit}>
                                    <input
                                    name="search"
                                    className="form-control"
                                    placeholder="Search Here"
                                    onChange = {(e)=>setSearch(e.target.value)}
                                    value={search}
                                    />
                                </form>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            {/* ab body ka section hoga */}

            <div className="row">
                <div className="col-lg-9 mx-auto">
                    <table className="table mt-5">
                        <tr>
                            <th>Sno.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                        
                         

                        {Object.keys(data).map((id, index) =>{
                            return(
                                <tr keys={id}>
                                    <td>{index+1}</td>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].contact}</td>
                                    <td>
                                        <Link to={`/update/${id}`}>
                                            <button className="btn btn-info">Edit</button>
                                        </Link>

                                        <button className="btn btn-danger" on onClick={()=>onDelete(id)}>Delete</button>

                                        <Link to={`/view/${id}`}>
                                            <button className="btn btn-warning">view</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;
