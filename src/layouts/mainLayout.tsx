import { Outlet } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const MainLayout = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <Header />

      <main className="no-scrollbar w-full h-full overflow-y-auto">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
