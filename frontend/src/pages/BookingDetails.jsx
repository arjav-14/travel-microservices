// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { Button } from '@/components/ui/button';
// // import { Loader2, ArrowLeft, Calendar, MapPin, Users, CreditCard, Clock, CheckCircle, XCircle, Home } from 'lucide-react';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { getBookingById } from '@/services/bookingService';
// // import { toast } from 'sonner';
// // import { format } from 'date-fns';

// // export default function BookingDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useAuth();
// //   const [booking, setBooking] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchBookingDetails = async () => {
// //       if (!id) {
// //         setError('No booking ID provided');
// //         setLoading(false);
// //         return; // Add return to exit early
// //       }

// //       try {
// //         setLoading(true);
// //         setError('');
// //         setBooking(null);
        
// //         console.log(`Fetching booking details for ID: ${id}`);
// //         const bookingData = await getBookingById(id);
        
// //         if (!bookingData) {
// //           throw new Error('No booking data received');
// //         }
        
// //         console.log('Booking data loaded:', bookingData);
// //         setBooking(bookingData);
// //       } catch (err) {
// //         const errorDetails = {
// //           message: err.message,
// //           status: err.status || err.response?.status,
// //           data: err.data || err.response?.data
// //         };
        
// //         console.error('Error in fetchBookingDetails:', errorDetails);
        
// //         // Handle different error cases
// //         if (err.status === 403 || err.response?.status === 403) {
// //           setError('You do not have permission to view this booking. You can only view your own bookings.');
// //         } else if (err.status === 404 || err.response?.status === 404) {
// //           setError('Booking not found. The requested booking does not exist or has been removed.');
// //         } else if (err.status === 401 || err.response?.status === 401) {
// //           // The interceptor will handle 401 errors and redirect to login
// //           console.log('Authentication required, redirecting to login...');
// //           return;
// //         } else {
// //           // For other errors, show a user-friendly message
// //           const errorMessage = err.message || 'Failed to load booking details. Please try again later.';
// //           setError(errorMessage);
// //           toast.error(errorMessage, {
// //             duration: 5000,
// //             position: 'top-center',
// //           });
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBookingDetails();
    
// //     // Cleanup function to prevent state updates after unmount
// //     return () => {
// //       // Any cleanup if needed
// //     };
// //   }, [id]);

// //   // Handle the back button click
// //   const handleBack = () => {
// //     navigate('/my-bookings');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="flex flex-col items-center gap-4">
// //           <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
// //           <p>Loading booking details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !booking) {
// //     return (
// //       <div className="container mx-auto py-12 px-4">
// //         <Button
// //           variant="outline"
// //           onClick={handleBack}
// //           className="mb-8 flex items-center gap-2"
// //         >
// //           <ArrowLeft className="h-4 w-4" />
// //           Back to My Bookings
// //         </Button>
        
// //         <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
// //           <div className="bg-red-50 p-4 rounded-lg mb-6">
// //             <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
// //             <h2 className="text-xl font-semibold text-red-700 mb-2">
// //               {error || 'Booking not found'}
// //             </h2>
// //             <p className="text-gray-600">
// //               {error.includes('permission') 
// //                 ? 'You can only view bookings that belong to your account.' 
// //                 : 'The booking you are looking for could not be found.'}
// //             </p>
// //           </div>
          
