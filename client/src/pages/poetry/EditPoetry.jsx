import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function EditPoetry() {
  const { id } = useParams();
  const [poetryName, setpoetryName] = useState("");
  const [poetryContent, setpoetryContent] = useState("");
  const navigate = useNavigate();

  const fetchDetail = async () => {
    try {
      let api = `http://localhost:8080/poetry/GetPoetryForEdit/${id}`;
      const response = await axios.get(api);
      console.log(response.data);

      setpoetryName(response.data.poetryName);
      setpoetryContent(response.data.poetryContent);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [id]);
  const updatePoetry = async (e) => {
    e.preventDefault();
    try {
      let api = `http://localhost:8080/poetry/updatePoetry`;
      const response = await axios.put(api, {
        id: id,
        poetryName: poetryName,
        poetryContent: poetryContent,
      });
      if (response.status == 200) {
        message.success(response.data.msg);
        navigate("/poetryLayout/displayPoetry");
      }

      console.log(response.data);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="create-poetry">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="poetry-form">
                <h2 className="text-center text-white">
                  welcome {} Edit Your Poetry
                </h2>
                <Form>
                  <Form.Group controlId="poetryName">
                    <Form.Label className="text-white">Poetry Title</Form.Label>
                    <Form.Control
                      id="input"
                      type="text"
                      placeholder="Enter poetry Title"
                      value={poetryName}
                      onChange={(e) => setpoetryName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="poetryContent">
                    <Form.Label className="text-white">
                      Poetry Content
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={20}
                      placeholder="Write your poetry here..."
                      value={poetryContent}
                      onChange={(e) => setpoetryContent(e.target.value)}
                      required
                      className="poetry-textarea"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      id="btn"
                      variant="primary"
                      type="submit"
                      onClick={updatePoetry}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default EditPoetry;
