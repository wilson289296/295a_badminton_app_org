import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { login, updateUserOnlineStatus, getUserInfo } from "../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState({ visible: false, message: "" });

  const validateUserInfo = () => {
    const { email, password } = user;
    if (!email || email.length < 1) {
      setWarning({ visible: true, message: "Please type your email." });
      return false;
    }
    if (!password || password.length < 1) {
      setWarning({ visible: true, message: "Please type your password." });
      return false;
    }
    setWarning({ visible: false, message: "" });
    return true;
  };

  const handleLogin = async () => {
    const validateStatus = validateUserInfo();
    if (!validateStatus) return;
    try {
      const result = await login(user);
      if (result && result.statusCode == 200) {
        setWarning({ visible: false, message: "" });
        await updateUserOnlineStatus({ email: user.email });
        sessionStorage.setItem("email", user.email);
        const userResult = await getUserInfo({ email: user.email });
        console.log("result is : ", userResult);
        if (userResult && userResult.statusCode == 200) {
          sessionStorage.setItem("username", userResult.body.name);
          navigate("/home");
        }
      }
    } catch (error) {
      setWarning({ visible: true, message: error && error.message });
    }
  };

  const handleRouteToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container style={{ paddingTop: 20 }}>
      <div className="form-signin">
        {warning.visible && <Alert variant="warning">{warning.message}</Alert>}
        <Form>
          <div className="text-center mb-4">
            <Image className="logo" src={logo} rounded />
          </div>
          <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
          <Form.Group className="mb-3" controlId="exampleForm.username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              placeholder="Type your email"
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

          <div className="form-tip checkbox mb-3">
            <Form.Check type="checkbox" label="Remember me" />
            <span>Forgot password?</span>
          </div>
          <Button
            className="w-100 btn btn-lg btn-primary"
            variant="primary"
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <p className="mt-5 mb-3 text-muted text-center">
            Or{" "}
            <span className="text-primary" onClick={handleRouteToSignUp}>
              Sign Up
            </span>
          </p>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
