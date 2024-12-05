import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LandingPage from './components/LandingPage';
import Dashboard from './components/admin/Dashboard';
import UserDashboard from './components/user/UserDashboard';
import UserManagement from './components/admin/sections/UserManagement';
import ServiceManagement from './components/admin/sections/ServiceManagement';
import FreelancerManagement from './components/admin/sections/FreelancerManagement';
import Analytics from './components/admin/sections/Analytics';
import Settings from './components/admin/sections/Settings';
import Reports from './components/admin/sections/Reports';
import Integrations from './components/admin/sections/Integrations';
import RegisteredServices from './components/admin/sections/RegisteredServices';
import ServiceDetails from './components/ServiceDetails';
import ServiceDetailPage from './components/ServiceDetailPage';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/:categoryId" element={<ServiceDetails />} />
              <Route path="/services/:categoryId/:serviceId" element={<ServiceDetailPage />} />
              
              {/* User Dashboard */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Analytics />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="services" element={<ServiceManagement />} />
                <Route path="registered-services" element={<RegisteredServices />} />
                <Route path="freelancers" element={<FreelancerManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="reports" element={<Reports />} />
                <Route path="integrations" element={<Integrations />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
