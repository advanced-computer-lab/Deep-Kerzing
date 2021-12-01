import "../searchFlight/adminSearchFlight.css";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import * as React from "react";
import "./Checkbox.css"
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState } from "react";

const InfoCard = (props) => {
     const[email,setEmail] = React.useState();
     const[name,setName] = React.useState();
     const[passportNumber,setPassportNumber] = React.useState();
     const[type,setType]  = React.useState();

     var info = [
         email,
         name,
         passportNumber,
         type
     ]
     const {
        passengers
      } = useContext(UserContext);
      
    console.log(passengers)
    const onsubmitHandler = ()=>{
        passengers[props.id]= [
            email,
            name,
            passportNumber,
            type
        ]
        console.log("clicked")
    }
    return(
       <div className ="containerCard"> 
       
    <form >       
        <input 
              onChange = {(event) => setEmail(event.target.value)  } 
              type="email"
              placeholder="Email"
              required
       /> 

        <input
             onChange = {(event) => setName(event.target.value)} 
              type="text"
              placeholder="Full Name"
              required
        />

        
        <input
          onChange = {(event) => setPassportNumber(event.target.value)} 
             type="text"
             placeholder="Passport Number"
             required
       />
       <div>
       <label  className="radio">
    <input type="radio" name="rdo" value= "adult"   onChange = {(event)=> setType((event.target.value))}  />
    <span className="label"></span>Adult
  </label>

  <label  className="radio">
    <input type="radio" name="rdo" value = "child" onChange = {(event)=> setType((event.target.value))}  />
    <span className="label"></span>Child
  </label>
       </div>
       
     </form>
     <button onClick={onsubmitHandler}>Add</button>
        </div>
        
    )


    
}
export default InfoCard;