// //           <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
// //             <Button variant="outline" onClick={handleBack}>
// //               <ArrowLeft className="h-4 w-4 mr-2" />
// //               Back to My Bookings
// //             </Button>
// //             <Button asChild>
// //               <Link to="/">
// //                 <Home className="h-4 w-4 mr-2" />
// //                 Go to Homepage
// //               </Link>
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const formatDate = (dateString) => {
// //     try {
// //       return format(new Date(dateString), 'MMM d, yyyy');
// //     } catch (error) {
// //       return dateString;
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusMap = {
// //       confirmed: { text: 'Confirmed', color: 'bg-green-100 text-green-800' },
// //       pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
// //       cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' },
// //       completed: { text: 'Completed', color: 'bg-blue-100 text-blue-800' },
// //     };

// //     const statusInfo = statusMap[status.toLowerCase()] || { text: status, color: 'bg-gray-100 text-gray-800' };
    
// //     return (
// //       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
// //         {status === 'confirmed' ? (
// //           <CheckCircle className="h-4 w-4 mr-1" />
// //         ) : status === 'cancelled' ? (
// //           <XCircle className="h-4 w-4 mr-1" />
// //         ) : null}
// //         {statusInfo.text}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div className="container mx-auto py-8 px-4">
// //       <Button
// //         variant="outline"
// //         onClick={() => navigate(-1)}
// //         className="mb-8 flex items-center gap-2"
// //       >
// //         <ArrowLeft className="h-4 w-4" />
// //         Back to My Bookings
// //       </Button>

// //       <div className="max-w-4xl mx-auto">
// //         <div className="bg-white rounded-xl shadow-md overflow-hidden">
// //           {/* Header */}
// //           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
// //             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
// //               <div>
// //                 <h1 className="text-2xl font-bold">Booking #{booking.bookingNumber || id}</h1>
// //                 <p className="text-blue-100">
// //                   Booked on {formatDate(booking.createdAt)}
// //                 </p>
// //               </div>
// //               <div className="mt-4 md:mt-0">
// //                 {getStatusBadge(booking.status || 'pending')}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="p-6">
// //             {/* Package Details */}
// //             <div className="mb-8">
// //               <h2 className="text-xl font-semibold mb-4">Package Details</h2>
// //               <div className="bg-muted/50 p-6 rounded-lg">
// //                 <div className="flex flex-col md:flex-row gap-6">
// //                   <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg overflow-hidden">
// //                     <img
// //                       src={booking.package?.image || `https://placehold.co/400x300?text=${encodeURIComponent(booking.package?.title || 'Package')}`}
// //                       alt={booking.package?.title || 'Package'}
// //                       className="w-full h-full object-cover"
// //                       onError={(e) => {
// //                         e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(booking.package?.title || 'Package')}`;
// //                       }}
// //                     />
// //                   </div>
// //                   <div className="flex-1">
// //                     <h3 className="text-xl font-semibold">{booking.package?.title || 'Package'}</h3>
// //                     <div className="flex items-center text-muted-foreground mt-1 mb-3">
// //                       <MapPin className="h-4 w-4 mr-1" />
// //                       <span>{booking.package?.location || 'Location not specified'}</span>
// //                     </div>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// //                       <div className="flex items-center">
// //                         <Calendar className="h-5 w-5 text-blue-600 mr-2" />
// //                         <div>
// //                           <p className="text-sm text-muted-foreground">Check-in</p>
// //                           <p className="font-medium">{formatDate(booking.startDate)}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <Calendar className="h-5 w-5 text-blue-600 mr-2" />
// //                         <div>
// //                           <p className="text-sm text-muted-foreground">Check-out</p>
// //                           <p className="font-medium">{formatDate(booking.endDate)}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <Users className="h-5 w-5 text-blue-600 mr-2" />
// //                         <div>
// //                           <p className="text-sm text-muted-foreground">Guests</p>
// //                           <p className="font-medium">{booking.guests || 1} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
// //                         <div>
// //                           <p className="text-sm text-muted-foreground">Total Amount</p>
// //                           <p className="font-medium">${booking.totalAmount?.toFixed(2) || '0.00'}</p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Guest Information */}
// //             <div className="mb-8">
// //               <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
// //               <div className="bg-muted/50 p-6 rounded-lg">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <h3 className="font-medium mb-2">Primary Guest</h3>
// //                     <p>{user?.name || 'Guest'}</p>
// //                     <p className="text-muted-foreground">{user?.email || 'No email provided'}</p>
// //                     {booking.phoneNumber && (
// //                       <p className="text-muted-foreground mt-1">{booking.phoneNumber}</p>
// //                     )}
// //                   </div>
// //                   {booking.specialRequests && (
// //                     <div>
// //                       <h3 className="font-medium mb-2">Special Requests</h3>
// //                       <p className="text-muted-foreground">{booking.specialRequests}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Booking Summary */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
// //               <div className="bg-muted/50 p-6 rounded-lg">
// //                 <div className="space-y-4">
// //                   <div className="flex justify-between">
// //                     <span className="text-muted-foreground">Package Price</span>
// //                     <span>${booking.package?.price?.toFixed(2) || '0.00'}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-muted-foreground">Number of Nights</span>
// //                     <span>{booking.numberOfNights || '1'}</span>
// //                   </div>
// //                   {booking.discount > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">Discount</span>
// //                       <span className="text-green-600">-${booking.discount?.toFixed(2) || '0.00'}</span>
// //                     </div>
// //                   )}
// //                   {booking.tax > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">Tax</span>
// //                       <span>${booking.tax?.toFixed(2) || '0.00'}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t pt-4 mt-2">
// //                     <div className="flex justify-between font-semibold">
// //                       <span>Total Amount</span>
// //                       <span>${booking.totalAmount?.toFixed(2) || '0.00'}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
// //           {booking.status?.toLowerCase() === 'pending' && (
// //             <Button variant="outline" className="w-full sm:w-auto">
// //               Cancel Booking
// //             </Button>
// //           )}
// //           <Button asChild className="w-full sm:w-auto">
// //             <Link to="/my-bookings">Back to My Bookings</Link>
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Loader2, ArrowLeft, Calendar, MapPin, Users, CreditCard, Clock, CheckCircle, Home } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { getBookingById } from '@/services/bookingService';
// import { toast } from 'sonner';
// import { format } from 'date-fns';

// export default function BookingDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       if (!id) {
//         setError('No booking ID provided');
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await getBookingById(id);
//         console.log('Booking data received:', data); // Debug log
//         setBooking(data);
//       } catch (err) {
//         console.error('Error fetching booking:', {
//           message: err.message,
//           response: err.response?.data
//         });
//         setError('Failed to load booking details. Please try again later.');
//         toast.error('Failed to load booking details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <span className="ml-2">Loading booking details...</span>
//       </div>
//     );
//   }

//   if (error || !booking) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error || 'Booking not found'}</span>
//           <div className="mt-4">
//             <Button
//               onClick={() => navigate(-1)}
//               variant="outline"
//               className="border-red-300 text-red-700 hover:bg-red-100"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Go Back
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Safely access nested properties with optional chaining and provide defaults
//   const packageDetails = booking.package || {};
//   const mainImage = packageDetails.images?.[0] || 'https://via.placeholder.com/800x500?text=No+Image+Available';
//   const startDate = booking.startDate ? new Date(booking.startDate) : null;
//   const endDate = booking.endDate ? new Date(booking.endDate) : null;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <Button
//           variant="ghost"
//           onClick={() => navigate(-1)}
//           className="mb-4"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Bookings
//         </Button>
        
//         <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         {/* Package Header */}
//         <div className="px-4 py-5 sm:px-6 bg-gray-50">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             {packageDetails.name || 'Package Name Not Available'}
//           </h2>
//           <p className="mt-1 text-sm text-gray-500">
//             Booking ID: {booking._id || 'N/A'}
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="border-t border-gray-200">
//           <dl>
//             {/* Package Image */}
//             <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Package Image</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
//                 <img
//                   src={mainImage}
//                   alt={packageDetails.name || 'Package'}
//                   className="h-64 w-full object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
//                   }}
//                 />
//               </dd>
//             </div>

//             {/* Travel Dates */}
//             <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500 flex items-center">
//                 <Calendar className="h-4 w-4 mr-2" />
//                 Travel Dates
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
//                 {startDate ? format(startDate, 'PPP') : 'N/A'} - {endDate ? format(endDate, 'PPP') : 'N/A'}
//               </dd>
//             </div>

//             {/* Package Description */}
//             {packageDetails.description && (
//               <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Description</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
//                   {packageDetails.description}
//                 </dd>
//               </div>
//             )}

//             {/* Package Includes */}
//             {packageDetails.includes?.length > 0 && (
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Package Includes</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
//                   <ul className="list-disc pl-5 space-y-1">
//                     {packageDetails.includes.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </dd>
//               </div>
//             )}

//             {/* Travelers */}
//             <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500 flex items-center">
//                 <Users className="h-4 w-4 mr-2" />
//                 Travelers
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
//                 {booking.guests || 1} {booking.guests === 1 ? 'Person' : 'People'}
//               </dd>
//             </div>

//             {/* Total Price */}
//             <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500 flex items-center">
//                 <CreditCard className="h-4 w-4 mr-2" />
//                 Total Price
//               </dt>
//               <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
//                 ${booking.totalPrice?.toLocaleString() || '0.00'}
//               </dd>
//             </div>

//             {/* Status */}
//             <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Status</dt>
//               <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
//                 <span
//                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     booking.isPaid
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}
//                 >
//                   {booking.isPaid ? (
//                     <CheckCircle className="h-3 w-3 mr-1" />
//                   ) : (
//                     <Clock className="h-3 w-3 mr-1" />
//                   )}
//                   {booking.isPaid ? 'Paid' : booking.paymentStatus || 'Pending'}
//                 </span>
//               </dd>
//             </div>
//           </dl>
//         </div>

