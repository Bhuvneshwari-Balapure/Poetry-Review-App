import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const CreatePoetry = () => {
  const [input, setInput] = useState({
    poetryName: "",
    poetryContent: "",
  });
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userid, setUserid] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("PoetName")) {
      navigate("/login");
    }
    setUserName(localStorage.getItem("PoetName"));
    setUserid(localStorage.getItem("Poetid"));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = `${import.meta.env.VITE_API}/poetry/createPoetry`;
      const data = {
        ...input,
        poetid: localStorage.getItem("Poetid"),
        poetName: localStorage.getItem("PoetName"),
      };

      let response = await axios.post(api, data);
      if (response.status === 200) {
        message.success("Poetry created successfully!");
        navigate("/poetryLayout/displayPoetry");
      }
      console.log(data);
      console.log(userid);
    } catch (error) {
      message.error("Failed to create poetry. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="create-poetry">
      <Container fluid className="px-3">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="poetry-form">
              <h3 className="text-center  " style={{ color: "yellowgreen" }}>
                welcome {userName} Create Your Poetry
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="poetryName">
                  <Form.Label className="text-white">Poetry Title</Form.Label>
                  <Form.Control
                    id="input"
                    type="text"
                    placeholder="Enter poetry Title"
                    name="poetryName"
                    value={input.poetryName}
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="poetryContent">
                  <Form.Label className="text-white">Poetry Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    placeholder="Write your poetry here..."
                    name="poetryContent"
                    value={input.poetryContent}
                    onChange={handleInput}
                    required
                    className="poetry-textarea"
                  />
                </Form.Group>

                <div className="text-center">
                  <Button id="btn" variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePoetry;
