import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthWrapper from './Authwrapper';
import routes from './routes';
import { SignIn } from './Authentication/SignIn/SignIn';
import { BuyerProvider } from './Pages/Buyer/BuyerContext/BuyerContext';

function App() {
  return (
 
   <BuyerProvider>
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
   </BuyerProvider>
 
  );
}

export default App;