import { useState } from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "../components/HeroSection";
import KeyFeaturesSection from "../components/KeyFeaturesSection";
import HowItWorks from "../components/HowItWorks";
import CallToActionSection from "../components/CallToActionSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import CardComponent from "../components/CardComponent";
import AboutCompany from "../components/AboutCompany";
import EffortlessEnrollment from "../components/EffortlessEnrollment";
import ProgramsAndTestimonials from "../components/ProgramsAndTestimonials";
import Header from "../components/Header";
const data = [
  { number: "150+", label: "Total Courses" },
  { number: "250", label: "Total Instructors" },
  { number: "35K+", label: "Total Students" },
];
const aboutCompanyData = {
  header: "About Our Company",
  description:
    "We are a leading company specializing in innovative solutions for the modern world. With a focus on quality and customer satisfaction, we deliver the best products and services. Our team is dedicated to excellence and growth.",
  videoUrl: "https://youtu.be/1yrh60og6qc?si=gOH_BWOUwpnVBFGr", // Replace with your video URL
};
const programData = [
  {
    imageUrl: "English.jpg",
    title: "English Programs",
    description:
      "Enhance your English skills with our expertly designed courses.",
  },
  {
    imageUrl: "Technology.jpg",
    title: "Technology Bootcamp",
    description:
      "Master the latest technologies with hands-on training and projects.",
  },
  {
    imageUrl: "Busniness.jpg",
    title: "Business Management",
    description: "Gain insights into effective business management practices.",
  },
];

const testimonialData = [
  {
    quote:
      "The programs are amazing! They helped me advance my career in ways I never imagined.",
    name: "James Thomas",
    location: "Germany",
    imageUrl: "https://via.placeholder.com/80",
  },
  {
    quote:
      "The interactive lessons and expert instructors make learning enjoyable and impactful.",
    name: "Aditi Sharma",
    location: "India",
    imageUrl: "https://via.placeholder.com/80",
  },
];

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header />
      <main className=" mx-auto   ">
        <HeroSection
          title="Welcome to Our Learning Platform"
          description="Join our courses to start learning today!"
          imageUrl="Modi.png"
        />

        <CardComponent data={data} />

        {/* ------ */}
        <KeyFeaturesSection />

        {/* -----        */}

        <AboutCompany data={aboutCompanyData} />
        
        {/* ----- no need to Effeort less         */}
        <ProgramsAndTestimonials
          programs={programData}
          testimonials={testimonialData}
        />

        <HowItWorks />

        <CallToActionSection />
        <FAQSection />
        <Footer />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Additional content can go here */}
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
