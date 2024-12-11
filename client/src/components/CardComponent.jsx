import { motion } from "framer-motion";

const CardComponent = ({ data }) => {
  return (
    <motion.div
      className="w-full h-auto bg-gradient-to-r from-[#EC8305] to-[#091057] py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4">
        {/* Card Content */}
        <div className="text-center space-y-8">
          <h2 className="text-white text-4xl font-semibold">Learning Management System</h2>

          <div className="grid grid-cols-3 gap-10">
            {/* Dynamically render the data */}
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <p className="text-3xl font-bold">{item.number}</p>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardComponent;