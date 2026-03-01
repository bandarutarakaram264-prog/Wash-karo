import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, BadgeIndianRupee, ArrowRight, Star, Clock, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-50 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Star className="h-4 w-4 fill-current" />
                <span>Rated #1 Laundry Service in Town</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 leading-tight">
                Fresh Clothes, <br />
                <span className="text-blue-600">Zero Effort.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Experience the most convenient laundry service. We pick up, wash, dry, fold, and deliver back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/book" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center group"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/tracking" 
                  className="bg-white text-blue-600 border-2 border-blue-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center"
                >
                  Track Order
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white"
                      referrerPolicy="no-referrer"
                      alt="User"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Joined by <span className="text-blue-600 font-bold">2,000+</span> happy customers
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <img 
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800" 
                alt="Laundry Service" 
                className="rounded-3xl shadow-2xl relative z-10 border-8 border-white"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fastest Delivery</p>
                  <p className="text-lg font-extrabold text-blue-900">Under 24 Hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us</h2>
            <p className="text-4xl font-extrabold text-blue-900 mb-6">Premium Care for Your Premium Clothes</p>
            <p className="text-gray-500 text-lg">We combine traditional care with modern technology to give your clothes the best treatment possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-blue-600" />,
                title: "Fast Delivery",
                desc: "Get your clothes back fresh and clean within 24 hours of pickup. No more waiting for days."
              },
              {
                icon: <BadgeIndianRupee className="h-8 w-8 text-blue-600" />,
                title: "Affordable Pricing",
                desc: "Transparent and budget-friendly rates for students and professionals. No hidden charges."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
                title: "Quality Wash",
                desc: "We use premium detergents and advanced machines to ensure your clothes stay vibrant and soft."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-blue-50 border border-blue-100 hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-blue-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-blue-200">Simple 4-step process to get your laundry done.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Book Online", desc: "Schedule a pickup through our app or website." },
              { step: "02", title: "We Pickup", desc: "Our rider arrives at your doorstep to collect clothes." },
              { step: "03", title: "We Wash", desc: "Expert cleaning using premium products and care." },
              { step: "04", title: "Fast Delivery", desc: "Freshly laundered clothes delivered back to you." }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-blue-800 absolute -top-8 -left-4 opacity-50">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-blue-900 mb-4">What Our Customers Say</h2>
              <p className="text-gray-500">Join thousands of satisfied users who trust Wash Karo for their daily laundry needs.</p>
            </div>
            <Link to="/signup" className="mt-8 md:mt-0 text-blue-600 font-bold flex items-center hover:underline">
              View all reviews <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", role: "College Student", text: "As a student, I barely have time for laundry. Wash Karo is a lifesaver! Affordable and fast." },
              { name: "Priya Patel", role: "Software Engineer", text: "The quality of wash is amazing. My white clothes look brand new every time. Highly recommended!" },
              { name: "Amit Kumar", role: "Business Owner", text: "Professional service and very punctual. The tracking feature helps me plan my day better." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-gray-100 bg-gray-50">
                <div className="flex items-center space-x-1 text-yellow-500 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-6">"{item.text}"</p>
                <div className="flex items-center space-x-4">
                  <img src={`https://picsum.photos/seed/${item.name}/100/100`} className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" alt={item.name} />
                  <div>
                    <p className="font-bold text-blue-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-blue-100">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">Ready for Fresh Clothes?</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Sign up today and get 20% off on your first booking. Experience the best laundry service in town.</p>
            <Link 
              to="/signup" 
              className="inline-block bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
