// import { Nav, Navbar, Container, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import LoginModal from "./auth/loginModal";
// import RegiterModal from "./auth/registerModal";
// import { logoutHandler } from "../redux/action/auth-action";

// export default function NavFct() {
//   const user = useSelector((state) => state.auth.user);
//   const isAuth = useSelector((state) => state.auth.isAuth);
//   const dispatch = useDispatch();

//   const history = useHistory();
//   const logoutUser = () => {
//     dispatch(logoutHandler());
//   };

//   const authLinks = (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         {/* <Nav.Link> <Link to="/dashboard" style={{color:"white",textDecoration: 'none'}}>Dashboard </Link></Nav.Link> */}

//         {user?.status === "admin" && (
//           <Nav.Link>
//             <Link
//               to="/ApprouveUser"
//               style={{ color: "white", textDecoration: "none" }}
//             >
//               {" "}
//               Approuve User
//             </Link>
//           </Nav.Link>
//         )}
//         {/* <Button onClick={logoutUser} > Logout  </Button> */}
//         {user?.account === "true" ? (
//           <div style={{ display: "flex" }}>
//             <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/upload"
//               >
//                 Upload
//               </Link>
//             </Nav.Link>
//             <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/edit"
//               >
//                 Edit Profile
//               </Link>
//             </Nav.Link>
//             <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/shared"
//               >
//                 Shared Document
//               </Link>
//             </Nav.Link>
//             <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/calendar"
//               >
//                 Calendar
//               </Link>
//             </Nav.Link>
//             {/* <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/test"
//               >
//                 Support Contact
//               </Link>
//             </Nav.Link> */}
//             <Nav.Link style={{ color: "white" }}>
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/listcontact"
//               >
//                 List Contact
//               </Link>
//             </Nav.Link>
//           </div>
//         ) : null}
//         {/* {user?.account === "true" ? (
//           <Nav.Link style={{ color: "white" }}>
//             <Link style={{ color: "white", textDecoration: "none" }} to="/edit">
//               Edit Profile
//             </Link>
//           </Nav.Link>
//         ) : null} */}
//         <Nav.Link style={{ color: "white" }} onClick={logoutUser}>
//           Logout
//         </Nav.Link>
//       </div>
//     </>
//   );
//   const visitorLinks = (
//     <>
//       <div style={{ display: "flex" }}>
//         <LoginModal />
//         <div style={{ marginLeft: 30 }}>
//           <RegiterModal />
//         </div>
//         {/* <div style={{ marginLeft: 5 }}> */}
//         <Button
//           style={{ backgroundColor: "#1ABEEA", marginLeft: 30 }}
//           variant="primary"
//           onClick={() => console.log("test")}
//         >
//           {/* <Nav.Link> */}
//           <Link
//             style={{ color: "white", textDecoration: "none", height: 20 }}
//             to="/test"
//           >
//             Contact Support
//           </Link>
//           {/* </Nav.Link> */}
//         </Button>
//         {/* </div> */}
//       </div>
//     </>
//   );

//   return (
//     <div className="Navbar">
//       <Navbar bg="dark" variant="dark">
//         <Container
//           style={{
//             display: "flex",
//             justifyContent: isAuth ? "flex-start" : "space-between",
//           }}
//         >
//           <Navbar.Brand>
//             <img
//               src="../images/logo.png"
//               // width="45"
//               height="80"
//               // className="d-inline-block align-top"
//               // alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//           <Nav>{isAuth ? authLinks : visitorLinks}</Nav>
//         </Container>
//       </Navbar>
//     </div>
//   );
// }
