import { Container, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="text-center py-4">
          <Col>
            <h5 className="footer-heading">Connect with Us</h5>
            <div className="footer-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <FaFacebookF />
              </a>
              <a href="mailto:example@mail.com" className="footer-icon-link">
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/8827709028"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="footer-credits">Created by @Ayushi</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
