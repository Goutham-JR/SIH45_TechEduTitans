import { React } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer setup for the calendar
const localizer = momentLocalizer(moment);

// Example data for events (assignment deadlines, quizzes, etc.)
const events = [
  {
    title: "Assignment 1 Deadline",
    start: new Date(2024, 11, 3),
    end: new Date(2024, 11, 3),
    type: "deadline",
  },
  {
    title: "Quiz on Machine Learning",
    start: new Date(2024, 11, 7, 10, 0), // 10 AM
    end: new Date(2024, 11, 7, 11, 0),
    type: "quiz",
  },
  {
    title: "Live Session: AI in Industry",
    start: new Date(2024, 11, 10, 15, 0), // 3 PM
    end: new Date(2024, 11, 10, 16, 0),
    type: "session",
  },
];

const EventStyle = ({ event }) => {
  let eventColor = "#10B981"; // Default green for sessions
  if (event.type === "deadline") eventColor = "#EF4444"; // Red for deadlines
  if (event.type === "quiz") eventColor = "#3B82F6"; // Blue for quizzes

  return (
    <div
      style={{
        backgroundColor: eventColor,
        color: "white",
        padding: "5px",
        borderRadius: "4px",
      }}
    >
      {event.title}
    </div>
  );
};

const InteractiveCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedDate(event);
  };

  const handleSelectSlot = (slotInfo) => {
    alert("Selected date: " + slotInfo.start.toLocaleString());
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Interactive Calendar</h2>

      <div className="relative">
        {/* Ensure proper padding/margin for navigation buttons */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            width: "100%",
            padding: "10px",
            backgroundColor: "#1E293B", // Dark background for better contrast
            color: "#FFFFFF", // Ensure text is visible
          }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          components={{
            event: EventStyle,
          }}
          views={["month", "week", "day", "agenda"]}
        />
      </div>

      {/* Event Details Section */}
      {selectedDate && (
        <div className="mt-6 text-gray-100">
          <h3 className="text-xl font-medium">Event Details</h3>
          <p className="mt-2"><strong>Title:</strong> {selectedDate.title}</p>
          <p><strong>Start:</strong> {selectedDate.start.toLocaleString()}</p>
          <p><strong>End:</strong> {selectedDate.end.toLocaleString()}</p>
          <p><strong>Event Type:</strong> {selectedDate.type.charAt(0).toUpperCase() + selectedDate.type.slice(1)}</p>
        </div>
      )}
    </motion.div>
  );
};



const EventList = ({ selectedDate }) => {
  const [activeEvent, setActiveEvent] = useState(null);

  const handleActionClick = (event) => {
    alert(`Action triggered: ${event.action}`);
  };

  const filteredEvents = events.filter(
    (event) =>
      new Date(event.time).toDateString() ===
      new Date(selectedDate).toDateString()
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Event List</h2>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-300">No events for the selected date.</p>
      ) : (
        filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`mb-4 p-4 rounded-lg border ${
              activeEvent === event.id
                ? "border-blue-500 bg-gray-900"
                : "border-gray-700"
            }`}
            onClick={() => setActiveEvent(event.id)}
          >
            <h3 className="text-lg font-medium text-gray-100">{event.title}</h3>
            <p className="text-gray-400 mt-1">{event.description}</p>
            <p className="text-gray-500 mt-2">
              <strong>Course:</strong> {event.course}
            </p>
            <p className="text-gray-500">
              <strong>Due Time:</strong> {new Date(event.time).toLocaleString()}
            </p>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleActionClick(event)}
            >
              {event.action}
            </button>
          </div>
        ))
      )}
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
                <InteractiveCalendar />
                <EventList />
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
