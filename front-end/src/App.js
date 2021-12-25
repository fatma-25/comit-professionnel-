// import "./App.css";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Home from "./components/views/home";
// import Dashboard from "./components/views/dashboard";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthUser } from "./redux/action/auth-action";
// import PrivateRoute from "./components/routes/privateRoute";
// import ApprouveUser from "./components/views/ApprouveUser";
// import UploadFile from "./components/UploadFile";
// import EditProfile from "./components/views/EditProfile";
// import SharedDocument from "./components/views/SharedDocument";
// import Calendar from "./components/views/Calendar";
// import Test from "./components/views/Test";
// import ListContact from "./components/views/ListContact";
// function App() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAuthUser());
//   }, []);

//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="App">
//       <Router>
//         <Navbar />

//         <Route exact path="/" component={Home} />
//         <Route path="/test" component={Test} />
//         {/* <PrivateRoute path="/test" component={Test} /> */}
//         <PrivateRoute path="/listcontact" component={ListContact} />
//         <PrivateRoute path="/Dashboard" component={Dashboard} />
//         <PrivateRoute path="/ApprouveUser" component={ApprouveUser} />
//         <PrivateRoute path="/upload" component={UploadFile} />
//         <PrivateRoute path="/edit" component={EditProfile} />
//         <PrivateRoute path="/shared" component={SharedDocument} />
//         <PrivateRoute path="/calendar" component={Calendar} />
//       </Router>
//       {/* <UploadFile /> */}
//     </div>
//   );
// }

// export default App;

import React from "react";
import { SideBar } from "./components/SideBar/SideBar.component";
import Messages from "./components/Messages/Messages.component";
import ListContact from "./components/views/ListContact";
import "./App.css";
import { Grid } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import PrivateRoute from "./components/routes/privateRoute";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/views/home";
import Dashboard from "./components/views/dashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./redux/action/auth-action";
import ApprouveUser from "./components/views/ApprouveUser";
import UploadFile from "./components/UploadFile";
import EditProfile from "./components/views/EditProfile";
import SharedDocument from "./components/views/SharedDocument";
import Calendar from "./components/views/Calendar";
import Test from "./components/views/Test";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className="messagepanel">
        {/* <Messages /> */}
        {location.pathname === "/listcontact" ? (
          <Route path="/listcontact" component={ListContact} />
        ) : location.pathname === "/calendar" ? (
          <Route path="/calendar" component={Calendar} />
        ) : location.pathname === "/upload" ? (
          <Route path="/upload" component={UploadFile} />
        ) : location.pathname === "/shared" ? (
          <Route path="/shared" component={SharedDocument} />
        ) : // : location.pathname === "/edit" ? (
        //   <Route path="/edit" component={EditProfile} />
        // )
        location.pathname === "/ApprouveUser" ? (
          <Route path="/ApprouveUser" component={ApprouveUser} />
        ) : location.pathname === "/message" ? (
          // <Messages />
          <Route path="/message" component={Messages} />
        ) : (
          // <div>Welcome to SoftCommunity Dashbord</div>
          <img
            style={{ margin: 200, marginTop: 50 }}
            src="https://media.istockphoto.com/vectors/welcome-inscription-hand-drawn-lettering-greeting-card-with-design-vector-id816807384?k=20&m=816807384&s=612x612&w=0&h=QRjPUJ-vhr50lkeJx5j1QKY1n3lakksxrodVf1rEZ4I="
          />
        )}
      </Grid.Column>

      <Grid.Column width={3}>
        <span></span>
      </Grid.Column>
    </Grid>
  );
}

export default App;
