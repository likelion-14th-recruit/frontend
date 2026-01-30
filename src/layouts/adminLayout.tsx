import { Outlet } from "react-router-dom";
import Header from "../components/common/header";
// admin이랑 일반 페이지랑 레이아웃 달라서 구분해뒀습니다
const AdminLayout = () => {
  return (
    <div className="flex w-screen">
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <Header />
        <main className="no-scrollbar flex-1 overflow-y-auto mt-[80px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
