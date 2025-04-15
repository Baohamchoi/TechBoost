import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false); 
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar onLoginClick={openLoginModal} onResgisterClick={openRegisterModal}  onLoginSuccess={currentUser}/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Login isOpen={isLoginModalOpen} onClose={closeModals} onSwitchToRegister={openRegisterModal}  onLoginSuccess={handleLoginSuccess}/>
        <Register isOpen={isRegisterModalOpen} onClose={closeModals} onSwitchToLogin={openLoginModal} />
      </Router>
    </div>
  );
}

export default App;