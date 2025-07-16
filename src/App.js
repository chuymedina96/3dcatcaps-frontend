import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CustomizeForm from './components/CustomizeForm';
import OrderPage from './components/OrderPage';
import NavBar from './components/Navbar';
import SuccessPage from "./components/SuccessPage";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customize" element={<CustomizeForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}
