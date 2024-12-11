// /src/components/common/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-700 text-white py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Education Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-400">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-gray-100">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  News & Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-gray-100">
                  How we work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">
              Akshya Nagar 1st Block 1st Cross, Ramamurthy Nagar,
              Bangalore-560016
            </p>
            <p className="text-sm text-gray-300 mt-2">+1 202-918-2132</p>
            <p className="text-sm text-gray-300 mt-2">education@mail.com</p>
            <a
              href="https://www.education.com"
              className="text-sm text-gray-300 mt-2 hover:text-gray-100"
            >
              www.education.com
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
