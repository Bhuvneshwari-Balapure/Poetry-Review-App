import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const VisitorHome = () => {
  const [poetryList, setPoetryList] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const api = "http://localhost:8080/poetry/DisplayAllPoetry";
      const response = await axios.get(api);
      setPoetryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const DisplayPoetryOnly = async (id) => {
    navigate(`/visitPoetryOnly/${id}`);
  };

  return (
    <div className="visitor-home">
      <div className="overlay">
        <h1 className="title">Welcome to the Poetry Collection</h1>
        <p className="subtitle">Explore all the beautiful creations here</p>
        <div className="poetry-list">
          <Row className="gy-4">
            {poetryList.map((poetry) => (
              <Col xs={12} sm={6} md={4} lg={3} key={poetry._id}>
                <Card
                  className="custom-card text-center shadow-sm text-white cardBack"
                  onClick={() => DisplayPoetryOnly(poetry._id)}
                >
                  <Card.Body className="cardTitle">
                    <Card.Title>{poetry.poetryName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-success">
                      {poetry.poetName}
                    </Card.Subtitle>
                    <Card.Text>
                      {poetry.poetryContent.substring(0, 35)}.....
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default VisitorHome;
