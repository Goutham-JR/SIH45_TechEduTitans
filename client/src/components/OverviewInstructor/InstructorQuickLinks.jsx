import { motion } from "framer-motion";

const ContentEngagement = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">Content Engagement Rate</h2>
			<div className="space-y-4">
				<div className="bg-gray-700 rounded-full w-full h-4">
					<div
						className="bg-green-500 h-4 rounded-full"
						style={{ width: "70%" }}
					></div>
				</div>
				<p className="text-sm text-gray-400">Engangement Reach: 70% </p>
			</div>
		</motion.div>
	);
};

const QuickLinks = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">Quick Links</h2>
			<ul className="list-disc pl-6 space-y-2 text-gray-300 list-none">
				<li>
					<a
						href=""
						className="hover:text-blue-400 transition-colors duration-200"
					>
						Reports
					</a>
				</li>
				<li>
					<a
						href="#AddCourse"
						className="hover:text-blue-400 transition-colors duration-200"
					>
						Add Course
					</a>
				</li>
				<li>
					<a
						href="#resources"
						className="hover:text-blue-400 transition-colors duration-200"
					>
						Create Learning Path
					</a>
				</li>
			</ul>
		</motion.div>
	);
};

const Dashboard = () => {
	return (
    <div className="space-y-6">
      <ContentEngagement />
      <QuickLinks />
    </div>
  );
};

export default Dashboard;
