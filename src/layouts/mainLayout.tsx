import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import MenuBar from "../components/common/menuBar";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-screen h-screen overflow-hidden">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="w-full h-full overflow-y-auto no-scrollbar">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
