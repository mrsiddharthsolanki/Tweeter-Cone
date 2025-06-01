import Navbar from "./Navbar";
import SlideBar from "./SlideBar";
import { Outlet } from "react-router-dom"; // ✅ Import this

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <SlideBar />
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
