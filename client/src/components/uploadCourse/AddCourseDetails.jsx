import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddCourseDetails = () => {
    const navigate = useNavigate();

    const [learnPoints, setLearnPoints] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [newLearnPoint, setNewLearnPoint] = useState('');
    const [newRequirement, setNewRequirement] = useState('');

    const addLearnPoint = () => {
        if (newLearnPoint.trim() !== '') {
            setLearnPoints([...learnPoints, newLearnPoint]);
            setNewLearnPoint('');
        }
    };

    const addRequirement = () => {
        if (newRequirement.trim() !== '') {
            setRequirements([...requirements, newRequirement]);
            setNewRequirement('');
        }
    };

    const removeLearnPoint = (index) => {
        setLearnPoints(learnPoints.filter((_, i) => i !== index));
    };

    const removeRequirement = (index) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (learnPoints.length === 0 || requirements.length === 0) {
            alert('Please add at least one point for "What You\'ll Learn" and "Requirements"');
            return;
        }
        // Proceed to next page
        navigate('/add-weeks-and-videos'); // Replace with the actual route
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg mx-auto p-6 shadow-md bg-gray-800 rounded-lg"
        >
            <h1 className="text-2xl font-semibold text-center mb-4 text-white">Add Course Details</h1>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">What You'll Learn</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add a point"
                        value={newLearnPoint}
                        onChange={(e) => setNewLearnPoint(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="button"
                        onClick={addLearnPoint}
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
                <ul className="space-y-2">
                    {learnPoints.map((point, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center px-3 py-2 bg-gray-700 rounded-md text-white"
                        >
                            {point}
                            <button onClick={() => removeLearnPoint(index)} className="text-red-400 hover:text-red-600">
                                <Trash className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add a requirement"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="button"
                        onClick={addRequirement}
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
                <ul className="space-y-2">
                    {requirements.map((req, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center px-3 py-2 bg-gray-700 rounded-md text-white"
                        >
                            {req}
                            <button
                                onClick={() => removeRequirement(index)}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between gap-2">
                <button
                    type="button"
                    onClick={() => navigate(-1)} // Navigate back
                    className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleNext} // Navigate forward
                    className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

export default AddCourseDetails;
