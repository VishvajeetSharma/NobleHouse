import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import logoImg from "../../assets/Images/noble-house-logo-full.png";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E7DCD7] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="/dashboard" className="inline-block group">
              <img
                src={logoImg}
                alt="NOBLE HOUSE"
                className="h-24 sm:h-28 md:h-32 w-auto max-w-[280px] object-contain object-left transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <p className="text-[#75676A] text-sm leading-relaxed">
              Where fashion meets elegance — discover timeless luxury pieces crafted for the modern connoisseur.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] hover:bg-[#4A101C] hover:text-white transition-all duration-300 shadow-xs"
              >
                <FaFacebook size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] hover:bg-[#4A101C] hover:text-white transition-all duration-300 shadow-xs"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] hover:bg-[#4A101C] hover:text-white transition-all duration-300 shadow-xs"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F1E8E2] flex items-center justify-center text-[#4A101C] hover:bg-[#4A101C] hover:text-white transition-all duration-300 shadow-xs"
              >
                <FaHeart size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif font-bold text-[#241719] mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/products"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  Sale &amp; Privé
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  Collections
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-serif font-bold text-[#241719] mb-4 text-sm uppercase tracking-wider">
              Concierge
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/about"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  The Atelier
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-[#75676A] hover:text-[#4A101C] text-sm transition font-medium"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-serif font-bold text-[#241719] mb-4 text-sm uppercase tracking-wider">
              Client Service
            </h3>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-2.5 text-[#75676A] text-sm">
                <FaMapMarkerAlt className="text-[#812D3A] shrink-0" size={14} />
                <span>Bandra West, Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#75676A] text-sm">
                <FaClock className="text-[#812D3A] shrink-0" size={14} />
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#75676A] text-sm">
                <FaEnvelope className="text-[#812D3A] shrink-0" size={14} />
                <a
                  href="mailto:info@noblehouse.com"
                  className="hover:text-[#4A101C] transition-colors"
                >
                  info@noblehouse.com
                </a>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="mt-4">
              <p className="text-[#75676A] text-sm mb-2 font-medium">
                Subscribe for private preview invitations
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-2 text-sm border border-[#E7DCD7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A66A75] focus:border-transparent transition bg-[#FAF7F2] text-[#241719] placeholder-[#75676A]"
                  required
                />
                <button
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(135deg, #4A101C 0%, #812D3A 100%)",
                  }}
                  className="px-5 py-2 text-white rounded-full hover:brightness-110 shadow-sm transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                >
                  <span>Join</span>
                  <FaArrowRight size={10} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E7DCD7] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#75676A]">
            © {new Date().getFullYear()} NOBLE HOUSE. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs font-medium">
            <a
              href="/privacy"
              className="text-[#75676A] hover:text-[#4A101C] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[#75676A] hover:text-[#4A101C] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/shipping"
              className="text-[#75676A] hover:text-[#4A101C] transition-colors"
            >
              Shipping &amp; Duties
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
