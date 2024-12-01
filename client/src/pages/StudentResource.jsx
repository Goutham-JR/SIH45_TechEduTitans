import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import StatCard from "../components/StatCard";
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


const OverviewPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gray-800 shadow-lg">
          <Header />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex-1 overflow-auto relative z-10">

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
              {/* STATS */}
              <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <StatCard
                  name="Total Courses Enrolled"
                  icon={Zap}
                  value="10"
                  color="#6366F1"
                />
                <StatCard
                  name="Total Lessons Completed"
                  icon={Users}
                  value="123"
                  color="#8B5CF6"
                />
                <StatCard
                  name="Badges"
                  icon={ShoppingBag}
                  value="5"
                  color="#EC4899"
                />
                <StatCard
                  name="Total Learning Hours"
                  icon={BarChart2}
                  value="45 hrs"
                  color="#10B981"
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ResourcesList />
                <ResourceViewer />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
