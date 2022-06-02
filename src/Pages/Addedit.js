import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './Addedit.css';
import fireDb from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: "",
    email: "",
    contact : "",

}


const Addedit = () => {
    const[activeTab, setActiveTab] = useState("Home");
    const [state, setstate] = useState(initialState);
    const [data, setdata] = useState({});

    const {name, email, contact} = state;

    const history = useNavigate();

    const { id } = useParams();


    //to Print the data from database
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
    },[id]);

    //To edit the details
    useEffect(()=>{
        if(id){
            setdata({...data[id]})
        }else{
            setdata({...initialState});
        }

        return ()=>{
            setdata({...initialState});
        };

    },[id, data]);
    
    const handleInputChange = (e)=>{
        const{name, value} = e.target;
        setstate({...state, [name]: value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please Provide the Valuer in Each input Feild");
        }
        else{
            fireDb.child('contacts').push(state, (err)=>{
                if(err){
                    toast.error(err);
                }
                else{
                    toast.success("Contact Is Added Successfully");
                }
            });
            setTimeout(()=> history("/"), 500);
        }
    };

    return (
        <div>
            <div className="header">
               <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
                <a class="navbar-brand" href="#">TodoList</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto ">
                            <li class="nav-item active ">
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
            <div style={{marginTop: "100px"}}>
                <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent:"center"}} onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"  value={name || ""}  name="name" className="form-control" onChange={handleInputChange}/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email || ""}  name="email" className="form-control" onChange={handleInputChange}/>

                    <label htmlFor="contact">Contact</label>
                    <input type="text" id="contact"  value={contact || ""} name="contact" className="form-control" onChange={handleInputChange}/>

                    <input type="submit" className="btn btn-danger btn-block mt-2 form-control" value={id ? "Update" : "Save"}/>
                </form>
            </div>
        </div>
    )
}

export default Addedit;



// 34 Timning
