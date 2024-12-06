import React, { useState } from 'react'; 
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CourseContentComponent = () => {
  const [openWeeks, setOpenWeeks] = useState([0]); // First week open by default

  const courseStructure = [
    {
      week: 1,
      title: "Foundations of Web Development",
      description: "Introduction to core web development concepts",
      totalDuration: "4h 30m",
      modules: [
        {
          title: "HTML5 Fundamentals",
          videos: [
            { 
              title: "Introduction to HTML Structure", 
              duration: "32:45", 
              completed: true,
              type: 'video'
            },
            { 
              title: "Semantic HTML Elements", 
              duration: "45:20", 
              completed: true,
              type: 'video'
            }
          ],
          resources: [
            { title: "HTML Cheatsheet", type: 'document' },
            // Removed the download resource here
          ]
        },
        {
          title: "CSS Basics",
          videos: [
            { 
              title: "CSS Selectors and Properties", 
              duration: "55:10", 
              completed: false,
              type: 'video'
            },
            { 
              title: "Responsive Design Principles", 
              duration: "1:12:30", 
              completed: false,
              type: 'locked'
            }
          ],
          resources: [
            { title: "CSS Styling Guide", type: 'document' }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Advanced CSS and Layouts",
      description: "Deep dive into CSS layouts and responsive design",
      totalDuration: "5h 15m",
      modules: [
        {
          title: "Flexbox and Grid",
          videos: [
            { 
              title: "Understanding Flexbox", 
              duration: "45:30", 
              completed: false,
              type: 'locked'
            },
            { 
              title: "CSS Grid Layouts", 
              duration: "1:00:15", 
              completed: false,
              type: 'locked'
            }
          ],
          resources: [
            { title: "Layout Techniques Handbook", type: 'document' }
          ]
        }
      ]
    }
  ];

  const toggleWeek = (weekIndex) => {
    setOpenWeeks(prev => 
      prev.includes(weekIndex)
        ? prev.filter(w => w !== weekIndex)
        : [...prev, weekIndex]
    );
  };

  const renderVideoIcon = (type) => {
    switch(type) {
      case 'video':
        return <Play className="text-green-500 w-5 h-5" />;
      case 'locked':
        return <Lock className="text-gray-400 w-5 h-5" />;
      case 'completed':
        return <CheckCircle2 className="text-blue-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  const renderResourceIcon = (type) => {
    switch(type) {
      case 'document':
        return <FileText className="text-blue-500 w-5 h-5" />;
      // Removed the case for 'download'
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-md p-6 overflow-hidden max-h-screen"> {/* Added max-h-screen here to limit height */}
      <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
      
      {courseStructure.map((week, weekIndex) => (
        <div key={week.week} className="mb-4 border-b border-gray-500 pb-4">
          <button 
            onClick={() => toggleWeek(weekIndex)}
            className="flex justify-between items-center w-full"
          >
            <div>
              <h3 className="text-lg font-semibold">
                Week {week.week}: {week.title}
              </h3>
              <p className="text-gray-300">{week.description}</p>
              <span className="text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {week.totalDuration}
              </span>
            </div>
            {openWeeks.includes(weekIndex) ? (
              <ChevronUp className="w-6 h-6 text-gray-300" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-300" />
            )}
          </button>
  
          {openWeeks.includes(weekIndex) && (
            <div className="mt-4 space-y-4">
              {week.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="bg-gray-600 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-white">{module.title}</h4>
                   {/* Videos */}
                  <div className="space-y-2 mb-3">
                    {module.videos.map((video, videoIndex) => (
                      <div 
                        key={videoIndex} 
                        className="flex justify-between items-center p-2 hover:bg-gray-500 rounded"
                      >
                        <div className="flex items-center space-x-3">
                          {renderVideoIcon(video.type)}
                          <span className="text-white">{video.title}</span>
                        </div>
                        <span className="text-gray-300 text-sm">
                          {video.duration}
                        </span>
                      </div>
                    ))}
                  </div>
  
                  {/* Resources */}
                  {module.resources && module.resources.length > 0 && (
                    <div className="border-t border-gray-500 pt-3">
                      <h5 className="text-sm font-medium mb-2 text-white">Resources</h5>
                      <div className="space-y-2">
                        {module.resources.map((resource, resourceIndex) => (
                          <div 
                            key={resourceIndex} 
                            className="flex items-center space-x-3 p-2 hover:bg-gray-500 rounded"
                          >
                            {renderResourceIcon(resource.type)}
                            <span className="text-white">{resource.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
  
      {/* Course Progress */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-white">Course Progress</h3>
          <span className="text-blue-400">35% Complete</span>
        </div>
        <div className="w-full bg-gray-500 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '35%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentComponent;
