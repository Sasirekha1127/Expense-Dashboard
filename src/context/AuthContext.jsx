import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { clearExpenses } from "../expenses/expenseSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // ✅ load auth from localStorage
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const login = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    setIsAuth(false);

    // clear everything on logout
    localStorage.removeItem("isAuth");
    localStorage.removeItem("expenses");

    dispatch(clearExpenses());
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
