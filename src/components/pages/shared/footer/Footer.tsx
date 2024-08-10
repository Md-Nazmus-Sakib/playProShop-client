import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 mt-12 rounded-t-xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-4">PlayProShop</h3>
              <p className="text-sm">The best place to buy your gaming gear.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <a href="/" className="block mb-2 text-white hover:underline">
                Home
              </a>
              <a
                href="/product"
                className="block mb-2 text-white hover:underline"
              >
                Products
              </a>
              <a
                href="/about"
                className="block mb-2 text-white hover:underline"
              >
                About Us
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-col items-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mb-2 text-white hover:underline"
                >
                  <FaFacebook className="mr-2" />
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mb-2 text-white hover:underline"
                >
                  <FaTwitter className="mr-2" />
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mb-2 text-white hover:underline"
                >
                  <FaInstagramSquare className="mr-2" />
                  Instagram
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mb-2 text-white hover:underline"
                >
                  <FaYoutube className="mr-2" />
                  YouTube
                </a>
              </div>
            </div>
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
