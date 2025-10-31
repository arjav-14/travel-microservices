import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plane, Menu, User, LogOut } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  // Function to handle smooth scrolling
  const scrollToSection = useCallback((sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle navigation and scrolling
  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    const isHomePage = location.pathname === '/';
    
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  }, [location.pathname, navigate, scrollToSection]);

  // Handle scroll after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear the state to prevent scrolling on re-renders
          window.history.replaceState({}, '');
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <nav className=" fixed  left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WanderWay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="  hidden md:flex items-center h-full gap-8">
              <div className="flex items-center gap-8 h-full">
                <button 
              onClick={(e) => handleNavClick(e, 'destinations')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Destinations
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'packages')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Packages
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'about')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'contact')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Link to="/my-bookings" className="hover:text-primary">
              My Bookings
            </Link>
              </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.name || user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button 
                onClick={(e) => handleNavClick(e, 'destinations')}
                className="block py-2 text-foreground hover:text-primary transition-colors text-left"
              >
                Destinations
              </button>
              <button 
                onClick={(e) => handleNavClick(e, 'packages')}
                className="block py-2 text-foreground hover:text-primary transition-colors text-left"
              >
                Packages
              </button>
              <button 
                onClick={(e) => handleNavClick(e, 'about')}
                className="block py-2 text-foreground hover:text-primary transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block py-2 text-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </button>
              <div className="pt-2 border-t border-border mt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigate('/packages')}
                      >
                        Packages
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigate('/destinations')}
                      >
                        Destinations
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigate('/custom-trip')}
                      >
                        Custom Trip
                      </Button>
                      {user && (
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate('/my-bookings')}
                        >
                          My Bookings
                        </Button>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};