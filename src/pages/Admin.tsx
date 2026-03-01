import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  WashingMachine, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  User,
  Phone,
  MapPin,
  RefreshCcw
} from 'lucide-react';
import { storage } from '../utils/storage';
import { Order } from '../types';

const STATUS_OPTIONS: Order['status'][] = [
  'Order Placed',
  'Picked Up',
  'Washing',
  'Out for Delivery',
  'Delivered'
];

export default function Admin() {
  const navigate = useNavigate();
  const [currentUser] = useState(() => storage.getCurrentUser());
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/');
      return;
    }
    setOrders(storage.getOrders().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  }, [currentUser, navigate]);

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    storage.updateOrderStatus(orderId, newStatus);
    setOrders(storage.getOrders().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-600';
      case 'Picked Up': return 'bg-purple-100 text-purple-600';
      case 'Washing': return 'bg-yellow-100 text-yellow-600';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-600';
      case 'Delivered': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-blue-900 flex items-center">
              <LayoutDashboard className="mr-3 h-8 w-8 text-blue-600" /> Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage all laundry orders and track business performance.</p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total Orders</p>
                <p className="text-xl font-black text-blue-900">{orders.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-green-50 p-2 rounded-lg">
                <RefreshCcw className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Revenue</p>
                <p className="text-xl font-black text-blue-900">₹{orders.reduce((sum, o) => sum + o.totalPrice, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Customer Name or Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Order Info</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Details</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => (
                  <motion.tr 
                    layout
                    key={order.id} 
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-blue-900 text-sm mb-1">#{order.id}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {order.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{order.userName}</p>
                          <p className="text-xs text-gray-500 flex items-center"><Phone className="h-3 w-3 mr-1" /> {order.phoneNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-700">{order.clothType.charAt(0).toUpperCase() + order.clothType.slice(1)}</p>
                      <p className="text-xs text-gray-500">{order.quantity} pcs • ₹{order.totalPrice}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                        className="text-xs font-bold bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center">
              <Package className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
