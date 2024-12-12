import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDropzone } from 'react-dropzone'; // Import useDropzone for drag-and-drop functionality

const UploadCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [trailer, setTrailer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

    const navigate = useNavigate(); // Initialize navigate

    const handleNext = () => {
        if (!title || !description || !trailer) {
            alert('Please fill in all fields before proceeding.');
            return;
        }
        // Logic to handle "Next" action
        console.log({ title, description, trailer });
        navigate('/add-course-details'); // Navigate to the next page
    };

    // Handle file drop from Dropzone
    const onDrop = (acceptedFiles) => {
        setTrailer(acceptedFiles[0]); // Set the trailer video file
        setIsModalOpen(false); // Close modal after file drop
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, // Handle file drop
        accept: 'video/*', // Only accept video files
        maxFiles: 1, // Allow only one file
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto p-6 shadow-md bg-gray-800 rounded-lg"
        >
            <h1 className="text-2xl font-semibold text-center mb-4 text-white">Upload Course</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Course Title</label>
                <input
                    type="text"
                    placeholder="Enter Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Course Description</label>
                <textarea
                    placeholder="Enter Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    rows="4"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Upload Trailer</label>
                <button
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    onClick={() => setIsModalOpen(true)} // Open the modal when clicked
                >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Trailer
                </button>
                {trailer && <p className="mt-2 text-sm text-green-400">File: {trailer.name}</p>}
            </div>

            <button
                type="button"
                onClick={handleNext}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
            >
                Next
            </button>

            {/* Modal with Dropzone */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Drop Video Trailer Here</h2>
                        <div
                            {...getRootProps()}
                            className="flex justify-center items-center p-6 border-2 border-dashed border-gray-300 rounded-lg"
                        >
                            <input {...getInputProps()} />
                            <p className="text-center text-gray-500">Drag & drop or click to select a file</p>
                        </div>
                        {trailer && <p className="mt-2 text-sm text-green-400">File: {trailer.name}</p>}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 text-center w-full py-2 bg-red-500 text-white font-medium rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default UploadCourse;
