import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export default function ProtectedRoutes({ children, allowedRoles }) {
  const [cookies] = useCookies(["token", "user"]);
  const navigate = useNavigate();
  const user = cookies.user;
  const token = cookies.token;
  const role = user ? user.role : null; // Check if user is defined before accessing role
  const isAllowed = role && allowedRoles.includes(role);
  let accessibleRoute = children; // Default to children

  if (!(token && isAllowed)) {
    // If not allowed, navigate to login after rendering
    setTimeout(() => {
      navigate('/login');
    }, 10);
  }

  return accessibleRoute;
}
