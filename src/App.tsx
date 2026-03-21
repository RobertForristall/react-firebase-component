import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Authentication, { type AuthenticationProps } from "./pages/Authentication"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

export function App() {
  const loginProps: AuthenticationProps = {
    appName: "Testing",
    firebaseConfig: {
      apiKey: import.meta.env.VITE_PUBLIC_AUTH_API_KEY,
      authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PUBLIC_AUTH_PROJECT_ID,
      storageBucket: import.meta.env.VITE_PUBLIC_AUTH_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_PUBLIC_AUTH_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_PUBLIC_AUTH_APP_ID,
      measurementId: import.meta.env.VITE_PUBLIC_AUTH_MEASUREMENT_ID,
    },
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Authentication
              appName={loginProps.appName}
              firebaseConfig={loginProps.firebaseConfig}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
