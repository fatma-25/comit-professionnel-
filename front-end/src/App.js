import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/views/home";
import Dashboard from "./components/views/dashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./redux/action/auth-action";
import PrivateRoute from "./components/routes/privateRoute";
import ApprouveUser from "./components/views/ApprouveUser";
import UploadFile from "./components/UploadFile";
import EditProfile from "./components/views/EditProfile";
import SharedDocument from "./components/views/SharedDocument";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Route exact path="/" component={Home} />

        <PrivateRoute path="/Dashboard" component={Dashboard} />

        <PrivateRoute path="/ApprouveUser" component={ApprouveUser} />
        <PrivateRoute path="/upload" component={UploadFile} />
        <PrivateRoute path="/edit" component={EditProfile} />
        <PrivateRoute path="/shared" component={SharedDocument} />
      </Router>
      {/* <UploadFile /> */}
    </div>
  );
}

export default App;
