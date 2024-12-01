import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/sections/UserManagement';
import ServiceManagement from './components/admin/sections/ServiceManagement';
import FreelancerManagement from './components/admin/sections/FreelancerManagement';
import Analytics from './components/admin/sections/Analytics';
import Settings from './components/admin/sections/Settings';
import Reports from './components/admin/sections/Reports';
import Integrations from './components/admin/sections/Integrations';

// Placeholder auth check - replace with actual auth logic
const isAuthenticated = () => {
  return true; // Replace with actual authentication check
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Analytics />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="services" element={<ServiceManagement />} />
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
    </ChakraProvider>
  );
};

export default App;
