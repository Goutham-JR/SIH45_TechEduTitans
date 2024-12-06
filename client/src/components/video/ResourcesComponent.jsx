import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Paperclip, 
  FileText, 
  Loader2, 
  AlertTriangle, 
  Download 
} from 'lucide-react';

// Simulated API Service
const ResourceService = {
  async getResources(filters = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const mockResources = [
            {
              week: 1,
              resources: [
                
                {
                  id: 'doc1',
                  title: 'HTML5 Reference Guide',
                  type: 'doc',
                  size: '2 MB',
                  uploadDate: '2024-02-02',
                  url: '/mock-resources/html-guide.docx',
                  description: 'A detailed reference guide for HTML5'
                },
                {
                  id: 'ppt1',
                  title: 'CSS Basics Presentation',
                  type: 'ppt',
                  size: '5 MB',
                  uploadDate: '2024-02-03',
                  url: '/mock-resources/css-basics.pptx',
                  description: 'CSS basics explained in slides'
                }
              ]
            },
            {
              week: 2,
              resources: [
                {
                  id: 'pdf1',
                  title: 'JavaScript Fundamentals',
                  type: 'pdf',
                  size: '1 MB',
                  uploadDate: '2024-02-10',
                  url: '/mock-resources/js-fundamentals.pdf',
                  description: 'A comprehensive guide to JavaScript basics'
                }
              ]
            }
          ];

          // Apply filters if needed
          const filteredResources = mockResources.flatMap(week => week.resources);
          resolve(filteredResources);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }
};

const ResourcesComponent = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedResources = await ResourceService.getResources();
        setResources(fetchedResources);
      } catch (err) {
        setError('Failed to load resources. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-800 text-white">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 text-white">
        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
        <p className="text-lg">{error}</p>
        <button 
          onClick={() => setResources([])} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-6 h-6 text-red-500" />;
      case 'doc':
      case 'pdf':
      case 'ppt':
        return <FileText className="w-6 h-6 text-green-500" />;
      default:
        return <Paperclip className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {resources.length === 0 ? (
          <div className="text-center text-gray-400 py-6">
            No resources found
          </div>
        ) : (
          resources.map((resource) => (
            <div 
              key={resource.id} 
              className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="flex items-center space-x-4">
                {getFileIcon(resource.type)}
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-gray-400">
                    {resource.size} • Uploaded on {resource.uploadDate}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 flex items-center"
                >
                  <Paperclip className="mr-2" /> Preview
                </a>
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesComponent;
