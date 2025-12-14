// import Navbar from "./components/Navbar";

// export default function App() {
//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
//         <h1 className="text-4xl font-bold text-pink-600">
//           Welcome to Sweet Shop 🎉
//         </h1>
//         <p className="text-gray-700 mt-4 text-lg">
//           Manage, purchase, and restock sweets with ease.
//         </p>
//       </div>
//     </div>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
