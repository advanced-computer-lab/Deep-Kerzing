import GUSearchFlight from "../../Components/GUSearchFlight/GUSearchFlight";
import "../../Components/searchFlight/adminSearchFlight.css";
const GuestHomepage = () => {
  return (
    <div className="GuestHomePage">
      <h1 className="WelcomeTitle">{"You Can Never Reach Deeper Than Deep Kerzing"}</h1>
      <div className="GuestSearchFlight">
        <GUSearchFlight></GUSearchFlight>
      </div>
    </div>
  );
};
export default GuestHomepage;
