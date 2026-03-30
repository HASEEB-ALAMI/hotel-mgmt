
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Applayout from './Applayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";

export default function App() {
  const queryClient = new QueryClient({

    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 ,
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="bottom-center" reverseOrder={false} />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <Applayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
                <Route path="/users" element={<Users />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>

    </>
  )
}
