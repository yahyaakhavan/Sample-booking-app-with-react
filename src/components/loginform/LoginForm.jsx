import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form
        action=""
        className="form"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="text"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
