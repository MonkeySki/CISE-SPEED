import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <NavLink className="navbar-brand p-3" to="/">
          SPEED
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create New Article
             </NavLink>
           </li>
           <li className="nav-item">
           <NavLink className="nav-link" to="/moderatorPage">
               Moderator
             </NavLink>
           </li>
           <li className="nav-item">
           <NavLink className="nav-link" to="/analystPage">
               Analyst
             </NavLink>
           </li>
           <li className="nav-item">
           <NavLink className="nav-link" to="/edit">
              Administrator
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}