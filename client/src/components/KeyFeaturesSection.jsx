import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, PlayCircle, ShieldCheck, BookOpen, Users, Globe } from "lucide-react";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    title: "Expert Instructors",
    description: "Courses designed by top professionals.",
  },
  {
    icon: <PlayCircle className="w-8 h-8 text-green-500" />,
    title: "Interactive Content",
    description: "Engaging videos, quizzes, and live sessions.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Certification",
    description: "Earn globally recognized certificates.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: "Flexible Learning",
    description: "Learn anytime, anywhere, on any device.",
  },
  {
    icon: <Users className="w-8 h-8 text-red-500" />,
    title: "Community Support",
    description: "Join a vibrant community of learners.",
  },
  {
    icon: <Globe className="w-8 h-8 text-teal-500" />,
    title: "Global Reach",
    description: "Access courses from anywhere in the world.",
  },
];

const KeyFeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      {/* Section Heading */}
      <motion.h2
        className="text-center text-3xl font-bold text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose Our LMS?
      </motion.h2>

      {/* Features Grid */}
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex items-start gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Icon */}
            <div className="flex-shrink-0">{feature.icon}</div>
            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default KeyFeaturesSection;
