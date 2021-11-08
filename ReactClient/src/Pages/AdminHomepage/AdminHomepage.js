// import { useHistory } from "react-router-dom";
import "../../Components/searchFlight/adminSearchFlight.css";
// import { useSelector } from "react-redux";


const AdminHomePage = () => {
  // const username = useSelector((store) => store.User);

  // const history = useHistory();
  // const Update = () => {
  //   history.push("/UpdateFlight");
  // };
  // const Search = () => {
  //   history.push("/SearchFlight");
  // };
  return (
    <div>
      <div className="adminHomepage">
        <h1 className="WelcomeTitle">Welcome </h1>
        {/* <div className="QuickAccessContainer">
          <h1 className="QuickAccess">Quick Access</h1>
          <button className="button1" onClick={Update}>
            Update Flight
          </button>
          <button className="button2" onClick={Update}>
            Delete Flight
          </button>
          <button className="button3" onClick={Search}>
            Search Flight
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default AdminHomePage;
