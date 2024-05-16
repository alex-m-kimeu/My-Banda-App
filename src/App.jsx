import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Buyer/Homepage";

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}  exact/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
