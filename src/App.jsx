import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuth } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return isAuth ? (
    <Dashboard theme={theme} setTheme={setTheme} />
  ) : (
    <Login />
  );
}

export default App;
