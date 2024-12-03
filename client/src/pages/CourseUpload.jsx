import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const OverviewPage = () => {
  const [userId, setUserId] = useState(null);
  const [couseId, setCourseId] = useState(null);
  // Fetch current user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          {
            withCredentials: true, // Ensure credentials like cookies are sent
          }
        );
        if (response.data && response.data.user.id) {
          setUserId(response.data.user.id);
        } else {
          console.error("User ID not found in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);
  const [courses, setCourses] = useState([
    { title: "", description: "", learnings: [""], requirements: [""] },
  ]);
  const [step, setStep] = useState(1);
  const [trailer, setTrailer] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);
  const [dropzoneType, setDropzoneType] = useState("");

  const addVideo = (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];

    // Ensure `weeks` exists in the course object
    if (!updatedCourses[courseIndex].weeks[weekIndex].videos) {
      updatedCourses[courseIndex].weeks[weekIndex].videos = [];
    }

    // Add a new video with a default `loading` state
    updatedCourses[courseIndex].weeks[weekIndex].videos.push({
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      resources: null,
      loading: false, // New video starts with loading set to false
    });

    // Update the courses state
    setCourses(updatedCourses);
  };

  const updateVideoField = (
    courseIndex,
    weekIndex,
    videoIndex,
    field,
    value
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex][field] =
      value;
    setCourses(updatedCourses);
  };
  const removeWeek = (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks.splice(weekIndex, 1);
    setCourses(updatedCourses);
  };

  const removeVideo = (courseIndex, weekIndex, videoIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks[weekIndex].videos.splice(videoIndex, 1);
    setCourses(updatedCourses);
  };

  const submitQuiz = async (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];
    const week = updatedCourses[courseIndex].weeks[weekIndex];

    if (!couseId || !week.quiz || week.quiz.questions.length === 0) {
      alert("Please ensure a course ID and valid quiz questions are provided!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseId", couseId); // Ensure courseId is set
      formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
      formData.append("questions", JSON.stringify(week.quiz.questions)); // Serialize quiz questions

      // Send POST request to /api/course/uploadquiz
      const response = await axios.post(
        "http://localhost:5000/api/course/uploadquiz",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Quiz uploaded successfully:", response.data);
      alert("Quiz uploaded successfully!");

      // Optionally lock the UI or disable further edits for this quiz
      week.quizUploaded = true;
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error uploading quiz:", error);
      alert("Failed to upload quiz. Please try again.");
    }
  };

  const submitVideo = async (courseIndex, weekIndex, videoIndex) => {
    try {
      const updatedCourses = [...courses];
      const video =
        updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex];

      if (video.loading) {
        // Prevent multiple submissions
        return;
      }

      const {
        title,
        description,
        thumbnail,
        video: videoFile,
        resources,
      } = video;

      if (!title || !description || !thumbnail || !videoFile) {
        alert(
          "Please fill all required fields and upload the necessary files."
        );
        return;
      }

      // Set loading state to true for this specific video
      video.loading = true;
      setCourses(updatedCourses);

      const formData = new FormData();
      formData.append("courseId", couseId);
      formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("video", videoFile);

      if (resources) {
        formData.append("resource", resources);
      }

      const response = await axios.post(
        "http://localhost:5000/api/course/uploadweeks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Video uploaded successfully:", response.data);
      alert("Video uploaded successfully!");

      // Set loading state to false after successful upload
      video.loading = true; // Lock it to "Uploaded" state
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");

      // Reset loading state on error
      const updatedCourses = [...courses];
      updatedCourses[courseIndex].weeks[weekIndex].videos[
        videoIndex
      ].loading = false;
      setCourses(updatedCourses);
    }
  };

  const onDrop = (acceptedFiles) => {
    console.log("dropzoneType:", dropzoneType); // Debug log
    console.log("Accepted Files:", acceptedFiles); // Debug log

    const updatedCourses = [...courses];

    if (dropzoneType === "trailer") {
      // Handle trailer upload for step 2
      setTrailer(acceptedFiles[0]);
      console.log("Trailer uploaded:", acceptedFiles[0]);
    } else if (dropzoneType === "thumbnail") {
      // Handle course-level thumbnail upload for step 2
      setThumbnail(acceptedFiles[0]);
      console.log("Course thumbnail uploaded:", acceptedFiles[0]);
    } else if (dropzoneType && dropzoneType.includes("-")) {
      // Handle video-related uploads in step 3
      const [courseIndex, weekIndex, videoIndex, fileType] =
        dropzoneType.split("-");

      if (dropzoneType && dropzoneType.includes("-")) {
        const [courseIndex, weekIndex, videoIndex, fileType] =
          dropzoneType.split("-");

        if (
          updatedCourses[courseIndex] &&
          updatedCourses[courseIndex].weeks &&
          updatedCourses[courseIndex].weeks[weekIndex] &&
          updatedCourses[courseIndex].weeks[weekIndex].videos &&
          updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex]
        ) {
          // Update the specified field (e.g., thumbnail or video) for the video
          updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex][
            fileType
          ] = acceptedFiles[0];

          console.log(
            `Updated ${fileType} for video:`,
            updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex]
          );
          setCourses(updatedCourses); // Update state
        } else {
          console.error("Invalid indices or video object.");
        }
      }
    } else {
      console.error("Invalid dropzoneType.");
    }

    setIsDropzoneOpen(false); // Close the modal
  };

  const addWeek = (courseIndex) => {
    const updatedCourses = [...courses];

    // Ensure `weeks` exists in the course object
    if (!updatedCourses[courseIndex].weeks) {
      updatedCourses[courseIndex].weeks = [];
    }

    // Add a new week object with an empty videos array
    updatedCourses[courseIndex].weeks.push({ videos: [] });

    // Update state
    setCourses(updatedCourses);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      dropzoneType === "trailer"
        ? { "video/*": ["video/*"] }
        : dropzoneType === "thumbnail"
        ? { "image/*": ["image/*"] }
        : dropzoneType.includes("video")
        ? { "video/*": ["video/*"] }
        : dropzoneType.includes("thumbnail")
        ? { "image/*": ["image/*"] }
        : dropzoneType.includes("resource")
        ? {
            "application/pdf": ["application/pdf"],
            "application/msword": ["application/msword"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ],
          }
        : {},
  });

  const openDropzone = (
    type,
    courseIndex = null,
    weekIndex = null,
    videoIndex = null,
    fileType = null
  ) => {
    // Step 2: Trailer and Course-Level Thumbnail
    if (type === "trailer" || (type === "thumbnail" && fileType === null)) {
      // Set dropzoneType to the global type (e.g., "trailer" or "thumbnail")
      setDropzoneType(type);
    }
    // Step 3: Specific file uploads for videos (e.g., "video", "thumbnail", "resource")
    else if (
      type === "video" ||
      type === "resource" ||
      fileType === "thumbnail"
    ) {
      // Set dropzoneType using specific indices and fileType
      setDropzoneType(`${courseIndex}-${weekIndex}-${videoIndex}-${fileType}`);
    }
    setIsDropzoneOpen(true); // Open the dropzone modal
  };

  const handleSubmitCourseDetails = async () => {
    try {
      // Extract data from the first course
      const course = courses[0]; // Assuming single course for simplicity
      const { title, description, learnings, requirements } = course;
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("courseTitle", title);
      formData.append("courseDescription", description);
      formData.append("whatyouwilllearn", learnings);
      formData.append("requirements", requirements);

      const response = await axios.post(
        "http://localhost:5000/api/course/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Course created successfully:", response.data);
      setCourseId(response.data.courseId);
    } catch (err) {
      console.error("Error submitting course details:", err);
    }
  };

  const addLearning = (index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].learnings.push("");
    setCourses(updatedCourses);
  };

  const removeLearning = (courseIndex, learnIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].learnings.splice(learnIndex, 1);
    setCourses(updatedCourses);
  };

  const addRequirement = (index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].requirements.push("");
    setCourses(updatedCourses);
  };

  const removeRequirement = (courseIndex, reqIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].requirements.splice(reqIndex, 1);
    setCourses(updatedCourses);
  };

  const updateCourseField = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const updateDynamicField = (courseIndex, field, fieldIndex, value) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex][field][fieldIndex] = value;
    setCourses(updatedCourses);
  };

  const handleTrailerAndThumbnailUpload = async () => {
    if (!trailer || !thumbnail || !couseId) {
      alert("Please ensure a trailer, thumbnail, and course ID are provided!");
      return;
    }

    // Prepare the FormData object
    const formData = new FormData();
    formData.append("courseId", couseId); // Ensure courseId is set
    formData.append("trailer", trailer);
    formData.append("thumbnail", thumbnail);

    try {
      // Send POST request to /api/course/uploadtrailer
      const response = await axios.post(
        "http://localhost:5000/api/course/uploadtrailer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "Trailer and thumbnail uploaded successfully:",
        response.data
      );
      alert("Trailer and Thumbnail uploaded successfully!");
    } catch (error) {
      console.error("Error uploading trailer and thumbnail:", error);
      alert("Failed to upload trailer and thumbnail. Please try again.");
    }
  };

  React.useEffect(() => {
    console.log("Updated courses state:", courses);
    console.log("Thumbnail:", thumbnail);
  }, [courses, thumbnail]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-[-1]">
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
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add Course Details</h2>
              {courses.map((course, courseIndex) => (
                <div key={courseIndex} className="mb-6">
                  <label className="block mb-2 font-semibold">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => {
                      updateCourseField(courseIndex, "title", e.target.value);
                    }}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                  />

                  <label className="block mb-2 font-semibold">
                    Description
                  </label>
                  <textarea
                    value={course.description}
                    onChange={(e) => {
                      updateCourseField(
                        courseIndex,
                        "description",
                        e.target.value
                      );
                    }}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                  />

                  <label className="block mb-2 font-semibold">
                    What You'll Learn
                  </label>
                  {course.learnings.map((learning, learnIndex) => (
                    <div key={learnIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={learning}
                        onChange={(e) =>
                          updateDynamicField(
                            courseIndex,
                            "learnings",
                            learnIndex,
                            e.target.value
                          )
                        }
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                      <button
                        onClick={() => removeLearning(courseIndex, learnIndex)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLearning(courseIndex)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Learning
                  </button>

                  <label className="block mt-4 mb-2 font-semibold">
                    Requirements
                  </label>
                  {course.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) =>
                          updateDynamicField(
                            courseIndex,
                            "requirements",
                            reqIndex,
                            e.target.value
                          )
                        }
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                      <button
                        onClick={() => removeRequirement(courseIndex, reqIndex)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addRequirement(courseIndex)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Requirement
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  handleSubmitCourseDetails();
                  setStep(2);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Upload Trailer and Thumbnail
              </h2>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => openDropzone("trailer")}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                  Upload Trailer
                </button>

                <button
                  onClick={() => openDropzone("thumbnail")}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                  Upload Thumbnail
                </button>

                {trailer && (
                  <p className="text-green-500">
                    Trailer Uploaded: {trailer.name}
                  </p>
                )}
                {thumbnail && (
                  <p className="text-green-500">
                    Thumbnail Uploaded: {thumbnail.name}
                  </p>
                )}
              </div>
              {isDropzoneOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                  onClick={() => setIsDropzoneOpen(false)} // Close modal on outside click
                >
                  <div
                    className="w-96 h-48 bg-gray-800 border border-gray-600 rounded flex justify-center items-center p-4 text-center"
                    onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                  >
                    <div
                      {...getRootProps()}
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-400">
                        Drag and drop a file here, or{" "}
                        <span className="text-blue-500">
                          click to select a file
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => {
                    handleTrailerAndThumbnailUpload();
                    setStep(3);
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add Course Content</h2>

              {courses.map((course, courseIndex) => (
                <div key={courseIndex}>
                  {/* Weeks */}
                  {course.weeks?.map((week, weekIndex) => (
                    <div key={weekIndex} className="mb-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold mb-2">
                          Week {weekIndex + 1}
                        </h3>
                        <button
                          onClick={() => removeWeek(courseIndex, weekIndex)}
                          className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                        >
                          Remove Week
                        </button>
                      </div>

                      {/* Videos in the Week */}
                      {week.videos?.map((video, videoIndex) => (
                        <div
                          key={videoIndex}
                          className="p-4 bg-gray-800 border border-gray-600 rounded mb-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-md font-semibold">
                              Video {videoIndex + 1}
                            </h4>
                            <button
                              onClick={() =>
                                removeVideo(courseIndex, weekIndex, videoIndex)
                              }
                              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                            >
                              Remove Video
                            </button>
                          </div>

                          <label className="block mb-2 font-semibold">
                            Video Title
                          </label>
                          <input
                            type="text"
                            value={video.title}
                            onChange={(e) =>
                              updateVideoField(
                                courseIndex,
                                weekIndex,
                                videoIndex,
                                "title",
                                e.target.value
                              )
                            }
                            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                          />

                          <label className="block mb-2 font-semibold">
                            Video Description
                          </label>
                          <textarea
                            value={video.description}
                            onChange={(e) =>
                              updateVideoField(
                                courseIndex,
                                weekIndex,
                                videoIndex,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                          />

                          <div className="flex space-x-4">
                            <button
                              onClick={() =>
                                openDropzone(
                                  "thumbnail",
                                  courseIndex,
                                  weekIndex,
                                  videoIndex,
                                  "thumbnail"
                                )
                              }
                              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                              Upload Thumbnail
                            </button>
                            <button
                              onClick={() =>
                                openDropzone(
                                  "video",
                                  courseIndex,
                                  weekIndex,
                                  videoIndex,
                                  "video"
                                )
                              }
                              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                              Upload Video
                            </button>
                            <button
                              onClick={() =>
                                openDropzone(
                                  "resource",
                                  courseIndex,
                                  weekIndex,
                                  videoIndex,
                                  "resources"
                                )
                              }
                              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                            >
                              Upload Resources (Optional)
                            </button>
                            <button
                              onClick={() =>
                                submitVideo(courseIndex, weekIndex, videoIndex)
                              }
                              disabled={video.loading}
                              className={
                                video.loading
                                  ? "px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-green-700"
                                  : "px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                              }
                            >
                              {video.loading ? "Uploaded" : "Submit Video"}
                            </button>
                          </div>
                          <div className="text-gray-300 mt-2">
                            {video.thumbnail && (
                              <p className="text-green-500">
                                Thumbnail: {video.thumbnail.name}
                              </p>
                            )}
                            {video.video && (
                              <p className="text-green-500">
                                Video: {video.video.name}
                              </p>
                            )}
                            {video.resources && (
                              <p className="text-green-500">
                                Resources: {video.resources.name}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Video Button */}
                      <button
                        onClick={() => addVideo(courseIndex, weekIndex)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                      >
                        Add Video
                      </button>
                    </div>
                  ))}

                  {/* Add Week Button */}
                  <button
                    onClick={() => addWeek(courseIndex)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                  >
                    Add Week
                  </button>
                </div>
              ))}

              {/* React Dropzone Modal */}
              {isDropzoneOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                  onClick={() => setIsDropzoneOpen(false)} // Close modal on outside click
                >
                  <div
                    className="w-96 h-48 bg-gray-800 border border-gray-600 rounded flex justify-center items-center p-4 text-center"
                    onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                  >
                    <div
                      {...getRootProps()}
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-400">
                        Drag and drop a file here, or{" "}
                        <span className="text-blue-500">
                          click to select a file
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add Quiz Content</h2>

              {courses.map((course, courseIndex) => (
                <div key={courseIndex}>
                  {course.weeks?.map((week, weekIndex) => (
                    <div key={weekIndex} className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Quiz for Week {weekIndex + 1}
                      </h3>

                      {!week.quiz && (week.quiz = { questions: [] })}

                      {week.quiz.questions.map((question, questionIndex) => (
                        <div
                          key={questionIndex}
                          className="mb-4 p-4 bg-gray-800 rounded"
                        >
                          <label className="block font-semibold">
                            Question {questionIndex + 1}
                          </label>
                          <input
                            type="text"
                            value={question.question}
                            onChange={(e) => {
                              const updatedCourses = [...courses];
                              updatedCourses[courseIndex].weeks[
                                weekIndex
                              ].quiz.questions[questionIndex].question =
                                e.target.value;
                              setCourses(updatedCourses);
                            }}
                            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                          />

                          {question.choices.map((choice, choiceIndex) => (
                            <div
                              key={choiceIndex}
                              className="flex items-center mb-2"
                            >
                              <input
                                type="text"
                                value={choice}
                                onChange={(e) => {
                                  const updatedCourses = [...courses];
                                  updatedCourses[courseIndex].weeks[
                                    weekIndex
                                  ].quiz.questions[questionIndex].choices[
                                    choiceIndex
                                  ] = e.target.value;
                                  setCourses(updatedCourses);
                                }}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                              />
                              <button
                                onClick={() => {
                                  const updatedCourses = [...courses];
                                  updatedCourses[courseIndex].weeks[
                                    weekIndex
                                  ].quiz.questions[
                                    questionIndex
                                  ].choices.splice(choiceIndex, 1);
                                  setCourses(updatedCourses);
                                }}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                Delete Choice
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => {
                              const updatedCourses = [...courses];
                              updatedCourses[courseIndex].weeks[
                                weekIndex
                              ].quiz.questions[questionIndex].choices.push("");
                              setCourses(updatedCourses);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Add Choice
                          </button>

                          <label className="block mt-4 mb-2 font-semibold">
                            Correct Answer
                          </label>
                          <select
                            value={question.correctAnswer}
                            onChange={(e) => {
                              const updatedCourses = [...courses];
                              updatedCourses[courseIndex].weeks[
                                weekIndex
                              ].quiz.questions[questionIndex].correctAnswer =
                                e.target.value;
                              setCourses(updatedCourses);
                            }}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          >
                            <option value="">Select the correct answer</option>
                            {question.choices.map((choice, choiceIndex) => (
                              <option key={choiceIndex} value={choice}>
                                {choice || `Choice ${choiceIndex + 1}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          const updatedCourses = [...courses];
                          updatedCourses[courseIndex].weeks[
                            weekIndex
                          ].quiz.questions.push({
                            question: "",
                            choices: [],
                            correctAnswer: "",
                          });
                          setCourses(updatedCourses);
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                      >
                        Add Question
                      </button>

                      <button
                        onClick={() => submitQuiz(courseIndex, weekIndex)}
                        className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={() => updateCourseFinal()}
                className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              >
                Submit Course
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
