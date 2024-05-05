import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { register, updateUserOnlineStatus } from "../api";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    zipCode: "",
    yearsOfExperience: "",
    email: "",
    password: "",
    confirmpsw: "",
  });
  const [warning, setWarning] = useState({ visible: false, message: "" });

  const validateUserInfo = () => {
    const { name, zipCode, yearsOfExperience, email, password, confirmpsw } =
      user;
    if (!name || name.length < 1) {
      setWarning({ visible: true, message: "Please type your username." });
      return false;
    }
    if (!zipCode || zipCode.length < 1) {
      setWarning({ visible: true, message: "Please type your zipCode." });
      return false;
    }
    if (!yearsOfExperience || yearsOfExperience.length < 1) {
      setWarning({
        visible: true,
        message: "Please type your yearOfExperience.",
      });
      return false;
    }
    if (!email || email.length < 1) {
      setWarning({ visible: true, message: "Please type your email." });
      return false;
    }
    if (!password || password.length < 1) {
      setWarning({ visible: true, message: "Please type your password." });
      return false;
    }
    if (!confirmpsw || confirmpsw.length < 1) {
      setWarning({ visible: true, message: "Please confirm your password." });
      return false;
    }
    if (password !== confirmpsw) {
      setWarning({ visible: true, message: "Please confirm your password." });
      return false;
    }
    setWarning({ visible: false, message: "" });
    return true;
  };

  const handleRegister = async () => {
    const validateStatus = validateUserInfo();
    if (!validateStatus) return;
    try {
      const result = await register({
        name: user.name,
        zipCode: user.zipCode,
        yearsOfExpereince: user.yearsOfExperience,
        email: user.email,
        password: user.password,
      });
      if (result && result.statusCode == 200) {
        setWarning({ visible: false, message: "" });
        await updateUserOnlineStatus({ email: user.email });
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("username", user.name);
        navigate("/firstvisit");
      } else {
        setWarning({ visible: true, message: result.message });
      }
    } catch (error) {
      setWarning({ visible: true, message: error && error.message });
    }
  };

  const handleRouteToLogin = () => {
    navigate("/login");
  };

  return (
    <Container style={{ paddingTop: 20 }}>
      <div className="form-signin">
        {warning.visible && <Alert variant="warning">{warning.message}</Alert>}
        <Form>
          <div className="text-center mb-4">
            <Image className="logo" src={logo} rounded />
          </div>
          <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>

          <Form.Group className="mb-3" controlId="exampleForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
              placeholder="Type your name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.zipCode">
            <Form.Label>ZipCode</Form.Label>
            <Form.Control
              type="text"
              value={user.zipCode}
              onChange={(e) => {
                setUser({ ...user, zipCode: e.target.value });
              }}
              placeholder="Type your ZipCode"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.yearsOfExpereince"
          >
            <Form.Label>YearsOfExpereince</Form.Label>
            <Form.Control
              type="text"
              value={user.yearsOfExperience}
              onChange={(e) => {
                setUser({ ...user, yearsOfExperience: e.target.value });
              }}
              placeholder="Type your Years Of Expereince"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="Type your Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              placeholder="Type your password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={user.confirmpsw}
              onChange={(e) => {
                setUser({ ...user, confirmpsw: e.target.value });
              }}
              placeholder="Confirm your password"
            />
          </Form.Group>

          <Button
            className="w-100 btn btn-lg btn-primary"
            variant="primary"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <p className="mt-5 mb-3 text-muted text-center">
            <span className="text-primary" onClick={handleRouteToLogin}>
              Back to Sign In
            </span>
          </p>
        </Form>
      </div>
    </Container>
  );
}

export default Signup;
