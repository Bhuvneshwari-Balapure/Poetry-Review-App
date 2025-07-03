import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VisitorHome = () => {
  const [poetryList, setPoetryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const poetryPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = "http://localhost:8080/poetry/DisplayAllPoetry";
        const response = await axios.get(api);
        setPoetryList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const DisplayPoetryOnly = (id) => {
    navigate(`/visitPoetryOnly/${id}`);
  };

  // Pagination Logic
  const indexOfLast = currentPage * poetryPerPage;
  const indexOfFirst = indexOfLast - poetryPerPage;
  const currentPoetry = poetryList.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(poetryList.length / poetryPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="visitor-home">
      <div className="overlay">
        <h1 className="title">Welcome to the Poetry Collection</h1>
        <p className="subtitle">Explore all the beautiful creations here</p>

        <Row className="gy-4">
          {currentPoetry.map((poetry) => (
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

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="secondary"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            ⬅ Previous
          </Button>
          <span className="px-3 align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisitorHome;
