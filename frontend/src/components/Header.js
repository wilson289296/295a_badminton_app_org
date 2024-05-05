import { useState, useEffect } from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../api";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [user, setUser] = useState({});
  const [active, setActive] = useState("/home");

  useEffect(() => {
    // getUsername();
    const path = location.pathname;
    console.log(path);
    setActive(path);
  }, [location.pathname]);

  const getUsername = async () => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      setWarning({ visible: true, message: "Please Login first!" });
      navigate("/login");
      return;
    }
    try {
      const result = await getUserInfo({ email: email });
      console.log("result is : ", result);
      if (result && result.statusCode == 200) {
        setUser(result.body);
        sessionStorage.setItem("username", result.body.name);
      }
    } catch (error) {
      return;
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  }

  return (
    <Navbar expand="lg" sticky="top" className="header">
      <Container className="container-fluid">
        <Navbar.Brand className="d-flex align-items-center">
          <Image className="header-logo" src={logo} rounded />
          <span className="header-title">Badminton Buddy</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="ml-auto middleNav">
            <Nav.Link as={Link} to="/home">
              <span
                style={{
                  color: active === "/home" ? "rgb(45,116,229)" : "black",
                }}
              >
                Home
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/recommendations">
              <span
                style={{
                  color:
                    active === "/recommendations" ? "rgb(45,116,229)" : "black",
                }}
              >
                Recommendations
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/matches"}>
              <span
                style={{
                  color: active === "/matches" ? "rgb(45,116,229)" : "black",
                }}
              >
                Matches
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/invitation"}>
              <span
                style={{
                  color: active === "/invitation" ? "rgb(45,116,229)" : "black",
                }}
              >
                Invitation
              </span>
            </Nav.Link>
          </Nav>
          <div onClick={handleProfileClick}>
            <span className="me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
            </span>
            <Image
              className="header-avatar"
              src="https://github.com/mdo.png"
              rounded
            />
            <Navbar.Text>Hi {username}</Navbar.Text>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