//         {/* Action Buttons */}
//         <div className="px-4 py-4 bg-gray-50 sm:px-6 flex justify-end space-x-3">
//           {!booking.isPaid && (
//             <Button
//               variant="default"
//               onClick={() => {
//                 // Handle payment
//                 toast.info('Payment processing will be implemented here');
//               }}
//             >
//               Complete Payment
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             onClick={() => navigate('/')}
//           >
//             <Home className="h-4 w-4 mr-2" />
//             Back to Home
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Calendar, Users, CreditCard, Clock, CheckCircle, Home, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getBookingById, updateBookingPayment } from '@/services/bookingService';
import { toast } from 'sonner';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const fetchBookingDetails = async () => {
    if (!id) {
      setError('No booking ID provided');
      setLoading(false);
      return;
    }

    try {
      const data = await getBookingById(id);
      console.log('Booking data:', data);
      const bookingData = data.data || data;
      setBooking(bookingData);
      
      // Fetch package details if we have a package ID
      if (bookingData.package) {
        try {
          const packageResponse = await axios.get(`http://localhost:3002/api/v1/packages/${bookingData.package}`);
          console.log('Package data:', packageResponse.data);
          setPackageDetails(packageResponse.data.data);
        } catch (pkgErr) {
          console.error('Error fetching package:', pkgErr);
          // Don't fail the whole page if package fetch fails
        }
      }
    } catch (err) {
      console.error('Error fetching booking:', {
        message: err.message,
        response: err.response?.data
      });
      setError('Failed to load booking details. Please try again later.');
      toast.error('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const handlePayment = async () => {
    if (!booking) return;
    
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update payment status in the backend
      const updatedBooking = await updateBookingPayment(booking._id, {
        paymentStatus: 'paid',
        isPaid: true,
        paymentDate: new Date().toISOString()
      });

      // Update local state
      setBooking(prev => ({
        ...prev,
        ...updatedBooking.data,
        isPaid: true,
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString()
      }));
      
      setPaymentSuccess(true);
      toast.success('Payment successful! Your booking is now confirmed.');
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    if (paymentSuccess) {
      fetchBookingDetails();
      setPaymentSuccess(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading booking details...</span>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error || 'Booking not found'}</span>
          <div className="mt-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Safely access nested properties with optional chaining and provide defaults
  const mainImage = packageDetails?.images?.[0] || 'https://via.placeholder.com/800x500?text=No+Image+Available';
  const startDate = booking.startDate ? new Date(booking.startDate) : null;
  const endDate = booking.endDate ? new Date(booking.endDate) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bookings
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
      </div>

      {/* Payment Success Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={closePaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          {paymentSuccess ? (
            <>
              <DialogHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <DialogTitle className="text-center text-xl font-semibold text-gray-900">
                  Payment Successful!
                </DialogTitle>
                <DialogDescription className="text-center text-gray-600">
                  Your booking has been confirmed. We've sent you a confirmation email.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Booking ID: {booking?._id || 'N/A'}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {packageDetails.name || 'Package Name'}
                </p>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  className="w-full"
                  onClick={closePaymentModal}
                >
                  Done
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Complete Payment</DialogTitle>
                <DialogDescription>
                  You're about to complete the payment for your booking.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Amount to Pay:</span>
                  <span className="text-sm font-medium">
                    ${booking?.totalPrice?.toLocaleString() || '0.00'}
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Payment'
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Package Header */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            {packageDetails.name || 'Package Name Not Available'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Booking ID: {booking._id || 'N/A'}
          </p>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            {/* Package Image */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Package Image</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <img
                  src={mainImage}
                  alt={packageDetails.name || 'Package'}
                  className="h-64 w-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                  }}
                />
              </dd>
            </div>

            {/* Travel Dates */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Travel Dates
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {startDate ? format(startDate, 'PPP') : 'N/A'} - {endDate ? format(endDate, 'PPP') : 'N/A'}
              </dd>
            </div>

            {/* Package Description */}
            {packageDetails.description && (
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {packageDetails.description}
                </dd>
              </div>
            )}

            {/* Package Includes */}
            {packageDetails.included?.length > 0 && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Package Includes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5 space-y-1">
                    {packageDetails.included.map((item, index) => (
                      <li key={index}>
                        <strong>{item.name}</strong>
                        {item.description && ` - ${item.description}`}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

            {/* Travelers */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Travelers
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {booking.guests || 1} {booking.guests === 1 ? 'Person' : 'People'}
              </dd>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Total Price
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
                ${booking.totalPrice?.toLocaleString() || '0.00'}
              </dd>
            </div>

            {/* Status */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.isPaid
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking.isPaid ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {booking.isPaid ? 'Paid' : booking.paymentStatus || 'Pending'}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4 bg-gray-50 sm:px-6 flex justify-end space-x-3">
          {!booking.isPaid && (
            <Button
              variant="default"
              onClick={() => setShowPaymentModal(true)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Complete Payment'
              )}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}