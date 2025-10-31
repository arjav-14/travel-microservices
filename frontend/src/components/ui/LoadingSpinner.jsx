import { cn } from "@/lib/utils";

/**
 * A customizable loading spinner component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.size='md'] - Size of the spinner (sm, md, lg)
 * @param {string} [props.color='primary'] - Color of the spinner
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({ className, size = 'md', color = 'primary', ...props }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-t-primary',
    secondary: 'border-t-secondary',
    destructive: 'border-t-destructive',
    success: 'border-t-green-500',
    warning: 'border-t-yellow-500',
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-gray-200',
        sizeClasses[size] || sizeClasses['md'],
        colorClasses[color] || colorClasses['primary'],
        className
      )}
      aria-label="Loading..."
      role="status"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
