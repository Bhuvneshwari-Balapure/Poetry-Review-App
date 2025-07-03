import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";

function VisitPoetryOnly() {
  const { id } = useParams();
  const [poetryName, setpoetryName] = useState("");
  const [poetryContent, setpoetryContent] = useState("");
  const [poetName, setPoetName] = useState("");
  const [review, setReview] = useState("");

  // Fetch poetry details
  const fetchDetail = async () => {
    try {
      const api = `${import.meta.env.VITE_API}/poetry/GetPoetryForEdit/${id}`;
      const response = await axios.get(api);
      setpoetryName(response.data.poetryName);
      setpoetryContent(response.data.poetryContent);
      setPoetName(response.data.poetName);
      setReview(response.data.review || []);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    try {
      const api = `${import.meta.env.VITE_API}/poetry/addReview/${id}`;
      const response = await axios.post(api, {
        comment: review,
      });
      console.log(response.data);
      if (response.status === 200) {
        message.success(response.data.msg);
      }
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <div className="visitor-home">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="poetry-details text-white d-flex flex-column justify-content-center align-items-center gap-3">
              <h2>{poetryName}</h2>
              <p>{poetryContent}</p>
              <h4
                style={{
                  width: "100%",
                  textAlign: "start",
                  fontSize: "18px",
                  color: "rgb(119, 233, 119)",
                }}
              >
                Written By : {poetName}
              </h4>

              {/* Review Section */}
              <div className="review-section w-75 d-flex flex-column">
                <h4 style={{ color: "yellow" }}>Add Your Reviews Here:</h4>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Enter Your Review"
                  rows="4"
                  cols="50"
                  style={{
                    borderRadius: "10%",
                    background: "transparent",
                    color: "yellow",
                    border: "1px solid yellow",
                    padding: "8px",
                  }}
                ></textarea>
                <button
                  onClick={submitReview}
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "yellow",
                    color: "black",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VisitPoetryOnly;
