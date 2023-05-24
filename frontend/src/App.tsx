import { Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import "./index.css";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";

function App() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        <LoginForm />
      </div>
    );
  }
}

export default App;
