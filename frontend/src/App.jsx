import { useState } from 'react';
import Home from './components/Home'
import Quiz from './components/Quiz';
import Report from './components/Report';
import Layout from './components/Layout';
import QuizHistory from './components/QuizHistory';
import PastQuizDetails from './components/PastQuizDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [access, setAccess] = useState(false); // maintaining a state for accessing the Application
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={access ? <Layout /> : <Navigate to={"/login"} replace/>}>

          {/* Quiz component */}
          <Route exact path="/" element={<ProtectedRoute access={access}><Quiz /></ProtectedRoute>} />

          {/* Report component to view the results */}
          <Route exact path="/report" element={<ProtectedRoute access={access}><Report /></ProtectedRoute>} />

          {/* QuizHistory component to view the previously attempted quiz */}
          <Route exact path="/quiz-history" element={<ProtectedRoute access={access}><QuizHistory /></ProtectedRoute>} />

          {/* QuizDetails component to view details of a quiz */}
          <Route exact path="/quiz/:id" element={<ProtectedRoute access={access}><PastQuizDetails /></ProtectedRoute>} />
        </Route>

        {/* Entry point of the app */}
        <Route path="/login" element={<Home setAccess={setAccess} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
