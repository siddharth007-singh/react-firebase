import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const About = () => {
    const[activeTab, setActiveTab] = useState("Home");
    return (
        <div>
            <div className="header">
               <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <a className="navbar-brand" href="#">TodoList</a>
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
                    <div className="col-lg-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat atque beatae incidunt aut odio alias dignissimos, soluta ex ut fugiat eaque eligendi animi obcaecati autem. Repellat doloribus recusandae quia. Porro?
                    </div>
                    <div className="col-lg-4">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum a iure repudiandae vitae asperiores, molestias officiis ullam blanditiis maiores non voluptate inventore nesciunt dolorum ipsum, fuga quae. Unde, maxime voluptates?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
