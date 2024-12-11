import React from "react";

const EffortlessEnrollment = () => {
  return (
    <div className="bg-blue-900 text-white py-16 px-8 relative">
      {/* Orange Circle Background */}
      <div className="absolute left-0 top-0 h-96 w-96 bg-orange-500 rounded-full opacity-90 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Effortless Enrollment</h2>
          <p className="text-gray-300 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>
        </div>

        {/* Right Side: Steps */}
        <div className="md:w-1/2">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-center bg-white text-blue-900 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-blue-900 text-white rounded-full">
                01
              </div>
              <p className="ml-4 font-semibold">Choose a Program</p>
            </div>
            {/* Step 2 */}
            <div className="flex items-center bg-white text-blue-900 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-blue-900 text-white rounded-full">
                02
              </div>
              <p className="ml-4 font-semibold">Enroll and Submit Documents</p>
            </div>
            {/* Step 3 */}
            <div className="flex items-center bg-white text-blue-900 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-blue-900 text-white rounded-full">
                03
              </div>
              <p className="ml-4 font-semibold">Choose a Date and Time</p>
            </div>
            {/* Step 4 */}
            <div className="flex items-center bg-white text-blue-900 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-blue-900 text-white rounded-full">
                04
              </div>
              <p className="ml-4 font-semibold">Pick an Instructor</p>
            </div>
            {/* Step 5 */}
            <div className="flex items-center bg-white text-blue-900 rounded-lg shadow-lg px-4 py-3 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-blue-900 text-white rounded-full">
                05
              </div>
              <p className="ml-4 font-semibold">Then Start</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffortlessEnrollment;
