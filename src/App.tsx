import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./layouts/adminLayout";
import Home from "./pages/home/Home";
import MainLayout from "./layouts/mainLayout";
import About from "./pages/about/About";
import People from "./pages/people/People";
import RecruitHome from "./pages/recruit/RecruitHome";
import Project from "./pages/project/Project";
import TermsPage from "./pages/recruit/create/TermsPage";
import InfoPage from "./pages/recruit/create/Infopage";
import ApplyPage from "./pages/recruit/create/Applypage";
import CompletePage from "./pages/recruit/create/CompletePage";
import RecruitLayout from "./layouts/recruitLayout";
import RecruitApplyPage from "./pages/recruit/RecruitApplyPage";
import InterviewPage from "./pages/recruit/create/InterviewPage";
import FindPasswordPage from "./pages/recruit/FindPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/people" element={<People />} />
          <Route path="/recruit" element={<RecruitHome />} />
          <Route path="/recruit/start" element={<RecruitApplyPage />} />
          <Route path="/recruit/find-password" element={<FindPasswordPage />} />

          <Route element={<RecruitLayout />}>
            <Route path="/recruit/terms" element={<TermsPage />} />
            <Route path="/recruit/info" element={<InfoPage />} />
            <Route path="/recruit/apply" element={<ApplyPage />} />
            <Route path="/recruit/complete" element={<CompletePage />} />
            <Route path="/recruit/interview" element={<InterviewPage />} />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
