import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const PoetLogin = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = "http://localhost:8080/poet/poetLogin";
      let response = await axios.post(api, input);
      if (response.status === 200) {
        localStorage.setItem("PoetName", response.data.login.poetName);
        localStorage.setItem("Poetid", response.data.login._id);
        message.success(response.data.msg);
        navigate("/poetryLayout");
      }
      console.log(response.data);
    } catch (error) {
      message.error("Poet login failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="poet-registration">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="registration-form">
              <h2 className="text-center text-white">Poet Login</h2>

              <Form>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Form.Group as={Link} to="/register" className="regisLogin">
                    Registration
                  </Form.Group>
                  <Form.Group as={Link} to="/login" className="regisLogin">
                    / Login
                  </Form.Group>
                </div>

                {/* Login Form */}
                <Form.Group controlId="formEmail">
                  <Form.Label className="text-white">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="poetEmail"
                    value={input.poetEmail}
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="poetPass"
                    value={input.poetPass}
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group id="logRegis">
                  <Button
                    id="btn"
                    variant="primary"
                    type="submit"
                    block
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PoetLogin;
