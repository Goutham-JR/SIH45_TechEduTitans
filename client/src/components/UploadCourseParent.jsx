import React, { useState } from "react";
import CourseUpload from "./CourseDetailUpload"; // Step 1
import LearnAndRequirements from "./UploadLearnAndRequirements"; // Step 2
import AddWeeksAndVideos from "./UploadAddWeeksAndVideos"; // Step 3
import AddQuizzes from "./UploadQuizzes"; // Step 4
import FinalReview from "./UploadFinalReview"; // Step 5

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    trailer: null,
    learnPoints: [],
    requirements: [],
    weeks: [],
    quizzes: [],
  });

  const handleNext = (data) => {
    console.log("Data Received from Step:", data);
    setCourseData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Final Course Data:", courseData);
    alert("Course uploaded successfully!");
    // Submit courseData to the backend
  };

  return (
    <div>
      {step === 1 && (
        <CourseUpload
          onNext={(data) => handleNext(data)}
        />
      )}
      {step === 2 && (
        <LearnAndRequirements
          onBack={handleBack}
          onNext={(data) => handleNext(data)}
          initialData={{
            learnPoints: courseData.learnPoints,
            requirements: courseData.requirements,
          }}
        />
      )}
      {step === 3 && (
        <AddWeeksAndVideos
          onBack={handleBack}
          onNext={(data) => handleNext(data)}
          initialData={courseData.weeks}
        />
      )}
      {step === 4 && (
        <AddQuizzes
          onBack={handleBack}
          onNext={(data) => handleNext(data)}
          initialData={courseData.quizzes}
        />
      )}
      {step === 5 && (
        <FinalReview
          data={courseData}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MultiStepForm;
