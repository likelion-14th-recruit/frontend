import "./index.css";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import RecruitLayout from "./layouts/recruitLayout";
import RecruitApplyPage from "./pages/recruit/RecruitApplyPage";
import InterviewPage from "./pages/recruit/create/InterviewPage";
import FindPasswordPage from "./pages/recruit/FindPasswordPage";
import ScrollToTop from "./components/common/ScrollToTop";
import AdminDetail from "./pages/admin/AdminDetail";

const GA_ID = import.meta.env.VITE_GA_ID;
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

const router = createBrowserRouter([
  {
    element: (
      <>
        <MainLayout />
        <ScrollToTop />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/project", element: <Project /> },
      { path: "/people", element: <People /> },
      { path: "/recruit", element: <RecruitHome /> },
      { path: "/recruit/start", element: <RecruitApplyPage /> },
      { path: "/recruit/find-password", element: <FindPasswordPage /> },
      {
        element: <RecruitLayout />,
        children: [
          { path: "/recruit/terms", element: <TermsPage /> },
          { path: "/recruit/apply", element: <ApplyPage /> },
          { path: "/recruit/info", element: <InfoPage /> },
          { path: "/recruit/interview", element: <InterviewPage /> },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: `/${ADMIN_PATH}`, element: <Admin /> },
      { path: `/${ADMIN_PATH}/:applicationPublicId`, element: <AdminDetail /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    // 1. 초기화 (한 번만 실행됨)
    ReactGA.initialize(GA_ID);
    // 2. 현재 페이지 뷰 전송
    ReactGA.send("pageview");
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
