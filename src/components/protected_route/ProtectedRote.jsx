import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return isAuthenticated ? children : null;
}
