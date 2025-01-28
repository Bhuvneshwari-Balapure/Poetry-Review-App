import { Outlet } from "react-router-dom";
import PoetryHeader from "./PoetryHeader";
import { Container } from "react-bootstrap";

const PoetryLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          url("https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-two-roses-rest-over-an-open-book-on-a-table-image_2566329.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <PoetryHeader />
      <Container fluid className="pt-5">
        {/* Add padding-top to ensure content doesn't overlap with the header */}
        <Outlet />
      </Container>
    </div>
  );
};

export default PoetryLayout;
