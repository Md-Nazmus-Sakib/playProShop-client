import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 my-12 rounded-t-xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">PlayProShop</h3>
            <p className="text-sm">The best place to buy your gaming gear.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <a href="/" className="block mb-2 text-white">
              Home
            </a>
            <a href="/shop" className="block mb-2 text-white">
              Shop
            </a>
            <a href="/about" className="block mb-2 text-white">
              About Us
            </a>
            <a href="/contact" className="block mb-2 text-white">
              Contact Us
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <a href="/faqs" className="block mb-2 text-white">
              FAQs
            </a>
            <a href="/shipping" className="block mb-2 text-white">
              Shipping & Returns
            </a>
            <a href="/tracking" className="block mb-2 text-white">
              Order Tracking
            </a>
            <a href="/privacy" className="block mb-2 text-white">
              Privacy Policy
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <a href="https://facebook.com" className="block mb-2 text-white">
              Facebook
            </a>
            <a href="https://twitter.com" className="block mb-2 text-white">
              Twitter
            </a>
            <a href="https://instagram.com" className="block mb-2 text-white">
              Instagram
            </a>
            <a href="https://youtube.com" className="block mb-2 text-white">
              YouTube
            </a>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm">© 2024 PlayProShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
