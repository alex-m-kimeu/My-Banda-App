import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from 'jwt-decode';

const AuthWrapper = ({ children, role, Sidebar, Header, Footer }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken && decodedToken.sub ? decodedToken.sub.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && role) {
      navigate("/signin");
    }
    if (isAuthenticated && role && role !== userRole) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, role, userRole]);

  useEffect(() => {
    if (role === 'buyer' || role === 'seller') {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6648a8c89a809f19fb329503/1hu5t6kmp';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }
  }, [role]);

  return (
    <div>
      {Sidebar && <Sidebar />}
      {Header && <Header />}
      {children}
      {Footer && <Footer />}
    </div>
  );
};

export default AuthWrapper;