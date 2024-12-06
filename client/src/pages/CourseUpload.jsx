import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Joi from "joi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const OverviewPage = () => {
  const [userId, setUserId] = useState(null);
  const [couseId, setCourseId] = useState(null);
  const [keywords, setkeywords] = useState(null);
  const [courselanguage, setcourselanguage] = useState(null);
  const [level, setLevel] = useState(null);
  
  const extravalidationSchema = Joi.object({
    keywords: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .required()
      .messages({
        "string.pattern.base": "Keywords must contain only alphabets.",
        "any.required": "Keywords are required.",
        "string.base": "Keywords cannot be empty.",

      }),
    courselanguage: Joi.string()
      .pattern(/^[a-zA-Z]+$/)
      .required()
      .messages({
        "string.pattern.base": "Course language must contain only alphabets.",
        "any.required": "Course language is required.",
        "string.base": "Course language cannot be empty.",
      }),
      level: Joi.string()
      .valid("Beginner", "Intermediate", "Advanced") // Ensure only these values are valid
      .trim()  // Remove any leading/trailing spaces
      .required()
      .messages({
        "any.only": "Level must be selected from the available options.",
        "any.required": "Level is required.",
        "string.base": "Level must be a string."
      }),
  });
  
  // Function to validate the course data
  const validatefinal = ({ keywords, courselanguage, level }) => {
    const { error } = extravalidationSchema.validate({ keywords, courselanguage, level }, { abortEarly: false });
    if (error) {
      // Return all error messages concatenated if multiple errors exist
      return error.details[0].message;
    }
    return null; // Return null if validation passes
  };
  
  const finalizeCourses = async (keywords, courselanguage, level) => {
    // Validate the course data
    const errorMessage = validatefinal({ keywords, courselanguage, level });
  
    if (errorMessage) {
      // If validation fails, show the error message in the Snackbar
      setErrorMessage(errorMessage);
      setOpenSnackbar(true);
      return; // Stop further execution if validation fails
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/course/finalize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ couseId, keywords, courselanguage, level }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
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


  const courseSchema = Joi.array()
  .items(
    Joi.object({
      title: Joi.string().required().messages({
        "any.required": "Course title is required.",
        "string.empty": "Course title cannot be empty.",
      }),
      description: Joi.string().required().messages({
        "any.required": "Course description is required.",
        "string.empty": "Course description cannot be empty.",
      }),
      learnings: Joi.array()
        .items(Joi.string().required())
        .min(2)
        .messages({
          "array.min": "At least 2 learnings are required.",
        }),
      requirements: Joi.array()
        .items(Joi.string().required())
        .min(2)
        .messages({
          "array.min": "At least 2 requirements are required.",
        }),
      weeks: Joi.array()
        .items(
          Joi.object({
            title: Joi.string().required().messages({
              "any.required": "Week title is required.",
              "string.empty": "Week title cannot be empty.",
            }),
            videos: Joi.array()
              .items(
                Joi.object({
                  title: Joi.string().required().messages({
                    "any.required": "Video title is required.",
                    "string.empty": "Video title cannot be empty.",
                  }),
                  description: Joi.string().required().messages({
                    "any.required": "Video description is required.",
                    "string.empty": "Video description cannot be empty.",
                  }),
                  thumbnail: Joi.object().optional(),
                  video: Joi.object().optional(),
                  resources: Joi.object().optional(),
                  duration: Joi.number().optional(),
                })
              )
              .min(2)
              .messages({
                "array.min": "Each week must contain at least two videos.",
              }),
          })
        )
        .min(1)
        .messages({
          "array.min": "The course must have at least one week.",
        }),
    })
  )
  .required();

const validateCourses = (courses) => {
  const { error } = courseSchema.validate(courses, { abortEarly: false });
  if (error) {
    return error.details[0].message; 
  }
  return null;
};

  // Add Video Function
  const addVideo = (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];

    if (!updatedCourses[courseIndex].weeks[weekIndex].videos) {
      updatedCourses[courseIndex].weeks[weekIndex].videos = [];
    }

    updatedCourses[courseIndex].weeks[weekIndex].videos.push({
      title: "",
      description: "",
      thumbnail: null,
      video: null,
      resources: null,
      duration: 0,
      loading: false,
    });
    

    const errorMessage = validateCourses(updatedCourses);
    // if (errorMessage) {
    //   setErrorMessage(errorMessage);
    //   setOpenSnackbar(true);
    //   return;
    // }

    setCourses(updatedCourses);
  };

  // Remove Video Function
  const removeVideo = (courseIndex, weekIndex, videoIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks[weekIndex].videos.splice(videoIndex, 1);

    const errorMessage = validateCourses(updatedCourses);
    
    setCourses(updatedCourses);
  };

  // Add Week Function
  const addWeek = (courseIndex) => {
    const updatedCourses = [...courses];

    if (!updatedCourses[courseIndex].weeks) {
      updatedCourses[courseIndex].weeks = [];
    }

    // updatedCourses[courseIndex].weeks.push({ videos: [] });

    updatedCourses[courseIndex].weeks.push({ 
      title: "",  // Initialize with an empty title
      videos: [] 
    });

    const errorMessage = validateCourses(updatedCourses);
    // if (errorMessage) {
    //   setErrorMessage(errorMessage);
    //   setOpenSnackbar(true);
    //   return;
    // }

    setCourses(updatedCourses);
  };

  // Remove Week Function
  const removeWeek = (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks.splice(weekIndex, 1);

    const errorMessage = validateCourses(updatedCourses);
   

    setCourses(updatedCourses);
  };


  // const addVideo = (courseIndex, weekIndex) => {
  //   const updatedCourses = [...courses];

  //   // Ensure `weeks` exists in the course object
  //   if (!updatedCourses[courseIndex].weeks[weekIndex].videos) {
  //     updatedCourses[courseIndex].weeks[weekIndex].videos = [];
  //   }

  //   // Add a new video with a default `loading` state
  //   updatedCourses[courseIndex].weeks[weekIndex].videos.push({
  //     title: "",
  //     description: "",
  //     thumbnail: null,
  //     video: null,
  //     resources: null,
  //     duration: 0,
  //     loading: false, // New video starts with loading set to false
  //   });

  //   // Update the courses state
  //   setCourses(updatedCourses);
  // };

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
  // const removeWeek = (courseIndex, weekIndex) => {
  //   const updatedCourses = [...courses];
  //   updatedCourses[courseIndex].weeks.splice(weekIndex, 1);
  //   setCourses(updatedCourses);
  // };

  // const removeVideo = (courseIndex, weekIndex, videoIndex) => {
  //   const updatedCourses = [...courses];
  //   updatedCourses[courseIndex].weeks[weekIndex].videos.splice(videoIndex, 1);
  //   setCourses(updatedCourses);
  // };

  
  // const submitQuiz = async (courseIndex, weekIndex) => {
  //   const updatedCourses = [...courses];
  //   const week = updatedCourses[courseIndex].weeks[weekIndex];

  //   if (
  //     !couseId ||
  //     !week.quiz ||
  //     week.quiz.questions.length === 0 ||
  //     !week.title
  //   ) {
  //     alert("Please ensure a course ID and valid quiz questions are provided!");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("courseId", couseId); // Ensure courseId is set
  //     formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
  //     formData.append("weekTitle", week.title); // Week title
  //     formData.append("questions", JSON.stringify(week.quiz.questions)); // Serialize quiz questions

  //     // Send POST request to /api/course/uploadquiz
  //     const response = await axios.post(
  //       "http://localhost:5000/api/course/uploadquiz",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Quiz uploaded successfully:", response.data);
  //     alert("Quiz uploaded successfully!");

  //     // Optionally lock the UI or disable further edits for this quiz
  //     week.quizUploaded = true;
  //     setCourses(updatedCourses);
  //   } catch (error) {
  //     console.error("Error uploading quiz:", error);
  //     alert("Failed to upload quiz. Please try again.");
  //   }
  // };


  // const uploadvideoValidationSchema = Joi.object({
  //   weekTitle: Joi.string()
  //   .regex(/^[a-zA-Z\s]+$/)
  //   .required()
  //   .messages({
  //     "string.pattern.base": "Week title must contain only alphabets.",
     
  //   }),
  //   title: Joi.string()
  //     .pattern(/^[a-zA-Z\s]*$/) // Only alphabets and spaces
  //     .required()
  //     .messages({
  //       "string.pattern.base": "Title must contain only alphabets.",
        
  //     }),
  //   description: Joi.string()
  //     .pattern(/^[a-zA-Z\s]*$/) // Only alphabets and spaces
  //     .required()
  //     .messages({
  //       "string.pattern.base": "Description must contain only alphabets.",
        

  //     }),
  //   thumbnail: Joi.object({
  //     type: Joi.string()
  //       .regex(/^image\/.*/)
  //       .required()
  //       .messages({
  //         "string.pattern.base": "Thumbnail must be an image file.",
          
  //         "object.base": "Thumbnail must be a valid file",
  //       }),
  //   }),
  //   video: Joi.object({
  //     type: Joi.string()
  //       .regex(/^video\/.*/)
  //       .required()
  //       .messages({
  //         "string.pattern.base": "Video must be a video file.",
          
  //       }),
  //   }),
  //   resources: Joi.object({
  //     type: Joi.string()
  //       .regex(/^(application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/vnd.ms-excel|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet)$/)
  //       .optional()
  //       .messages({
  //         "string.pattern.base":
  //           "Resources must be a PDF, Word, or Excel file.",
  //       }),
  //   }),
  // });

  const quizValidationSchema = Joi.array().items(
    Joi.object({
      weeks: Joi.array().items(
        Joi.object({
          title: Joi.string().required().messages({
            "string.base": "Week title must be a string.",
            "any.required": "Week title is required.",
          }),
          quiz: Joi.object({
            questions: Joi.array().items(
              Joi.object({
                question: Joi.string()
                  .regex(/^[a-zA-Z].*$/)
                  .required()
                  .messages({
                    "string.pattern.base": "Each question must start with a letter.",
                    "any.required": "Each question is required.",
                  }),
                choices: Joi.array()
                  .length(4)
                  .items(Joi.string().required())
                  .required()
                  .messages({
                    "array.length": "Each question must have exactly 4 choices.",
                    "any.required": "Choices are required for each question.",
                  }),
                correctAnswer: Joi.string()
                  .required()
                  .custom((value, helpers) => {
                    const question = helpers.state.ancestors[0];
                    if (!question.choices.includes(value)) {
                      return helpers.error("any.invalid", { value });
                    }
                    return value;
                  })
                  .messages({
                    "any.invalid": "Correct answer must match one of the choices.",
                    "any.required": "Correct answer is required.",
                  }),
              })
            )
            .min(5)
            .messages({
              "array.min": "There must be at least 5 questions in the quiz.",
            }),
          }).optional(),
        })
      ).required(),
    })
  );

  const validateQuizData = (courses) => {
    const { error } = quizValidationSchema.validate(courses, { abortEarly: false });
    if (error) {
      return error.details.map((detail) => detail.message).join("\n"); // Return all error messages
    }
    return null;
  };


  const validatequiz = (week) => {
    const quizData = {
      questions: week.quiz?.questions || [],
    };
  
    // Initialize the error message
    let errorMessage = "";
  
    // Check if there are at least 5 questions
    if (quizData.questions.length < 5) {
      errorMessage = "The quiz must have at least 5 questions.";
      setErrorMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
  
    // Validate each question
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      const questionIndex = i + 1; // 1-based index for user-friendly error messages
  
      // Validate the question text
      if (!question.question || !/^[a-zA-Z].*$/.test(question.question)) {
        errorMessage = `Question ${questionIndex}: Question text must start with a letter.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
  
      // Validate the choices (must be exactly 4)
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        errorMessage = `Question ${questionIndex}: Must have exactly 4 choices.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
  
      // Validate that each choice is a non-empty string
      for (let j = 0; j < question.choices.length; j++) {
        if (!question.choices[j] || typeof question.choices[j] !== 'string') {
          errorMessage = `Question ${questionIndex}: Choices must be non-empty strings.`;
          setErrorMessage(errorMessage);
          setOpenSnackbar(true);
          return;
        }
      }
  
      // Validate the correct answer
      if (!question.correctAnswer || !question.choices.includes(question.correctAnswer)) {
        errorMessage = `Question ${questionIndex}: Correct answer must match one of the choices.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
    }
  }
  

  const submitQuiz = async (courseIndex, weekIndex) => {
    const updatedCourses = [...courses];
    const week = updatedCourses[courseIndex].weeks[weekIndex];

    validatequiz(week);
  
    // Prepare data for validation
    const quizData = {
      questions: week.quiz?.questions || [],
    };
  
    // Initialize the error message
    let errorMessage = "";
  
    // Check if there are at least 5 questions
    if (quizData.questions.length < 5) {
      errorMessage = "The quiz must have at least 5 questions.";
      setErrorMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
  
    // Validate each question
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      const questionIndex = i + 1; // 1-based index for user-friendly error messages
  
      // Validate the question text
      if (!question.question || !/^[a-zA-Z].*$/.test(question.question)) {
        errorMessage = `Question ${questionIndex}: Question text must start with a letter.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
  
      // Validate the choices (must be exactly 4)
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        errorMessage = `Question ${questionIndex}: Must have exactly 4 choices.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
  
      // Validate that each choice is a non-empty string
      for (let j = 0; j < question.choices.length; j++) {
        if (!question.choices[j] || typeof question.choices[j] !== 'string') {
          errorMessage = `Question ${questionIndex}: Choices must be non-empty strings.`;
          setErrorMessage(errorMessage);
          setOpenSnackbar(true);
          return;
        }
      }
  
      // Validate the correct answer
      if (!question.correctAnswer || !question.choices.includes(question.correctAnswer)) {
        errorMessage = `Question ${questionIndex}: Correct answer must match one of the choices.`;
        setErrorMessage(errorMessage);
        setOpenSnackbar(true);
        return;
      }
    }
  
    // Proceed with the quiz submission logic (send data to the backend)
    try {
      const formData = new FormData();
      formData.append("courseId", couseId); // Ensure courseId is set
      formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
      formData.append("weekTitle", week.title); // Week title
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
  
  
  

  /*const submitVideo = async (courseIndex, weekIndex, videoIndex) => {
    try {
      const updatedCourses = [...courses];
      const week = updatedCourses[courseIndex].weeks[weekIndex];
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

      if (!title || !description || !thumbnail || !videoFile || !week.title) {
        alert(
          "Please fill all required fields and upload the necessary files."
        );
        return;
      }

      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(videoFile);
      videoElement.onloadedmetadata = async () => {
        const videoDuration = videoElement.duration;

        // Set loading state to true for this specific video
        video.loading = true;
        setCourses(updatedCourses);

        const formData = new FormData();
        formData.append("courseId", couseId);
        formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
        formData.append("weekTitle", week.title);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);
        formData.append("video", videoFile);
        formData.append("duration", videoDuration);

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
      };
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
  };*/
  const submitVideo = async (courseIndex, weekIndex, videoIndex) => {
  try {
    const updatedCourses = [...courses];
    const week = updatedCourses[courseIndex].weeks[weekIndex];
    const video = updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex];

    if (video.loading) {
      // Prevent multiple submissions
      return;
    }

    const { title, description, thumbnail, video: videoFile, resources } = video;
    const weektitle = week.title || "";

    if (!title && !description && !thumbnail && !videoFile && !weektitle) {
      setErrorMessage("Please fill all required fields and upload the necessary files.");
      setOpenSnackbar(true);
      return;
    }

    if (!weektitle) {
      setErrorMessage("Week title is required.");
      setOpenSnackbar(true);
      return;
    }

    if (!title) {
      setErrorMessage("Video title is required.");
      setOpenSnackbar(true);
      return;
    }

    if (!description) {
      setErrorMessage("Description is required.");
      setOpenSnackbar(true);
      return;
    }


    if(!thumbnail){
      setErrorMessage("Please upload the thumbnail");
      setOpenSnackbar(true);
      return;
    }

    if(!videoFile){
      setErrorMessage("Please upload the video");
      setOpenSnackbar(true);
      return;
    }
    

    // Manual validation starts here

    // Week title validation (must not be empty and only contain letters and spaces)
    if (!weektitle || !/^[a-zA-Z\s]+$/.test(weektitle)) {
      setErrorMessage("Week title is required and must contain only alphabets.");
      setOpenSnackbar(true);
      return;
    }

    // Video title validation (must not be empty and only contain letters and spaces)
    if (!title || !/^[a-zA-Z\s]*$/.test(title)) {
      setErrorMessage("Video title is required and must contain only alphabets.");
      setOpenSnackbar(true);
      return;
    }

    // Description validation (must not be empty and only contain letters and spaces)
    if (!description || !/^[a-zA-Z\s]*$/.test(description)) {
      setErrorMessage("Description is required and must contain only alphabets.");
      setOpenSnackbar(true);
      return;
    }

    // Thumbnail validation (must be an image file)
    if (!thumbnail || !/^image\/.*/.test(thumbnail.type)) {
      setErrorMessage("Please upload a valid image file for the thumbnail.");
      setOpenSnackbar(true);
      return;
    }

    // Video file validation (must be a video file)
    if (!videoFile || !/^video\/.*/.test(videoFile.type)) {
      setErrorMessage("Please upload a valid video file.");
      setOpenSnackbar(true);
      return;
    }

    // Resources validation (optional, check if a file and if it's a valid type)
    if (resources && !/^(application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/vnd.ms-excel|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet)$/.test(resources.type)) {
      setErrorMessage("Resources must be a PDF, Word, or Excel file.");
      setOpenSnackbar(true);
      return;
    }

    // If all validations pass, proceed with video upload
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.onloadedmetadata = async () => {
      const videoDuration = videoElement.duration;

      // Set loading state to true for this specific video
      video.loading = true;
      setCourses(updatedCourses);

      const formData = new FormData();
      formData.append("courseId", couseId);
      formData.append("weekNumber", weekIndex + 1); // Week number (1-based)
      formData.append("weekTitle", week.title);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("video", videoFile);
      formData.append("duration", videoDuration);

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
    };
  } catch (error) {
    console.error("Error uploading video:", error);
    setErrorMessage("Failed to upload video. Please try again.");
    setOpenSnackbar(true);

    // Reset loading state on error
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex].loading = false;
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
      const [courseIndex, weekIndex, videoIndex, fileType] =
        dropzoneType.split("-");

      if (
        updatedCourses[courseIndex] &&
        updatedCourses[courseIndex].weeks &&
        updatedCourses[courseIndex].weeks[weekIndex] &&
        updatedCourses[courseIndex].weeks[weekIndex].videos &&
        updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex]
      ) {
        if (fileType === "video") {
          const videoFile = acceptedFiles[0];
          const video =
            updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex];
          const week = updatedCourses[courseIndex].weeks[weekIndex];

          // Temporary video element to calculate duration
          const videoElement = document.createElement("video");
          videoElement.src = URL.createObjectURL(videoFile);
          videoElement.onloadedmetadata = () => {
            const newDuration = videoElement.duration; // New video duration in seconds

            // Subtract the old video duration if it exists
            if (video.duration) {
              week.totalLength = (week.totalLength || 0) - video.duration;
            }

            // Add the new video duration
            week.totalLength = (week.totalLength || 0) + newDuration;

            // Update video object with new file and duration
            video.video = videoFile;
            video.duration = newDuration; // Store the duration with the video

            console.log(
              `Updated total length for week ${weekIndex + 1}:`,
              week.totalLength
            );

            setCourses([...updatedCourses]); // Update state after duration is loaded
          };
        } else {
          // Handle other file types like thumbnail or resources
          updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex][
            fileType
          ] = acceptedFiles[0];
          console.log(
            `Updated ${fileType} for video:`,
            updatedCourses[courseIndex].weeks[weekIndex].videos[videoIndex]
          );
        }
      } else {
        console.error("Invalid indices or video object.");
      }
    } else {
      console.error("Invalid dropzoneType.");
    }

    setIsDropzoneOpen(false); // Close the modal
  };

  // const addWeek = (courseIndex) => {
  //   const updatedCourses = [...courses];

  //   // Ensure `weeks` exists in the course object
  //   if (!updatedCourses[courseIndex].weeks) {
  //     updatedCourses[courseIndex].weeks = [];
  //   }

  //   // Add a new week object with an empty videos array
  //   updatedCourses[courseIndex].weeks.push({ videos: [] });

  //   // Update state
  //   setCourses(updatedCourses);
  // };

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
  const [errorMessage, setErrorMessage] = useState(""); // For validation errors
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const validationSchema = Joi.object({
    title: Joi.string()
      .regex(/^[A-Za-z]/)
      .required()
      .messages({
        "string.pattern.base": "Course title must start with an alphabet.",
        "string.empty": "Course title is required.",
      }),
    description: Joi.string()
      .regex(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Description must only contain alphabets.",
        "string.empty": "Description is required.",
      }),
    learnings: Joi.array()
      .items(Joi.string().regex(/^[A-Za-z]/).required())
      .min(2)
      .required()
      .messages({
        "array.min": "At least 2 learnings are required.",
        "string.pattern.base": "Each learning must start with an alphabet.",
      }),
    requirements: Joi.array()
      .items(Joi.string().regex(/^[A-Za-z]/).required())
      .min(2)
      .required()
      .messages({
        "array.min": "At least 2 requirements are required.",
        "string.pattern.base": "Each requirement must start with an alphabet.",
      }),
  });

  const validateCourseDetails = (course) => {
    const { error } = validationSchema.validate(course, { abortEarly: false });
    if (error) {
      setErrorMessage(error.details[0].message); 
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close snackbar
  };
  
  

  const handleSubmitCourseDetails = async () => {
    try {
      setErrorMessage("");
      // Extract data from the first course
      const course = courses[0]; // Assuming single course for simplicity
      if (!validateCourseDetails(course)) {
        return; // Exit early if validation fails
      }
      const { title, description, learnings, requirements } = course;
  
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("courseTitle", title);
      formData.append("courseDescription", description);
      formData.append("whatyouwilllearn", JSON.stringify(learnings)); // Serialize the array
      formData.append("requirements", JSON.stringify(requirements)); // Serialize the array
  
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
      setStep(2);
    } catch (err) {
      const errorMessages = err?.details?.[0]?.message || "Failed to submit course details.";
      console.error("Error submitting course details:", err);
      setErrorMessage("Failed to submit course details.");
      setOpenSnackbar(true);
    }
  };
  

  const addLearning = (index) => {
    const updatedCourses = [...courses];
    if (updatedCourses[index].learnings.length < 10) {  // Set a max limit if needed
      updatedCourses[index].learnings.push("");
      setCourses(updatedCourses);
    } else {
      setErrorMessage("You can only add up to 10 learnings.");
      setOpenSnackbar(true);
    }
  };

  const removeLearning = (courseIndex, learnIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].learnings.splice(learnIndex, 1);
    setCourses(updatedCourses);
  };

  const addRequirement = (index) => {
    const updatedCourses = [...courses];
    if (updatedCourses[index].requirements.length < 10) {  // Set a max limit if needed
      updatedCourses[index].requirements.push("");
      setCourses(updatedCourses);
    } else {
      setErrorMessage("You can only add up to 10 requirements.");
      setOpenSnackbar(true);
    }
  };

  const removeRequirement = (courseIndex, reqIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].requirements.splice(reqIndex, 1);
    setCourses(updatedCourses);
  };

  const updateCourseField = (index, field, value) => {
    const updatedCourses = [...courses];
    
    if (field === "title" && !value.trim()) {
      setErrorMessage("Course title cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    
    if (field === "description" && !value.trim()) {
      setErrorMessage("Description cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
  
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };
  

  const updateDynamicField = (courseIndex, field, fieldIndex, value) => {
    const updatedCourses = [...courses];
    
    if (value.trim() === "") {
      setErrorMessage(`${field} field cannot be empty.`);
      setOpenSnackbar(true);
      return;
    }
  
    updatedCourses[courseIndex][field][fieldIndex] = value;
    setCourses(updatedCourses);
  };

  const uploadValidationSchema = Joi.object({
    trailer: Joi.object({
      type: Joi.string()
        .regex(/^video\/.*/)
        .required()
        .messages({
          "string.pattern.base": "Trailer must be a video file.",
          "any.required": "Trailer is required.",
          "object.base": "Trailer must be provided as a valid file.",
        }),
    }).required().messages({
      "any.required": "Trailer is required.",
    }),
    thumbnail: Joi.object({
      type: Joi.string()
        .regex(/^image\/.*/)
        .required()
        .messages({
          "string.pattern.base": "Thumbnail must be an image file.",
          "any.required": "Thumbnail is required.",
          "object.base": "Thumbnail must be provided as a valid file.",
        }),
    }).required().messages({
      "any.required": "Thumbnail is required.",
    }),
  });
  
  

  /*const handleTrailerAndThumbnailUpload = async () => {
    if (!trailer && !thumbnail) {
      setErrorMessage("Please upload the trailer and thumbnail");
      setOpenSnackbar(true);
      return;
    }
  
    if (!trailer) {
      setErrorMessage("Please upload the trailer");
      setOpenSnackbar(true);
      return;
    }
  
    if (!thumbnail) {
      setErrorMessage("Please upload the thumbnail");
      setOpenSnackbar(true);
      return;
    }
  
    // Prepare validation data
    
  
    try {
      setErrorMessage("");
  
      // Validate trailer and thumbnail
      const { error } = uploadValidationSchema.validate(validationData, {
        abortEarly: false,
      });
  
      if (error) {
        setErrorMessage(error.details[0].message); // Show the first validation error
        setOpenSnackbar(true);
        return;
      }
  
      // Proceed if validation passes
      const formData = new FormData();
      formData.append("courseId", courseId); // Ensure courseId is set
      formData.append("trailer", trailer);
      formData.append("thumbnail", thumbnail);
  
      const response = await axios.post(
        "http://localhost:5000/api/course/uploadtrailer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Trailer and thumbnail uploaded successfully:", response.data);
      alert("Trailer and Thumbnail uploaded successfully!");
      setStep(3);
    } catch (error) {
      console.error(
        "Error details:",
        error.response?.data || error.message || error
      );
      setErrorMessage("Failed to upload trailer and thumbnail. Please try again.");
      setOpenSnackbar(true);
    }
  };*/
  

  const handleTrailerAndThumbnailUpload = async () => {
    if (!trailer || !thumbnail || !couseId) {
      setErrorMessage("Please upload the trailer and thumbnail");
      setOpenSnackbar(true);
      return;
    }

    if (!trailer) {
      setErrorMessage("Please upload the trailer");
      setOpenSnackbar(true);
      return;
    }
  
    if (!thumbnail) {
      setErrorMessage("Please upload the thumbnail");
      setOpenSnackbar(true);
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
      //setSuccessMessage("Trailer and Thumbnail uploaded successfully!");
      //setOpenSnackbar(true);
      alert("Trailer and Thumbnail uploaded successfully!");
      setStep(3);
    } catch (error) {
      console.error("Error uploading trailer and thumbnail:", error);
      setErrorMessage("Failed to upload trailer and thumbnail. Please try again.");
      setOpenSnackbar(true);
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
                  //setStep(2);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Next Step
              </button>
              {/* Snackbar */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  handleSnackbarClose();
                  setErrorMessage(""); // Clear the error message when Snackbar is closed
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top-center
              >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>

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
                    //setStep(3);
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Next
                </button>
                {/* Snackbar */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  handleSnackbarClose();
                  setErrorMessage(""); // Clear the error message when Snackbar is closed
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top-center
              >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
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

                      <label className="block mb-2 font-semibold">
                        Week Title
                      </label>
                      <input
                        type="text"
                        value={week.title || ""}
                        onChange={(e) => {
                          const updatedCourses = [...courses];
                          updatedCourses[courseIndex].weeks[weekIndex].title =
                            e.target.value;
                          setCourses(updatedCourses);
                        }}
                        className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                        placeholder="Enter week title"
                      />

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
                            value={video.title || ""}
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
                            value={video.description || ""}
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
                  {course.weeks?.map((week, weekIndex) => (
                    <div key={weekIndex} className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Week {weekIndex + 1} (Total Video Length:{" "}
                        {Math.floor(week.totalLength / 60)} min{" "}
                        {Math.floor(week.totalLength % 60)} sec)
                      </h3>
                      {/* ... */}
                    </div>
                  ))}
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
                  onClick={() => {
                    console.log("Courses before validation:", courses);
                    const errorMessage = validateCourses(courses);
                    if (errorMessage) {
                      console.error("Validation Error:", errorMessage);
                    }
                    // Proceed to the next step if validation passes
                    setStep(4);
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Next Step
                </button>
                 {/* Snackbar */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  handleSnackbarClose();
                  setErrorMessage(""); // Clear the error message when Snackbar is closed
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top-center
              >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
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
                        Quiz for Week {weekIndex + 1} -{" "}
                        {week.title || "Untitled Week"}
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
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => {
                    

                    setStep(5);
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Next
                </button>
                <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  handleSnackbarClose();
                  setErrorMessage(""); // Clear the error message when Snackbar is closed
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top-center
              >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Finalize Course Details
              </h2>
              {courses.map((course, courseIndex) => (
                <div key={courseIndex} className="mb-6">
                  <label className="block mb-2 font-semibold">Keywords</label>
                  <input
                    type="text"
                    value={course.keywords || ""}
                    onChange={(e) => {
                      updateCourseField(
                        courseIndex,
                        "keywords",
                        e.target.value
                      );
                      setkeywords(e.target.value);
                    }}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                    placeholder="Enter keywords separated by commas"
                  />

                  <label className="block mb-2 font-semibold">
                    Course Language
                  </label>
                  <input
                    type="text"
                    value={course.language || ""}
                    onChange={(e) => {
                      updateCourseField(
                        courseIndex,
                        "language",
                        e.target.value
                      );
                      setcourselanguage(e.target.value);
                    }}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                    placeholder="e.g., English, Hindi"
                  />

                  <label className="block mb-2 font-semibold">
                    Course Level
                  </label>
                  <select
                    value={course.level || ""}
                    onChange={(e) => {
                      updateCourseField(courseIndex, "level", e.target.value);
                      setLevel(e.target.value);
                    }}
                    className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => {
                    // Validate the course data using the validatefinal function
                    const errorMessage = validatefinal({ keywords, courselanguage, level });

                    if (errorMessage) {
                      // If validation fails, show the error message in Snackbar
                      setErrorMessage(errorMessage);
                      setOpenSnackbar(true);
                      return; // Stop execution if validation fails
                    }

                    // If validation passes, finalize the course and show success message
                    finalizeCourses(keywords, courselanguage, level);
                    alert("Course finalized successfully!");
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                >
                  Finalize Course
                </button>

                <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  handleSnackbarClose();
                  setErrorMessage(""); // Clear the error message when Snackbar is closed
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top-center
              >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
