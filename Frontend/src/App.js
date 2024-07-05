import './App.css';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { Home, SingleCourse, Cart, Courses } from "./pages";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ScrollToTop from './components/ScrollToTop';
import SearchPage from './pages/SearchPage';
import AutoMoveToTop from './components/Auto_MoveToTop';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:slug" element={<SingleCourse />} />
        <Route path="/category" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ScrollToTop />
      <AutoMoveToTop />
     
    </BrowserRouter>
  );
}

export default App;
