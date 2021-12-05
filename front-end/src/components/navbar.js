import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginModal from "../components/auth/loginModal";
import RegiterModal from "../components/auth/registerModal";
import { logoutHandler } from "../redux/action/auth-action";

export default function NavFct() {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const history = useHistory();
  const logoutUser = () => {
    dispatch(logoutHandler());
  };

  const authLinks = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Nav.Link> <Link to="/dashboard" style={{color:"white",textDecoration: 'none'}}>Dashboard </Link></Nav.Link> */}

        {user?.status === "admin" && (
          <Nav.Link>
            <Link
              to="/ApprouveUser"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              Approuve User
            </Link>
          </Nav.Link>
        )}
        {/* <Button onClick={logoutUser} > Logout  </Button> */}
        {user?.account === "true" ? (
          <div style={{ display: "flex" }}>
            <Nav.Link style={{ color: "white" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/upload"
              >
                Upload
              </Link>
            </Nav.Link>
            <Nav.Link style={{ color: "white" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/edit"
              >
                Edit Profile
              </Link>
            </Nav.Link>
            <Nav.Link style={{ color: "white" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/shared"
              >
                Shared Document
              </Link>
            </Nav.Link>
          </div>
        ) : null}
        {/* {user?.account === "true" ? (
          <Nav.Link style={{ color: "white" }}>
            <Link style={{ color: "white", textDecoration: "none" }} to="/edit">
              Edit Profile
            </Link>
          </Nav.Link>
        ) : null} */}
        <Nav.Link style={{ color: "white" }} onClick={logoutUser}>
          Logout
        </Nav.Link>
      </div>
    </>
  );
  const visitorLinks = (
    <>
      <div className="navBtns">
        <LoginModal />
        <div style={{ marginLeft: 30 }}>
          <RegiterModal />
        </div>
      </div>
    </>
  );

  return (
    <div className="Navbar">
      <Navbar bg="dark" variant="dark">
        <Container
          style={{
            display: "flex",
            justifyContent: isAuth ? "flex-start" : "space-between",
          }}
        >
          <Navbar.Brand>
            <img
              src="../images/logo.png"
              // width="45"
              height="80"
              // className="d-inline-block align-top"
              // alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav>{isAuth ? authLinks : visitorLinks}</Nav>
        </Container>
      </Navbar>
    </div>
  );
}
