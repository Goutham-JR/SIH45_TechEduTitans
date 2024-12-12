import { motion } from "framer-motion";
import { useState } from "react";

const resourceList = [
	{ title: "AI Fundamentals add pdf link", type: "PDF", link: "https://drive.google.com/file/d/172peB-2VDgX8EhK81v473SQL9Xk1wIoR/view" },
	{ title: "Machine Learning Basics", type: "Video", link: "https://www.youtube.com/embed/example" },
	{ title: "AI Ethics Article", type: "Link", link: "https://example.com/ai-ethics" },
	{ title: "Deep Learning Guide  add pdf link", type: "PDF", link: "https://drive.google.com/file/d/172peB-2VDgX8EhK81v473SQL9Xk1wIoR/view" },
	{ title: "Neural Networks Explained", type: "Video", link: "https://www.youtube.com/embed/example2" },
];

const ResourceViewer = () => {
	const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

	const currentResource = resourceList[currentResourceIndex];

	// Function to handle navigation between resources
	const handleNavigation = (direction) => {
		if (direction === "prev" && currentResourceIndex > 0) {
			setCurrentResourceIndex(currentResourceIndex - 1);
		} else if (
			direction === "next" &&
			currentResourceIndex < resourceList.length - 1
		) {
			setCurrentResourceIndex(currentResourceIndex + 1);
		}
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 space-y-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			{/* Header */}
			<h1 className="text-2xl font-bold text-white">Resource Viewer</h1>
			<p className="text-gray-300">
				View and interact with your learning resources directly.
			</p>

			{/* Resource Display */}
			<div className="bg-gray-700 p-4 rounded-lg space-y-4">
				<h2 className="text-lg font-medium text-white">{currentResource.title}</h2>

				{/* Conditional Rendering for Resource Types */}
				{currentResource.type === "PDF" && (
					<iframe
						src={currentResource.link}
						className="w-full h-96 rounded-lg border border-gray-600"
						title={currentResource.title}
					></iframe>
				)}

				{currentResource.type === "Video" && (
					<div className="aspect-w-16 aspect-h-9">
						<iframe
							src={currentResource.link}
							className="w-full h-full rounded-lg"
							title={currentResource.title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				)}

				{currentResource.type === "Link" && (
					<a
						href={currentResource.link}
						target="_blank"
						rel="noopener noreferrer"
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 inline-block"
					>
						Open Link
					</a>
				)}
			</div>

			{/* Navigation Buttons */}
			<div className="flex justify-between">
				<button
					className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
					onClick={() => handleNavigation("prev")}
					disabled={currentResourceIndex === 0}
				>
					Previous
				</button>
				<button
					className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
					onClick={() => handleNavigation("next")}
					disabled={currentResourceIndex === resourceList.length - 1}
				>
					Next
				</button>
			</div>
		</motion.div>
	);
};

export default ResourceViewer;
