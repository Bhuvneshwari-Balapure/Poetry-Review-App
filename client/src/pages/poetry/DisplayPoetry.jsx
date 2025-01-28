import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LiaCommentsSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useParams } from "react-router-dom";

function DisplayPoetry() {
  const { poetryId } = useParams();
  console.log("Poetry ID from URL: ", poetryId);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const poetName = localStorage.getItem("PoetName");
  const poetid = localStorage.getItem("Poetid");
  const loadData = async () => {
    let api = "http://localhost:8080/poetry/DisplayPoetry";
    try {
      const response = await axios.get(api, {
        params: { poetName: poetName, poetid: poetid },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!poetid) {
      navigate("/login");
    } else {
      loadData();
    }
  }, [poetid]);

  const EditTask = async (id) => {
    navigate(`/poetryLayout/editPoetry/${id}`);
  };
  const DelPoetry = async (id) => {
    try {
      let api = `http://localhost:8080/poetry/DelPoetry/${id}`;
      let response = await axios.delete(api);
      console.log(response.data);

      if (response.status == 200) {
        message.success(response.data.msg);
        loadData();
      }
    } catch (error) {
      message.error(error.response?.data?.msg || "Error deleting Poetry");
    }
  };
  const DisplayPoetry = async (id) => {
    navigate(`/poetryLayout/PoetryOnly/${id}`);
  };
  // --------Reviews-------------
  const fetchReviews = async (poetryId) => {
    navigate(`/poetryLayout/PoetryReview/${poetryId}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        {data.map((poetry) => (
          <Col sm={12} md={6} lg={4} key={poetry._id} className="mb-4">
            <Card className="custom-card text-center shadow-sm text-white cardBack">
              <Card.Body
                className="cardTitle"
                onClick={() => DisplayPoetry(poetry._id)}
              >
                <Card.Title>{poetry.poetryName}</Card.Title>
                <Card.Subtitle className="mb-2 text-success">
                  {poetry.poetName}
                </Card.Subtitle>
                <Card.Text>{poetry.poetryContent.substring(0, 6)}...</Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <div className="d-flex justify-content-center">
                  {/* Edit Icon */}
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    className="mx-2 text-primary cursor-pointer"
                    size={20}
                    onClick={() => EditTask(poetry._id)}
                  />
                  {/* Delete Icon */}
                  <FaTrashAlt
                    style={{ cursor: "pointer" }}
                    className="mx-2 text-danger cursor-pointer"
                    size={20}
                    onClick={() => {
                      DelPoetry(poetry._id);
                    }}
                  />
                  {/* Review Icon */}
                  <LiaCommentsSolid
                    style={{ cursor: "pointer" }}
                    className="mx-2 text-warning cursor-pointer"
                    size={22}
                    onClick={() => fetchReviews(poetry._id)}
                  />
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DisplayPoetry;
