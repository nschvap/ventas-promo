import { HashRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./contexts/User";

// ROUTES
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import NavBar from "./components/navigation/NavBar";
import AdminPanel from "./pages/admin/AdminPanel";

const App = () => {
  return (
    <main className="h-screen w-screen relative">
      <HashRouter>
        <UserContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin-panel" element={<AdminPanel />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </UserContextProvider>
      </HashRouter>
    </main>
  );
};

export default App;
