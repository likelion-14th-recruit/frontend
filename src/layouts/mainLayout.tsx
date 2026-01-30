import { Outlet } from "react-router-dom";
import Header from "../components/common/header";

const MainLayout = () => {
  return (
    <div className="flex w-screen">
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <Header />
        <main className="no-scrollbar flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {/* 여기에 푸터도 추가해야함 */}
      </div>
    </div>
  );
};

export default MainLayout;
