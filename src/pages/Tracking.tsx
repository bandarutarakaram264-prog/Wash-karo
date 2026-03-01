import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Truck, 
  WashingMachine, 
  CheckCircle2, 
  Clock, 
  Search,
  ArrowRight,
  ChevronRight,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import { storage } from '../utils/storage';
import { Order } from '../types';

const STATUS_STEPS = [
  { id: 'Order Placed', icon: <Package className="h-6 w-6" />, label: 'Order Placed' },
  { id: 'Picked Up', icon: <Truck className="h-6 w-6" />, label: 'Picked Up' },
  { id: 'Washing', icon: <WashingMachine className="h-6 w-6" />, label: 'Washing' },
  { id: 'Out for Delivery', icon: <Truck className="h-6 w-6" />, label: 'Out for Delivery' },
  { id: 'Delivered', icon: <CheckCircle2 className="h-6 w-6" />, label: 'Delivered' },
];

export default function Tracking() {
  const navigate = useNavigate();
  const [currentUser] = useState(() => storage.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showDeliveryNotification, setShowDeliveryNotification] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const allOrders = storage.getOrders();
    const userOrders = allOrders.filter(o => o.userName === currentUser.name).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(userOrders);
    if (userOrders.length > 0) {
      setSelectedOrder(userOrders[0]);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (selectedOrder?.status === 'Delivered') {
      setShowDeliveryNotification(true);
    } else {
      setShowDeliveryNotification(false);
    }
  }, [selectedOrder?.status]);

  const getStatusIndex = (status: string) => {
    return STATUS_STEPS.findIndex(step => step.id === status);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-blue-50 p-8 rounded-full mb-8">
          <Search className="h-16 w-16 text-blue-300" />
        </div>
        <h2 className="text-3xl font-extrabold text-blue-900 mb-4">No Orders Found</h2>
        <p className="text-gray-500 max-w-md mb-10">You haven't placed any laundry orders yet. Book your first pickup today!</p>
        <button 
          onClick={() => navigate('/book')}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200"
        >
          Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Orders List */}
          <div className="w-full lg:w-96 space-y-4">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-6 px-2">Your Orders</h2>
            <div className="space-y-3">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-6 rounded-3xl transition-all border ${
                    selectedOrder?.id === order.id 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 border-transparent' 
                      : 'bg-white text-gray-700 border-blue-100 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-black uppercase tracking-widest opacity-70">#{order.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      selectedOrder?.id === order.id ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="font-bold text-lg mb-1">{order.clothType.charAt(0).toUpperCase() + order.clothType.slice(1)}</p>
                  <div className="flex items-center text-xs opacity-80">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(order.pickupDate).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tracking Detail */}
          <div className="flex-1">
            {selectedOrder && (
              <motion.div 
                key={selectedOrder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-blue-100"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-100">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-blue-100 text-blue-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Order ID: {selectedOrder.id}</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-500 text-sm font-medium">Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-3xl font-black text-blue-900">Track Your Laundry</h1>
                  </div>
                  <div className="mt-6 md:mt-0 text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-4xl font-black text-blue-600">₹{selectedOrder.totalPrice}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mb-16">
                  <div className="relative">
                    {/* Progress Line Background - Centered between icons */}
                    <div className="absolute top-7 left-[10%] right-[10%] h-1 bg-gray-100 hidden md:block"></div>
                    
                    {/* Active Progress Line */}
                    <div 
                      className="absolute top-7 left-[10%] h-1 bg-blue-600 transition-all duration-1000 hidden md:block"
                      style={{ 
                        width: `${(getStatusIndex(selectedOrder.status) / (STATUS_STEPS.length - 1)) * 80}%` 
                      }}
                    ></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                      {STATUS_STEPS.map((step, idx) => {
                        const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                        const isCurrent = selectedOrder.status === step.id;

                        return (
                          <div key={step.id} className="flex md:flex-col items-center md:text-center space-x-4 md:space-x-0">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                              isCompleted ? 'bg-blue-600 text-white' : 'bg-white text-gray-300 border-2 border-gray-100'
                            } ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}`}>
                              {step.icon}
                            </div>
                            <div className="md:mt-4">
                              <p className={`text-sm font-bold ${isCompleted ? 'text-blue-900' : 'text-gray-400'}`}>{step.label}</p>
                              {isCurrent && (
                                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">Current Status</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50/50 p-8 rounded-[2rem]">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-600" /> Item Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Cloth Type</span>
                        <span className="font-bold text-blue-900">{selectedOrder.clothType.charAt(0).toUpperCase() + selectedOrder.clothType.slice(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Quantity</span>
                        <span className="font-bold text-blue-900">{selectedOrder.quantity} pcs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Instructions</span>
                        <span className="font-bold text-blue-900 text-right max-w-[150px]">{selectedOrder.instructions || 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" /> Delivery Info
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Pickup Date</span>
                        <span className="font-bold text-blue-900">{new Date(selectedOrder.pickupDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500 text-sm mb-1">Address</span>
                        <span className="font-bold text-blue-900 text-right text-sm leading-relaxed">{selectedOrder.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4 bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold text-green-700">
                      {selectedOrder.status === 'Delivered' ? 'Order Delivered Successfully!' : 'Estimated Delivery: Tomorrow by 6:00 PM'}
                    </p>
                  </div>
                  <button className="text-blue-600 font-bold flex items-center hover:underline">
                    Need Help? Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Notification Popup */}
      <AnimatePresence>
        {showDeliveryNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 max-w-sm w-full"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-6 flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-blue-900">Order Delivered!</h4>
                <p className="text-sm text-gray-500">Your laundry for order #{selectedOrder?.id} has been delivered. Enjoy your fresh clothes!</p>
              </div>
              <button 
                onClick={() => setShowDeliveryNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
