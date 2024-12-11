import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How do I sign up?",
      answer: "Signing up is easy! Click the 'Sign Up Now' button at the top of the page and follow the steps.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings.",
    },
    {
      question: "Do you provide certifications?",
      answer: "Absolutely! You’ll receive a certification upon completing a course.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 7-day free trial for all new users.",
    },
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-6">
        {/* Title Heading */}
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Optional Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-semibold focus:outline-none"
                onClick={() => handleToggle(index)}
              >
                {faq.question}
                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedIndex === index && (
                <motion.div
                  className="px-4 py-3 text-gray-600"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
