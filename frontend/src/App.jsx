import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Packages = lazy(() => import("./pages/Packages"));
const CustomTrip = lazy(() => import("./pages/CustomTrip"));
const Destinations = lazy(() => import("./pages/Destinations"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const BookPackage = lazy(() => import("./pages/BookPackage"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const BookingDetails = lazy(() => import("./pages/BookingDetails"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-8">
            <ScrollToTop />
            <Suspense 
              fallback={
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner />
                </div>
              }
            >
              
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={
                  <ErrorBoundary fallback={<div>Failed to load package details</div>}>
                    <PackageDetail />
                  </ErrorBoundary>
                } />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:id" element={
                  <ErrorBoundary fallback={<div>Failed to load destination details</div>}>
                    <DestinationDetails />
                  </ErrorBoundary>
                } />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/custom-trip" element={<CustomTrip />} />
                
                {/* Protected Dashboard Route */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book/package/:id"
                  element={
                    <ProtectedRoute>
                      <BookPackage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings/:id"
                  element={
                    <ProtectedRoute>
                      <BookingDetails />
                    </ProtectedRoute>
                  }
                />
                {/* 404 - Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SearchProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" richColors />
          <AppContent />
        </TooltipProvider>
      </SearchProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
