import { useState } from "react";
import InfoCard from "../InfoCard/InfoCard"
import UserContext from "../UserContext/UserContext";
const ReservationInfo = (props) => {
    const count = 3;
    const [passengers,setPassengers] = useState({})
    var id =1

    var rows =[]
    for (var i =0 ; i<count ; i++)
    {
        rows.push(
            <InfoCard id = {id} setPassengers= {setPassengers} passengers ={passengers} > </InfoCard>
        )
       id++;
    }
    return(
        <div>
            <UserContext.Provider
        value={{ passengers
        
        }}
      >
          {rows}
            
             </UserContext.Provider>
             

        </div>
    )
}
export default ReservationInfo;