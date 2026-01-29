import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const BaseLayout = () => {
  return (
    <div className="flex flex-col max-w-[100vw] min-h-screen overflow-hidden">
      <Header/>
      <main className="flex-1 flex flex-col w-full page-container">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
