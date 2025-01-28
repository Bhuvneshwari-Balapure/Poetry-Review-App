import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/poet/Layout";
import VisitorHome from "./pages/visitors/VisitorHome";
import PoetRegistration from "./pages/poets/PoetRegister";
import PoetLogin from "./pages/poets/PoetLogin";
import CreatePoetry from "./pages/poetry/CreatePoetry";
import PoetryLayout from "./components/poetry/PoetryLayout";
import DisplayPoetry from "./pages/poetry/DisplayPoetry";
import EditPoetry from "./pages/poetry/EditPoetry";
import PoetryOnly from "./pages/poetry/PoetryOnly";
import VisitPoetryOnly from "./pages/visitors/VisitPoetryOnly";
import PoetryReviews from "./pages/poetry/PoetryReviews";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="layout" element={<Layout />} />
            <Route index element={<VisitorHome />} />
            <Route path="register" element={<PoetRegistration />} />
            <Route path="login" element={<PoetLogin />} />
            <Route path="visitPoetryOnly/:id" element={<VisitPoetryOnly />} />
          </Route>

          <Route path="/poetryLayout" element={<PoetryLayout />}>
            <Route index element={<CreatePoetry />} />
            <Route path="createPoetry" element={<CreatePoetry />} />
            <Route path="displayPoetry" element={<DisplayPoetry />} />
            <Route path="editPoetry/:id" element={<EditPoetry />} />
            <Route path="PoetryOnly/:id" element={<PoetryOnly />} />
            <Route path="PoetryReview/:poetryId" element={<PoetryReviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
