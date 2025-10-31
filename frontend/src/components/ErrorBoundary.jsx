import { Component } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ErrorBoundary component to catch JavaScript errors in child components.
 * It will display a fallback UI when an error occurs.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped
 * @param {ReactNode|Function} [props.fallback] - Custom fallback UI or render prop
 * @param {Function} [props.onError] - Error handler callback
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered component or fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error info
    this.setState({ 
      errorInfo,
      error 
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    const { 
      children, 
      fallback, 
      className 
    } = this.props;
    
    const { 
      hasError, 
      error, 
      errorInfo 
    } = this.state;

    if (hasError) {
      // Render custom fallback if provided
      if (typeof fallback === 'function') {
        return fallback({ error, errorInfo, resetError: this.handleReset });
      }
      
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className={cn('p-6 max-w-2xl mx-auto', className)}>
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-2">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We're sorry, but an unexpected error occurred. Please try again or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-background/50 p-4 rounded-md mb-6 text-sm">
                <summary className="font-medium mb-2 cursor-pointer">Error Details</summary>
                <pre className="whitespace-pre-wrap break-words">
                  {error?.toString()}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={this.handleReset}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button asChild>
                <a href="/">
                  Go to Homepage
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
