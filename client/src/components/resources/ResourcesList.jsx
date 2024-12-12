import { motion } from "framer-motion";
import { FaFilePdf, FaVideo, FaLink } from "react-icons/fa";

const resourceList = [
	{ title: "AI Fundamentals", type: "PDF", link: "#" },
	{ title: "Machine Learning Basics", type: "Video", link: "#" },
	{ title: "AI Ethics Article", type: "Link", link: "#" },
	{ title: "Deep Learning Guide", type: "PDF", link: "#" },
	{ title: "Neural Networks Explained", type: "Video", link: "#" },
];

const typeIcons = {
	PDF: <FaFilePdf className="text-red-500 text-2xl" />,
	Video: <FaVideo className="text-blue-500 text-2xl" />,
	Link: <FaLink className="text-green-500 text-2xl" />,
};

const ResourcesList = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			{/* Header */}
			<h1 className="text-2xl font-bold text-white">Resource List</h1>
			<p className="text-gray-300">Access all your resources in one place, categorized by type.</p>

			{/* Resource List */}
			<ul className="divide-y divide-gray-700">
				{resourceList.map((resource, index) => (
					<li
						key={index}
						className="flex items-center justify-between py-4 px-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
					>
						{/* Resource Details */}
						<div className="flex items-center space-x-4">
							{/* Type Icon */}
							<div>{typeIcons[resource.type]}</div>
							{/* Title */}
							<span className="text-gray-100 text-lg font-medium">{resource.title}</span>
						</div>

						{/* Action Buttons */}
						<div className="flex space-x-4">
							{resource.type === "PDF" && (
								<a
									href={resource.link}
									download
									className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
								>
									Download
								</a>
							)}
							<a
								href={resource.link}
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
							>
								View Online
							</a>
						</div>
					</li>
				))}
			</ul>
		</motion.div>
	);
};

export default ResourcesList;
