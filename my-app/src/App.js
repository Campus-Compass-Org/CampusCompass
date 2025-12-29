import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { useAuth } from "./hooks/useAuth";

// Page imports
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import IdentityPage from "./pages/IdentityPage";
import ResultsPage from "./pages/ResultsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";

import "./styles/global.css";

function App() {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated at any point, take them to the login page
  if (!user) {
    return <LoginPage />;
  }

  // User is authenticated, show the main app
  return (
    <QuizProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
