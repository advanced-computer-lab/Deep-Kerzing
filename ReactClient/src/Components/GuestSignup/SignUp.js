import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/searchFlight/adminSearchFlight.css";
import { FaUser, FaLock,FaAt } from "react-icons/fa";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"
import PopUp from "../PopUp/popUp";
const SignUp = () =>{
      
      const history = useHistory();
      const [email, setEmail] = useState("");
      const [name, setName] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [error, setError] = useState(false);
      const [open, setOpen] = useState(false);
      const inputs={
        email:email,
        name :name,
        password: password,
        role: "user"
      } 

   
   
      const onSubmit = (event)=> {
        event.preventDefault()
        if (password == confirmPassword)
        {  
            axios
             .post("http://localhost:8000/api/user/register", inputs)
              .then((res) => {
                console.log(res);
            })
               .catch((err) => {
                 console.log("Error from ShowuserList");
                });
                setOpen(true);

                //history.push("/login"); 
            
        }
        else{
            setError("Passwords do not match!")
        }

    }
  
  return(

        <div>
            <form className="containerCard">
            <h1>Sign Up</h1>
            <div className="input-group input-group-icon"> 
                <input
                onChange={(event) => setName(event.target.value)}
                 type="string"
                 placeholder="Full Name"
                 required
                />
                <div className="input-icon">
                 <FaUser></FaUser>
                 </div>
            </div>
            <div className="input-group input-group-icon"> 
                <input
                onChange={(event) => setEmail(event.target.value)}
                 type="email"
                 placeholder="Email"
                 required
                />
                 <div class="input-icon">
                 <FaAt></FaAt>
                 </div>
            </div>
            <div className="input-group input-group-icon"> 
                 <input
                 onChange={(event) => setPassword(event.target.value)}
                 type="password"
                 placeholder="Password"
                 required
                />
               <div className="input-icon">
             <FaLock></FaLock>
                </div>
            </div>
            <div className="input-group input-group-icon"> 
                 <input
                 onChange={(event) => setConfirmPassword(event.target.value)}
                 type="password"
                 placeholder="Confirm Password"
                 required
                />
                  <div className="Incorrect">
                    {error}
                </div>
    
             <div className="input-icon">
              <FaLock></FaLock>
            </div>
            </div>
            <button className="buttonLogin" onClick = {onSubmit}>Submit</button>
            </form>
       {open && (
        <PopUp
          message="Congratulations"
          content="You have signed up successfully"
          path="/login"
        ></PopUp>
      )}
        </div>

    )
}
export default SignUp ;