import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
function PoetryReviews() {
  const { poetryId } = useParams();
  console.log("Poetry ID from URL: ", poetryId);
  const [reviews, setReviews] = useState([]);
  const id = localStorage.getItem("Poetid");
  console.log("id of poet : ", id);
  // Fetch all reviews from the server
  const fetchReviews = async () => {
    try {
      const api = `http://localhost:8080/poetry/GetAllReviews/${poetryId}`;
      const response = await axios.get(api);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [poetryId]);

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary mb-4">Visitor Reviews</h1>
      <Row className="ReviewCards">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Col md={3} lg={10} key={index} className="mb-4">
              <Card
                className="shadow-lg border-0 Reviews"
                style={{ borderRadius: "15px" }}
              >
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p style={{ fontStyle: "italic", fontSize: "1.1rem" }}>
                      {review.comment}
                    </p>
                    <footer
                      className="blockquote-footer  mt-3"
                      style={{ color: "yellow" }}
                    >
                      <small>
                        {new Date(review.timestamp).toLocaleString()}
                      </small>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-secondary">
              No reviews have been submitted yet.
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default PoetryReviews;
