import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = { user: {}, isAuthenticated: false };
function authenticateReducer(state, action) {
  switch (action.type) {
    case "Login":
      return { user: action.payload, isAuthenticated: true };
    case "Logout":
      return { user: null, isAuthenticate: false };
    default:
      "unknown action...";
  }
}

const FakeUser = {
  Name: "yahya",
  Email: "user@gmail.com",
  password: "1234",
};
export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authenticateReducer,
    initialState
  );

  function login(email, password) {
    if (email == FakeUser.Email && password == FakeUser.password) {
      dispatch({ type: "Login", payload: FakeUser });
    }
  }
  function logout() {
    dispatch({ type: "Logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
