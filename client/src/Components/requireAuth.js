import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }
  return children;
}
