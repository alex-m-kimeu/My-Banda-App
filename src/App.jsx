import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthWrapper from './Authwrapper';
import routes from './routes';
import { SignIn } from './Authentication/SignIn/SignIn';
import { AddProduct } from './Pages/Seller/AddProduct';


function App() {
  return (
    <Router       
      basename={import.meta.env.DEV ? '/' : '/My-Banda-App/'}
    >
      <Routes>
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/" element={<Navigate to="/signin" />} />
        {routes.map((route, index) => (
          route.path !== "/signin" &&
          <Route key={index} path={route.path} element={
            <AuthWrapper role={route.role} Sidebar={route.Sidebar} Header={route.Header} Footer={route.Footer}>
              <route.Element />
            </AuthWrapper>
          }/>
        ))}
      </Routes>
    </Router>
  );
}

export default App;