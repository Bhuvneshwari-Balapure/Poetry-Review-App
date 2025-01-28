import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
function PoetryOnly() {
  const { id } = useParams();
  console.log("useParam Id = ", id);
  const [poetryName, setpoetryName] = useState("");
  const [poetryContent, setpoetryContent] = useState("");
  const fetchDetail = async () => {
    try {
      let api = `http://localhost:8080/poetry/GetPoetryForEdit/${id}`;
      const response = await axios.get(api);
      console.log(response.data); // Ensure the data is correct
      setpoetryName(response.data.poetryName);
      setpoetryContent(response.data.poetryContent);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [id]);
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="poetry-details text-white d-flex  flex-column justify-content-center align-items-center gap-2">
              <h2>{poetryName}</h2>
              <p>{poetryContent}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PoetryOnly;
