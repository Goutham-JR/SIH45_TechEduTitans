import { motion } from "framer-motion";
const AboutCompany = ({ data }) => {
  const { header, description, videoUrl } = data;

  return (
    <motion.div
      className="bg-[#091057] py-16" // Single color background (dark purple)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-white text-4xl font-semibold mb-6">{header}</h2>

        {/* Description */}
        <p className="text-white text-lg mb-12 max-w-2xl mx-auto">{description}</p>

        {/* Video Section */}
        <div className="mx-auto w-full max-w-3xl">
          {/* Replaceable video */}
          <iframe
            className="w-full h-72 rounded-lg" // Rounded edges for the video
            src={videoUrl}
            title="Company Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCompany;
