import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Package, 
  MessageSquare, 
  CheckCircle2, 
  Calculator,
  ArrowRight,
  Info
} from 'lucide-react';
import { storage } from '../utils/storage';
import { Order } from '../types';

const CLOTH_TYPES = [
  { id: 'daily', name: 'Daily Wear', price: 10 },
  { id: 'heavy', name: 'Heavy Clothes (Jackets/Denim)', price: 25 },
  { id: 'bedsheets', name: 'Bedsheets & Curtains', price: 40 },
  { id: 'dryclean', name: 'Dry Clean Only', price: 60 },
];

export default function Booking() {
  const navigate = useNavigate();
  const [currentUser] = useState(() => storage.getCurrentUser());

  const [formData, setFormData] = useState({
    userName: currentUser?.name || '',
    phoneNumber: '',
    address: '',
    pickupDate: '',
    clothType: 'daily',
    quantity: 1,
    instructions: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const selectedType = CLOTH_TYPES.find(t => t.id === formData.clothType);
    setTotalPrice((selectedType?.price || 0) * formData.quantity);
  }, [formData.clothType, formData.quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...formData,
      totalPrice,
      status: 'Order Placed',
      createdAt: new Date().toISOString()
    };

    storage.saveOrder(newOrder);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/tracking');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-blue-100"
          >
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Book Your Pickup</h1>
              <p className="text-gray-500">Fill in the details below to schedule your laundry pickup.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" /> Full Name
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" /> Phone Number
                  </label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" /> Pickup Address
                </label>
                <textarea 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                  placeholder="Enter your full address with landmark..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" /> Pickup Date
                  </label>
                  <input 
                    required
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <Package className="h-4 w-4 mr-2 text-blue-500" /> Cloth Type
                  </label>
                  <select 
                    value={formData.clothType}
                    onChange={(e) => setFormData({...formData, clothType: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    {CLOTH_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name} (₹{type.price}/pc)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <Calculator className="h-4 w-4 mr-2 text-blue-500" /> Quantity (pcs)
                  </label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-blue-500" /> Special Instructions
                  </label>
                  <input 
                    type="text" 
                    value={formData.instructions}
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. Handle with care, No bleach"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center group"
              >
                Confirm Booking
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Summary Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-80 space-y-6"
          >
            <div className="bg-blue-900 text-white p-8 rounded-[2rem] shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Calculator className="mr-2 h-5 w-5" /> Order Summary
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-blue-200">
                  <span>Service Type</span>
                  <span className="text-white font-medium">{CLOTH_TYPES.find(t => t.id === formData.clothType)?.name}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Quantity</span>
                  <span className="text-white font-medium">{formData.quantity} pcs</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Price per pc</span>
                  <span className="text-white font-medium">₹{CLOTH_TYPES.find(t => t.id === formData.clothType)?.price}</span>
                </div>
                <div className="pt-4 border-t border-blue-800 flex justify-between items-end">
                  <span className="text-blue-200">Total Amount</span>
                  <span className="text-3xl font-black">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Free Pickup</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">We offer free pickup and delivery for orders above ₹200.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-900/40 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-blue-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 mb-8">Your laundry pickup has been scheduled. Redirecting to tracking...</p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="bg-blue-600 h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
