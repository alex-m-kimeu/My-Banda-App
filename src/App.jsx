import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users } from './Pages/Admin/Users/Users';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;