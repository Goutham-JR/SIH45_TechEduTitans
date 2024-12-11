import React from "react";
import { motion } from "framer-motion";
import { UserPlus, BookOpen, PlayCircle, Award } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserPlus className="w-8 h-8 text-blue-600" />,
    title: "Sign Up",
    description: "Create your account in seconds.",
  },
  {
    id: 2,
    icon: <BookOpen className="w-8 h-8 text-green-600" />,
    title: "Browse Courses",
    description: "Find courses that match your interest.",
  },
  {
    id: 3,
    icon: <PlayCircle className="w-8 h-8 text-orange-600" />,
    title: "Start Learning",
    description: "Access video lessons and interactive content.",
  },
  {
    id: 4,
    icon: <Award className="w-8 h-8 text-purple-600" />,
    title: "Earn Certificates",
    description: "Complete courses and showcase your skills.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Title Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How to Get Started?
        </h2>

        {/* Steps Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="mb-4 p-4 bg-gray-100 rounded-full shadow-lg">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2">{step.description}</p>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 h-1 bg-gray-300 mt-8"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
