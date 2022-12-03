import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import CreateUser from "./pages/createUser";
import Profile from "./pages/profile";
import ProtectedRoutes from "./pages/protectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div>
      <HashRouter>
        {isLoading && <LoadingScreen />}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
