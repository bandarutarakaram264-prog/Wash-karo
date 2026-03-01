import { WashingMachine, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <WashingMachine className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold tracking-tight">Wash Karo</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Premium laundry services delivered to your doorstep. We take care of your clothes so you can take care of your life.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-blue-200 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/book" className="hover:text-white transition-colors">Book Service</a></li>
              <li><a href="/tracking" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4 text-blue-200 text-sm">
              <li>Daily Wear Wash</li>
              <li>Dry Cleaning</li>
              <li>Heavy Laundry</li>
              <li>Steam Ironing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-blue-200 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>support@washkaro.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>123 Laundry Lane, Clean City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 text-center text-blue-400 text-xs">
          <p>© {new Date().getFullYear()} Wash Karo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
